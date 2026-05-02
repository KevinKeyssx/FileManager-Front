export interface SEOMetadata {
	title       : string;
	description : string;
	canonical?  : string;
	ogType?     : string;
	ogImage?    : string;
	noindex?    : boolean;
}

export const DEFAULT_SEO: SEOMetadata = {
	title       : "FileManager - Gestión de Archivos Optimizada",
	description : "Sube, gestiona y optimiza tus imágenes y archivos con facilidad. Herramientas avanzadas de transformación y almacenamiento.",
	ogType      : "website",
	noindex     : false
};
