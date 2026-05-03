<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import FolderNode from "./FolderNode.svelte";

	let { selectedPath, onSelectFolder } = $props<{ 
		selectedPath   : string,
		onSelectFolder : ( path: string ) => void 
	}>( );

	const rootFoldersQuery = createQuery<string[], Error>( ( ) => ( {
		queryKey : [ "folders", "" ],
		queryFn  : async ( ) => {
			const res = await fetch( `/api/filemanager/get-folders?folder_name=` );
			if ( !res.ok ) throw new Error( "Error al obtener carpetas" );
			return res.json( ) as Promise<string[]>;
		}
	} ) );
</script>

{#if rootFoldersQuery.isLoading}
	<div class="space-y-2 p-2">
		<div class="h-9 bg-slate-800/50 rounded-xl animate-pulse w-full"></div>
		<div class="h-9 bg-slate-800/50 rounded-xl animate-pulse w-3/4"></div>
		<div class="h-9 bg-slate-800/50 rounded-xl animate-pulse w-5/6"></div>
	</div>
{:else if rootFoldersQuery.isError}
	<div class="text-red-400 text-sm p-4 bg-red-500/10 rounded-xl border border-red-500/20 m-2">
		Error: { rootFoldersQuery.error.message }
	</div>
{:else if rootFoldersQuery.data}
	<div class="flex flex-col gap-1 p-1">
		{#each rootFoldersQuery.data as folder}
			<FolderNode 
				folderName={ folder } 
				folderPath={ folder } 
				{ selectedPath }
				{ onSelectFolder } 
			/>
		{/each}
		{#if rootFoldersQuery.data.length === 0}
			<div class="text-cyan-200/50 text-sm italic p-4 text-center">No hay carpetas.</div>
		{/if}
	</div>
{/if}
