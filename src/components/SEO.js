import React from "react";
import { Helmet } from "react-helmet-async";

export const SEO = ({
    title,
    description,
    keywords,
    type = "website",
    name = "Hydra Skin",
}) => {
    const metaDescription =
        description ||
        "Hydra Skin en Nuevo Chimbote: protocolos faciales y corporales con enfoque clinico, evaluacion personalizada y seguimiento post sesion.";

    const metaKeywords =
        keywords ||
        "hidrafacial, limpieza facial, dermaplaning, radiofrecuencia, estetica clinica, bienestar, nuevo chimbote, spa, facial";

    const metaTitle = title ? `${title} | ${name}` : `${name} | Estetica clinica en Nuevo Chimbote`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />

            {/* Open Graph Meta Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:site_name" content={name} />
            <meta property="og:locale" content="es_PE" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
        </Helmet>
    );
};
