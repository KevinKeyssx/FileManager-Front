<script lang="ts">

	import FolderNode from "./FolderNode.svelte";

	import { useFoldersQuery } from "$lib/queries/folders";

	let { folderName, folderPath, selectedPath, onSelectFolder } = $props<{ 
		folderName     : string, 
		folderPath     : string, 
		selectedPath   : string,
		onSelectFolder : ( path: string ) => void
	}>( );

	let isOpen = $state( false );

	const isSelected = $derived( selectedPath === folderPath );

	const subfoldersQuery = useFoldersQuery( ( ) => folderPath, ( ) => isOpen );

	function handleToggle( ) {
		isOpen = !isOpen;
		onSelectFolder( folderPath );
	}
</script>

<div class="flex flex-col">
	<button 
		class="flex items-center gap-2 py-2 px-3 rounded-xl transition-all text-left text-sm { isSelected ? 'bg-cyan-500/20 text-cyan-200 shadow-sm border border-cyan-500/30 font-semibold' : 'hover:bg-cyan-500/10 text-cyan-100/80 hover:text-cyan-100 border border-transparent' } group"
		onclick={ handleToggle }
	>
		<div class="transition-colors { isSelected ? 'text-cyan-400' : 'text-cyan-400/50 group-hover:text-cyan-400/80' }">
			{#if isOpen}
				<!-- ChevronDown -->
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
			{:else}
				<!-- ChevronRight -->
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
			{/if}
		</div>
		
		<div class="transition-colors { isSelected ? 'text-cyan-400' : 'text-cyan-500/70 group-hover:text-cyan-500' }">
			{#if isOpen}
				<!-- FolderOpen -->
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/></svg>
			{:else}
				<!-- Folder -->
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
			{/if}
		</div>

		<span class="truncate">{ folderName }</span>
	</button>

	{#if isOpen}
		<div class="flex flex-col gap-0.5 border-l border-slate-700/50 ml-[15px] pl-2 mt-0.5">
			{#if subfoldersQuery.isLoading}
				<div class="flex flex-col gap-2 my-1">
					<div class="h-8 bg-slate-800/50 rounded-xl animate-pulse w-full"></div>
					<div class="h-8 bg-slate-800/50 rounded-xl animate-pulse w-5/6"></div>
				</div>
			{:else if subfoldersQuery.isError}
				<div class="text-red-400 text-xs my-1 p-2 bg-red-500/10 rounded-lg">
					Error: { subfoldersQuery.error.message }
				</div>
			{:else if subfoldersQuery.data && subfoldersQuery.data.length > 0}
				{#each subfoldersQuery.data as childFolder}
					<FolderNode 
						folderName={ childFolder } 
						folderPath={ `${ folderPath }|${ childFolder }` } 
						{ selectedPath }
						{ onSelectFolder } 
					/>
				{/each}
			{/if}
		</div>
	{/if}
</div>
