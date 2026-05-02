<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import UploadImage from "$lib/components/UploadImage.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import SEO from "$lib/components/SEO.svelte";
	import type { FileManagerResponse } from "$lib/types";

	let isUploadOpen   = $state( false );
	let searchQuery    = $state( "" );
	let folderToSearch = $state( "" );

	const filesQuery = createQuery<FileManagerResponse, Error>( ( ) => ( {
		queryKey : [ "files", folderToSearch ],
		queryFn  : async ( ) => {
			const res = await fetch( `/api/filemanager/get-all?folder=${ encodeURIComponent( folderToSearch ) }` );
			if ( !res.ok ) throw new Error( "Error al obtener archivos" );
			return res.json( ) as Promise<FileManagerResponse>;
		},
		enabled : !!folderToSearch
	} ) );

	function updateSearch( v: string ) {
		searchQuery = v;
	}

	function handleSearch( ) {
		if ( !searchQuery.trim( ) ) return;
		folderToSearch = searchQuery.trim( );
	}

	async function copyToClipboard( text: string ) {
		try {
			await navigator.clipboard.writeText( text );
		} catch ( err ) {
			console.error( "Error al copiar: ", err );
		}
	}

	const normalizedDisplay = $derived( searchQuery.trim( ).replace( /\s+/g, "|" ) );
</script>

<SEO
	title="FileManager - Sube y optimiza tus imágenes"
	description="La plataforma más rápida para subir y transformar tus archivos e imágenes con configuraciones personalizadas."
/>

<main class="max-w-6xl mx-auto p-8 my-auto space-y-8">
	<section class="bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 p-8 space-y-6">
		<div class="flex justify-between items-center">
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

		<hr class="border-slate-700/50" />

		<div class="space-y-2">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
				<div class="md:col-span-3">
					<TextInput
						id="search"
						label="Buscar Folder"
						value={ searchQuery }
						placeholder="Ejemplo: uai mailstudio"
						onchange={ updateSearch }
						type="search"
						onkeydown={ ( e: KeyboardEvent ) => e.key === "Enter" && handleSearch( ) }
					/>
				</div>

				<button
					class="w-full py-2.5 rounded-xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50"
					onclick={ handleSearch }
					disabled={ !searchQuery.trim( ) || filesQuery.isFetching }
				>
					{ filesQuery.isFetching ? "Buscando..." : "Buscar" }
				</button>
			</div>
			{#if searchQuery.trim( )}
				<p class="text-[10px] text-cyan-400/60 font-mono ml-1">
					Formato: <span class="text-cyan-300">{ normalizedDisplay }</span>
				</p>
			{/if}
		</div>
	</section>

	{#if filesQuery.isLoading && filesQuery.isFetching}
		<div class="flex flex-col items-center py-20 space-y-4">
			<div class="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
			<p class="text-cyan-200/60 animate-pulse">Obteniendo recursos...</p>
		</div>
	{:else if filesQuery.isError}
		<div class="p-8 bg-red-500/10 border border-red-500/50 rounded-2xl text-center">
			<p class="text-red-400">Error: { filesQuery.error.message }</p>
		</div>
	{:else if filesQuery.data && filesQuery.data.resources.length > 0}
		{@const data = filesQuery.data}
		<div class="space-y-4">
			<div class="flex justify-between items-center">
				<h2 class="text-xl font-semibold text-cyan-100">Resultados ({ data.total_count })</h2>
				<p class="text-xs text-cyan-100/40">Tiempo: { data.time }ms</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.resources as resource}
					<div class="bg-slate-900/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-md hover:border-cyan-500/30 transition-all shadow-xl group">
						<div class="aspect-video relative overflow-hidden bg-slate-950">
							<img src={ resource.secure_url } alt={ resource.public_id } class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
							<div class="absolute top-2 right-2 px-2 py-1 bg-slate-950/80 rounded-lg text-[10px] font-bold text-cyan-400 uppercase tracking-wider border border-cyan-500/20">
								{ resource.format }
							</div>
						</div>
						<div class="p-4 space-y-3">
							<div class="flex justify-between items-center gap-2">
								<h3 class="text-sm font-semibold text-white truncate flex-1" title={ resource.public_id }>
									{ resource.public_id.split( "/" ).pop( ) }
								</h3>

                                <span
                                    class="w-2.5 h-2.5 rounded-full border border-white/10 shadow-sm"
                                    class:bg-cyan-500={ resource.status === "active" }
                                    class:bg-red-500={ resource.status === "inactive" }
                                    title={ resource.status }
                                ></span>
							</div>

							<div class="grid grid-cols-3 gap-y-2 gap-x-1 text-[ 11px ] text-cyan-100/60">
								<div class="flex items-center gap-1.5 text-xs">
									<span class="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
									{ resource.width } x { resource.height }
								</div>

                                <div class="flex items-center gap-1.5 text-xs">
									<span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
									{ ( resource.bytes / 1024 ).toFixed( 2 ) } KB
								</div>

                                <div class="flex items-center gap-1.5 text-xs">
									<span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
									{ resource.resource_type }
								</div>
							</div>

                            <div class="flex gap-2 items-center">
                                <a 
                                    href={ resource.secure_url } 
                                    target="_blank" 
                                    class="block w-full py-2 text-center rounded-xl bg-slate-800/50 hover:bg-cyan-500/20 text-cyan-200 text-xs font-semibold transition-all border border-slate-700 hover:border-cyan-500/50"
                                >
                                    Ver Imagen
                                </a>

                                <button
                                    class="p-2 rounded-lg bg-slate-800/50 text-cyan-400/70 hover:text-cyan-400 hover:bg-slate-800 transition-all border border-slate-700/50"
                                    onclick={ ( ) => copyToClipboard( resource.secure_url ) }
                                    title="Copiar URL segura"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                </button>
                            </div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if folderToSearch}
		<div class="py-20 text-center space-y-4 bg-slate-900/20 rounded-2xl border border-dashed border-slate-700/50">
			<p class="text-cyan-100/60 text-lg">No se encontraron archivos en este folder.</p>
			<p class="text-sm text-cyan-200/40">Intenta buscar con otro nombre o verifica el formato.</p>
		</div>
	{:else}
		<div class="py-20 text-center space-y-4">
			<p class="text-cyan-100/60 text-lg">
				Bienvenido al sistema de carga de imágenes optimizado.
			</p>
			<p class="text-sm text-cyan-200/40">
				Ingresa un nombre de folder arriba para explorar los archivos existentes.
			</p>
		</div>
	{/if}
</main>

<UploadImage bind:open={ isUploadOpen } />
