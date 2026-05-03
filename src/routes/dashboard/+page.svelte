<script lang="ts">
	import { Portal }       from "bits-ui";
	import { createQuery }  from "@tanstack/svelte-query";
    import { toast }        from "svelte-sonner";

	import type {
        FileManagerResponse
    }                           from "$lib/types";
	import UploadImage          from "$lib/components/UploadImage.svelte";
	import Navigator            from "./components/Navigator.svelte";
	import Breadcrumb           from "./components/Breadcrumb.svelte";
	import SEO                  from "$lib/components/shared/SEO.svelte";
	import CardFileManager      from "$lib/components/CardFileManager.svelte";
    import UploadFileButton     from "./components/UploadFileButton.svelte";


	let isUploadOpen   = $state( false );
	let folderToSearch = $state( "" );


    const filesQuery = createQuery<FileManagerResponse, Error>( () => ({
		queryKey : [ "files", folderToSearch ],
		queryFn  : async ( ) => {
			const res = await fetch( `/api/filemanager/get-all?folder=${ encodeURIComponent( folderToSearch )}` );

            if ( !res.ok ) throw new Error( "Error al obtener archivos" );

            return res.json( ) as Promise<FileManagerResponse>;
		},
		enabled : !!folderToSearch
	}));


    async function copyToClipboard( text: string ): Promise<void> {
		try {
			await navigator.clipboard.writeText( text );

            toast.success( `URL copiado al portapapeles` );
		} catch ( err ) {
			console.error( "Error al copiar: ", err );

            toast.error( "Error al copiar la URL" );
		}
	}


    function handleKeydown( event: KeyboardEvent ): void {
		if ( event.key === ' ' ) {
			event.preventDefault( );
			isUploadOpen = true;
		}
	}
</script>


<svelte:window onkeydown={ handleKeydown } />


<SEO
	title="FileManager - Sube y optimiza tus imágenes"
	description="La plataforma más rápida para subir y transformar tus archivos e imágenes con configuraciones personalizadas."
/>

<main class="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
	<!-- <section class="bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 p-6 md:p-8">
		<div class="flex flex-col md:flex-row justify-between items-center gap-4">
			<h1 class="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400 drop-shadow-sm">
				UploadFiles
			</h1>

			<button
				class="px-6 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95"
				onclick={ ( ) => isUploadOpen = true }
			>
				Subir Archivo
			</button>
		</div>
	</section> -->

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
		<!-- Sidebar de Carpetas (Navigator) -->
		<Navigator bind:folderToSearch />

		<!-- Contenido Principal (Archivos) -->
		<section class="lg:col-span-3">
			{#if !folderToSearch}
				<div class="py-32 text-center space-y-4 bg-neon-glass rounded-2xl border-2 border-dashed border-slate-700/50 flex flex-col items-center justify-center">
					<div class="p-4 bg-cyan-500/10 rounded-full mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400/80"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
					</div>

                    <p class="text-cyan-100/80 text-xl font-medium">
						Selecciona una carpeta
					</p>

                    <p class="text-sm text-cyan-200/50 max-w-sm">
						Navega por el árbol de carpetas en el panel izquierdo para ver sus archivos.
					</p>

                    <UploadFileButton
                        bind:isUploadOpen
                        hiddenText  = { false }
                        sizeText    = { 15 }
                        size        = { 26 }
                    />
				</div>
			{:else if filesQuery.isLoading && filesQuery.isFetching}
				<div class="flex flex-col items-center py-32 space-y-4 bg-neon-glass rounded-2xl border-2 border-slate-700/50">
					<div class="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>

                    <p class="text-cyan-200/60 animate-pulse font-medium">Buscando archivos en <span class="text-cyan-400">{ folderToSearch.split( "|" ).pop( ) }</span>...</p>
				</div>
			{:else if filesQuery.isError}
				<div class="p-8 bg-red-500/10 border border-red-500/50 rounded-2xl text-center">
					<p class="text-red-400 font-medium">Error: { filesQuery.error.message }</p>
				</div>
			{:else if filesQuery.data && filesQuery.data.resources.length > 0}
				{@const data = filesQuery.data}
				<div class="space-y-6">
					<div class="flex justify-between items-center bg-slate-900/40 px-6 py-4 rounded-2xl border border-slate-700/50 shadow-lg backdrop-blur-md">
						<div class="grid gap-1">
                            <div class="flex items-center gap-3">
                                <Breadcrumb bind:path={ folderToSearch } count={ data.total_count } />
                            </div>

                            <p class="text-xs font-mono text-cyan-100/40">Tiempo: { data.time }ms</p>
						</div>

                        <UploadFileButton
                            bind:isUploadOpen
                            hiddenButton    = { true }
                            hiddenText      = { true }
                        />
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{#each data.resources as resource}
							<CardFileManager { resource } onCopy={ copyToClipboard } />
						{/each}
					</div>
				</div>
			{:else}
				<div class="py-32 text-center space-y-4 bg-neon-glass rounded-2xl border-2 border-dashed border-slate-700/50">
                    <div class="p-4 bg-cyan-500/10 rounded-full mb-2 inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400/80"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <p class="text-cyan-100/60 text-lg font-medium">No hay archivos en <span class="text-cyan-400">{ folderToSearch.split( "|" ).pop( ) }</span>.</p>

                    <p class="text-sm text-cyan-200/40">La carpeta está vacía o solo contiene subcarpetas.</p>

                    <div class="flex justify-center">
                        <UploadFileButton
                            bind:isUploadOpen
                            hiddenText  = { false }
                            sizeText    = { 16 }
                            size        = { 24 }
                        />
                    </div>
				</div>
			{/if}
		</section>
	</div>
</main>

<UploadImage bind:open={ isUploadOpen } initialFolder={ folderToSearch } />

<Portal>
	<!-- Botón Flotante de Subida para móviles -->
	<button
		class   = "fixed bottom-24 right-6 z-[ 90 ] lg:hidden w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-600 to-purple-600 shadow-xl shadow-purple-500/40 flex items-center justify-center text-white active:scale-90 transition-all hover:scale-110 border border-white/20"
		onclick = { ( ) => isUploadOpen = true }
		title   = "Subir Archivo"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
	</button>
</Portal>
