import { json } from "@sveltejs/kit";
import { ENVS } from "$lib/config/envs/env";
import type { RequestHandler } from "./$types";
import type { FileManagerResponse } from "$lib/types";

export const GET: RequestHandler = async ( { url, fetch } ) => {
	const folder  = url.searchParams.get( "folder" )  || "";
	const sort    = url.searchParams.get( "sort" )    || "desc";
	const results = url.searchParams.get( "results" ) || "30";

	if ( !folder ) {
		return json( { error : "Folder parameter is required" }, { status : 400 } );
	}

	// Translate spaces to "|" as requested
	const normalizedFolder = folder.trim( ).replace( /\s+/g, "|" );

	const targetUrl = `${ ENVS.BACKEND_URL }/download/${ encodeURIComponent( normalizedFolder ) }?sort=${ sort }&results=${ results }`;

	try {
		const response = await fetch( targetUrl );

		if ( !response.ok ) {
			const errorText = await response.text( );
			console.error( "Backend error:", errorText );
			return json( { error : "Failed to fetch from backend", details : errorText }, { status : response.status } );
		}

		const data: FileManagerResponse = await response.json( );

		return json( data );
	} catch ( error ) {
		console.error( "Internal error in GET handler:", error );
		return json( { error : "Internal Server Error" }, { status : 500 } );
	}
};
