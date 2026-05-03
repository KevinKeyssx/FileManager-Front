import { json } from "@sveltejs/kit";

import { ENVS }                 from "$lib/config/envs/env";
import type { RequestHandler }  from "./$types";


export const DELETE: RequestHandler = async ( { url, fetch } ) => {
	try {
		const publicId = url.searchParams.get( "public_id" );

		if ( !publicId ) {
			return json( { error : "public_id parameter is required" }, { status : 400 } );
		}

		const normalizedId  = publicId.trim( ).replace( /\//g, "|" );
		const targetUrl     = `${ ENVS.BACKEND_URL }/delete/${ encodeURIComponent( normalizedId ) }`;

		const response = await fetch( targetUrl, {
			method : "DELETE"
		} );

		if ( !response.ok ) {
			const errorText = await response.text( );
			console.error( "Backend delete error:", errorText );
			return json( { error : "Failed to delete from backend", details : errorText }, { status : response.status } );
		}

		const data = await response.json( );

		return json( data );
	} catch ( error ) {
		console.error( "Internal error in DELETE handler:", error );
		return json( { error : "Internal Server Error" }, { status : 500 } );
	}
};
