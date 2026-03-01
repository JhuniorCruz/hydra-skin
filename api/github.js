export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') return res.status(200).end()
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })

    const { changes, message } = req.body; // changes is an array pattern: { path, content, isDelete }
    const token = process.env.GITHUB_PAT;
    const repo = process.env.GITHUB_REPO || 'JhuniorCruz/hydra-skin';
    const branch = process.env.GITHUB_BRANCH || 'master';

    if (!token) return res.status(500).json({ error: 'Falta configurar el GITHUB_PAT.' });
    if (!changes || !Array.isArray(changes) || changes.length === 0) {
        return res.status(400).json({ error: 'No hay cambios para enviar.' });
    }

    try {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };

        // 1. Obtener la referencia de la rama actual (último commit)
        const refRes = await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/${branch}`, { headers });
        if (!refRes.ok) throw new Error('Error obteniendo la referencia de la rama principal');
        const refData = await refRes.json();
        const currentCommitSha = refData.object.sha;

        // 2. Obtener los detalles del último commit para encontrar su árbol raíz (base tree)
        const commitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits/${currentCommitSha}`, { headers });
        if (!commitRes.ok) throw new Error('Error obteniendo detalles del commit actual');
        const commitData = await commitRes.json();
        const baseTreeSha = commitData.tree.sha;

        // 3. Crear un nuevo árbol (Tree) con los cambios en lote
        const treePayload = changes.map(change => {
            if (change.isDelete) {
                // Documentación API GitHub: enviar sha=null borra el archivo en el árbol.
                return {
                    path: change.path,
                    mode: '100644',
                    type: 'blob',
                    sha: null
                }
            } else {
                return {
                    path: change.path,
                    mode: '100644',
                    type: 'blob',
                    content: change.content
                }
            }
        });

        const createTreeRes = await fetch(`https://api.github.com/repos/${repo}/git/trees`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                base_tree: baseTreeSha,
                tree: treePayload
            })
        });

        if (!createTreeRes.ok) {
            const err = await createTreeRes.json();
            throw new Error('Error adjuntando cambios al árbol Git: ' + JSON.stringify(err));
        }
        const treeData = await createTreeRes.json();
        const newTreeSha = treeData.sha;

        // 4. Crear un nuevo commit que apunte al nuevo árbol
        const finalMessage = message || `CMS: Actualización en lote (${changes.length} cambios)`;
        const createCommitRes = await fetch(`https://api.github.com/repos/${repo}/git/commits`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                message: finalMessage,
                tree: newTreeSha,
                parents: [currentCommitSha]
            })
        });

        if (!createCommitRes.ok) throw new Error('Error creando confirmación de cambios (commit)');
        const newCommitData = await createCommitRes.json();
        const newCommitSha = newCommitData.sha;

        // 5. Actualizar la rama (branch) para que apunte al nuevo commit
        const updateRefRes = await fetch(`https://api.github.com/repos/${repo}/git/refs/heads/${branch}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({
                sha: newCommitSha
            })
        });

        if (!updateRefRes.ok) throw new Error('Error sincronizando la rama principal');

        return res.status(200).json({ success: true, message: 'Cambios publicados exitosamente.' });

    } catch (error) {
        console.error('Error Bulk Publish GitHub:', error);
        return res.status(500).json({ error: error.message });
    }
}
