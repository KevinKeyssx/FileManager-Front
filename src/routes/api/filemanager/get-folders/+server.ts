import { json } from "@sveltejs/kit";

import { ENVS }                 from "$lib/config/envs/env";
import type { RequestHandler }  from "./$types";


export const GET: RequestHandler = async ( { url, fetch } ) => {
	const folderName    = url.searchParams.get( "folder_name" ) || "";
	const targetUrl     = `${ ENVS.BACKEND_URL }/all-folders?folder_name=${ encodeURIComponent( folderName ) }`;

	try {
		const response = await fetch( targetUrl );

		if ( !response.ok ) {
			const errorText = await response.text( );
			console.error( "Backend error in get-folders:", errorText );
			return json( { error : "Failed to fetch folders from backend", details : errorText }, { status : response.status } );
		}

		const data: string[] = await response.json( );

		return json( data );
	} catch ( error ) {
		console.error( "Internal error in GET folders handler:", error );
		return json( { error : "Internal Server Error" }, { status : 500 } );
	}
};
