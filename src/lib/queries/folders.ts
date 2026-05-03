import { createQuery } from "@tanstack/svelte-query";

export function useFoldersQuery( 
	getFolderName : ( ) => string, 
	getEnabled    : ( ) => boolean = ( ) => true 
) {
	return createQuery<string[], Error>( ( ) => ( {
		queryKey : [ "folders", getFolderName( ) ],
		queryFn  : async ( ) => {
			const name = getFolderName( );
			const res  = await fetch( `/api/filemanager/get-folders?folder_name=${ encodeURIComponent( name ) }` );
			
			if ( !res.ok ) {
				throw new Error( "Error al obtener carpetas" );
			}
			
			return res.json( ) as Promise<string[]>;
		},
		enabled : getEnabled( )
	} ) );
}
