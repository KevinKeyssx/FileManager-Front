<script lang="ts">
	import { createQuery }              from "@tanstack/svelte-query";
	import UploadImage                  from "$lib/components/UploadImage.svelte";
	import FolderTree                   from "$lib/components/FolderTree.svelte";
	import SEO                          from "$lib/components/shared/SEO.svelte";
	import CardFileManager              from "$lib/components/CardFileManager.svelte";
	import type { FileManagerResponse } from "$lib/types";


	let isUploadOpen   = $state( false );
	let folderToSearch = $state( "" );


    const filesQuery = createQuery<FileManagerResponse, Error>( ( ) => ( {
		queryKey : [ "files", folderToSearch ],
		queryFn  : async ( ) => {
			const res = await fetch( `/api/filemanager/get-all?folder=${ encodeURIComponent( folderToSearch ) }` );
			if ( !res.ok ) throw new Error( "Error al obtener archivos" );
			return res.json( ) as Promise<FileManagerResponse>;
		},
		enabled : !!folderToSearch
	}));


    async function copyToClipboard( text: string ) {
		try {
			await navigator.clipboard.writeText( text );
		} catch ( err ) {
			console.error( "Error al copiar: ", err );
		}
	}
</script>

<SEO
	title="FileManager - Sube y optimiza tus imágenes"
	description="La plataforma más rápida para subir y transformar tus archivos e imágenes con configuraciones personalizadas."
/>

<main class="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8">
	<section class="bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 p-6 md:p-8">
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
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
		<!-- Sidebar de Carpetas -->
		<aside class="lg:col-span-1 bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 p-5 flex flex-col h-[850px] sticky top-8">
			<h2 class="text-lg font-bold text-cyan-200 mb-4 flex items-center gap-2 pb-3 border-b border-slate-700/50">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
				Navegador
			</h2>
			<div class="overflow-y-auto flex-1 pr-2 custom-scrollbar">
				<FolderTree 
					selectedPath={ folderToSearch } 
					onSelectFolder={ ( path ) => folderToSearch = path } 
				/>
			</div>
		</aside>

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
						<div class="flex items-center gap-3">
							<!-- <h2 class="text-xl font-bold text-cyan-100">{ folderToSearch.split( "|" ).pop( ) }</h2> -->
							<h2 class="text-lg font-bold text-cyan-100">{ folderToSearch.replaceAll( "|", " > " ) }</h2>
							<span class="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
								{ data.total_count } archivos
							</span>
						</div>
						<p class="text-xs font-mono text-cyan-100/40">Tiempo: { data.time }ms</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{#each data.resources as resource}
							<CardFileManager { resource } onCopy={ copyToClipboard } />
						{/each}
					</div>
				</div>
			{:else}
				<div class="py-32 text-center space-y-4 bg-neon-glass rounded-2xl border-2 border-dashed border-slate-700/50">
					<p class="text-cyan-100/60 text-lg font-medium">No hay archivos en <span class="text-cyan-400">{ folderToSearch.split( "|" ).pop( ) }</span>.</p>
					<p class="text-sm text-cyan-200/40">La carpeta está vacía o solo contiene subcarpetas.</p>
				</div>
			{/if}
		</section>
	</div>
</main>

<UploadImage bind:open={ isUploadOpen } initialFolder={ folderToSearch } />

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba( 6, 182, 212, 0.2 );
		border-radius: 10px;
		border: 1px solid rgba( 6, 182, 212, 0.1 );
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba( 6, 182, 212, 0.4 );
	}

	/* Firefox */
	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: rgba( 6, 182, 212, 0.2 ) transparent;
	}
</style>
