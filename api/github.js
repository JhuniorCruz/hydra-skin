export default async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { path, content, message, isDelete } = req.body;
    const token = process.env.GITHUB_PAT;
    const repo = process.env.GITHUB_REPO || 'JhuniorCruz/hydra-skin';
    const branch = process.env.GITHUB_BRANCH || 'master';

    if (!token) {
        return res.status(500).json({ error: 'Falta configurar el GITHUB_PAT en las variables de entorno de Vercel.' });
    }
    if (!path) {
        return res.status(400).json({ error: 'Falta la ruta del archivo (path).' });
    }

    try {
        const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;

        // 1. Obtener el archivo actual para conocer su SHA
        let sha = null;
        const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (getRes.ok) {
            const fileData = await getRes.json();
            sha = fileData.sha;
        }

        if (isDelete && !sha) {
            return res.status(404).json({ error: 'Archivo no encontrado para eliminar.' });
        }

        // 2. Preparar los parametros
        const bodyParams = {
            message: message || `Actualización via Admin Panel: ${path}`,
            branch: branch,
        };

        if (sha) {
            bodyParams.sha = sha;
        }

        if (!isDelete) {
            // Para crear/actualizar, enviar contenido en base64
            const encodedContent = Buffer.from(content).toString('base64');
            bodyParams.content = encodedContent;
        }

        // 3. Ejecutar comando (PUT para crear/actulizar, DELETE para eliminar)
        const method = isDelete ? 'DELETE' : 'PUT';

        const actionRes = await fetch(apiUrl, {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParams)
        });

        if (!actionRes.ok) {
            const errorData = await actionRes.json();
            throw new Error(errorData.message || 'Error guardando cambios en GitHub');
        }

        const result = await actionRes.json();
        return res.status(200).json({ success: true, url: result?.content?.html_url || '' });

    } catch (error) {
        console.error('Error de API GitHub:', error);
        return res.status(500).json({ error: error.message });
    }
}
