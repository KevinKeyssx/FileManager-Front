<script lang="ts">
	import { createMutation, useQueryClient } from "@tanstack/svelte-query";

    import { toast } from "svelte-sonner";

    import type {
        CloudinaryResource,
        FileManagerResponse
    }                       from "$lib/types";
	import { formatBytes }  from "$lib/utils";


    let { resource, onCopy } = $props<{ 
		resource : CloudinaryResource;
		onCopy   : ( text: string ) => void;
	}>( );


    const queryClient = useQueryClient( );


    const deleteMutation = createMutation( ( ) => ( {
		mutationFn : async ( ) => {
			const res = await fetch( `/api/filemanager/delete?public_id=${ encodeURIComponent( resource.public_id ) }`, {
				method : "DELETE"
			} );

			if ( !res.ok ) {
				const errorData = await res.json();
				throw new Error( errorData.error || "Error al eliminar archivo" );
			}

			return res.json( );
		},
		onSuccess : ( ) => {
			// Eliminamos la imagen de la caché local para feedback instantáneo
			queryClient.setQueryData( [ "files", resource.folder ], ( old : FileManagerResponse | undefined ) => {
				if ( !old ) return old;
				return {
					...old,
					total_count : ( old.total_count || 1 ) - 1,
					resources   : old.resources.filter( ( r ) => r.public_id !== resource.public_id )
				};
			});

            toast.success( 'Archivo eliminado correctamente' );
		},
        onError: ( error ) => {
            console.error( "Error al eliminar el archivo:", error );
            toast.error( `Error al eliminar el archivo` );
        }
	}));


    const handleDownload = () => {
		try {
			const downloadUrl = resource.secure_url.replace( "/upload/", "/upload/fl_attachment/" );

			const a = document.createElement( "a" );

            a.href = downloadUrl;
			a.download = `${ resource.public_id.split( "/" ).pop( ) }.${ resource.format }`;

            document.body.appendChild( a );

            a.click( );

            document.body.removeChild( a );

            toast.success( 'Archivo descargado correctamente' );
		} catch ( error ) {
			console.error( "Error al descargar el archivo:", error );
            toast.error( 'Error al descargar el archivo' );
		}
	};
</script>


<div class="bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-md hover:border-cyan-500/30 transition-all shadow-xl group flex flex-col">
	<div class="aspect-video relative overflow-hidden bg-slate-950">
		{#if resource.resource_type === "video"}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video 
				src={ resource.secure_url } 
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				controls
				muted
				loop
				playsinline
			></video>
		{:else}
			<img 
				src={ resource.secure_url } 
				alt={ resource.public_id } 
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
			/>
		{/if}

		<div class="absolute top-2 right-2 px-2 py-1 bg-slate-800/80 rounded-lg text-[10px] font-bold text-cyan-400 uppercase tracking-wider border border-cyan-500/20">
			{ resource.format }
		</div>

        <button
            class    = "absolute bottom-2 right-2 p-2 rounded-lg bg-red-500/50 text-red-100/70 hover:text-red-400 hover:bg-red-500/10 transition-all border border-red-700/50 hover:border-red-500/30 disabled:opacity-50 opacity-0 group-hover:opacity-100"
            // onclick  = { ( ) => deleteMutation.mutate( ) }
            ondblclick = { ( ) => deleteMutation.mutate( ) }
            disabled = { deleteMutation.isPending }
            title    = "Eliminar archivo"
        >
            {#if deleteMutation.isPending}
                <div class="w-3.5 h-3.5 border-2 border-red-400/20 border-t-red-400 rounded-full animate-spin"></div>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            {/if}
        </button>
	</div>

	<div class="p-4 space-y-3 flex flex-col flex-1">
		<div class="flex justify-between items-center gap-2">
			<h3 class="text-sm font-semibold text-white truncate flex-1" title={ resource.public_id }>
				{ resource.public_id.split( "/" ).pop( ) }
			</h3>

			<span
				class="w-2.5 h-2.5 rounded-full border border-white/10 shadow-sm shrink-0"
				class:bg-cyan-500={ resource.status === "active" }
				class:bg-red-500={ resource.status === "inactive" }
				title={ resource.status }
			></span>
		</div>

		<div class="grid grid-cols-3 gap-y-2 gap-x-1 text-[ 11px ] text-cyan-100/60 mt-auto pb-2">
			<div class="flex items-center gap-1.5 text-xs truncate" title="{ resource.width } x { resource.height }">
				<span class="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></span>
				{ resource.width } x { resource.height }
			</div>

			<div class="flex items-center gap-1.5 text-xs truncate">
				<span class="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
				{ formatBytes( resource.bytes ) }
			</div>

			<div class="flex items-center gap-1.5 text-xs truncate">
				<span class="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0"></span>
				{ resource.resource_type }
			</div>
		</div>

		<div class="flex gap-2 items-center">
			<a 
				href={ resource.secure_url } 
				target="_blank" 
				class="block w-full py-2 text-center rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-cyan-200 text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-500/50"
			>
				Ver { resource.resource_type === "video" ? "Video" : "Imagen" }
			</a>

			<button
				class    = "p-2 rounded-lg bg-slate-800/50 text-cyan-400/70 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"
				onclick  = { handleDownload }
				title    = "Descargar archivo"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
			</button>

			<button
				class    = "p-2 rounded-lg bg-slate-800/50 text-cyan-400/70 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"
				onclick  = { ( ) => onCopy( resource.secure_url ) }
				title    = "Copiar URL segura"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
			</button>
		</div>
	</div>
</div>
