import { json } from "@sveltejs/kit";

import { ENVS }                 from "$lib/config/envs/env";
import type { RequestHandler }  from "./$types";


export const POST: RequestHandler = async ( { request, url, fetch } ) => {
	try {
		const formData = await request.formData( );
		const file     = formData.get( "file" ) as File;
		const folder   = url.searchParams.get( "folder" );

		if ( !file || !folder ) {
			return json( { error : "File and folder are required" }, { status : 400 } );
		}

		const backendUrl = new URL( `${ ENVS.BACKEND_URL }/upload/${ encodeURIComponent( folder.trim().replace( /\s+/g, "|" ))}` );

		url.searchParams.forEach( ( value, key ) => {
			if ( key !== "folder" && value && value !== "null" ) {
				backendUrl.searchParams.set( key, value );
			}
		} );

		const backendFormData = new FormData( );

        backendFormData.append( "file", file );

		const response = await fetch( backendUrl.toString(), {
			method : "POST",
			body   : backendFormData
		});

		const data = await response.json( );

		if ( !response.ok ) {
			console.error( "Backend upload error:", data );

            return json( { error : "Failed to upload to backend", details : data }, { status : response.status } );
		}

		return json( data );
	} catch ( error ) {
		console.error( "Internal error in upload handler:", error );

        return json( { error : "Internal Server Error" }, { status : 500 } );
	}
};
