<script lang="ts">
	import { Portal }  from "bits-ui";
	import FolderTree  from "$lib/components/FolderTree.svelte";

	let { folderToSearch = $bindable( ) } = $props<{ 
		folderToSearch : string;
	}>( );

	let isOpen = $state( false );

	function toggle( ) {
		isOpen = !isOpen;
	}
</script>


{#snippet Content( showCloseButton = false )}
	<div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
		<h2 class="text-lg font-bold text-cyan-200 flex items-center gap-3">
			<div class="p-2 bg-cyan-500/10 rounded-lg">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
			</div>

            Navegador
		</h2>

		{#if showCloseButton}
			<button
				class           = "p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
				onclick         = { toggle }
                aria-controls   = "navigator"
                aria-expanded   = { isOpen }
                aria-label      = { isOpen ? "Cerrar" : "Abrir" }
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
			</button>
		{/if}
	</div>

	<div class="overflow-y-auto flex-1 pr-2 custom-scrollbar">
		<FolderTree
			selectedPath   = { folderToSearch }
			onSelectFolder = { ( path ) => {
				folderToSearch = path;
				if ( window.innerWidth < 1024 ) isOpen = false;
			}}
		/>
	</div>
{/snippet}


<!-- Versión Desktop: Sidebar fija en el Grid -->
<aside class="hidden lg:flex sticky top-8 lg:h-[ 850px ] lg:w-full bg-neon-glass border-2 border-slate-700/50 p-5 flex-col lg:rounded-2xl">
	{@render Content( )}
</aside>

<!-- Versión Móvil: Teletransportada al final del Body con Portal -->
<Portal>
	<div class="lg:hidden">
		<!-- Overlay con desenfoque -->
		{#if isOpen}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div 
				class   = "fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[ 100 ] transition-opacity duration-300"
				onclick = { toggle }
			></div>
		{/if}

		<!-- Drawer Lateral -->
		<aside 
			class = "fixed top-0 left-0 z-[ 110 ] h-full w-[ 300px ] bg-slate-950 border-r border-slate-700/50 p-5 flex flex-col transition-transform duration-300 transform { isOpen ? 'translate-x-0' : '-translate-x-full' } shadow-2xl"
		>
			{@render Content( true )}
		</aside>

		<!-- Botón Flotante para móviles -->
		<button
			class   = "fixed bottom-8 right-6 z-[ 90 ] w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/40 flex items-center justify-center text-white active:scale-90 transition-all hover:scale-110 border border-white/20"
			onclick = { toggle }
			title   = "Abrir Navegador"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
		</button>
	</div>
</Portal>


<style>
	.custom-scrollbar::-webkit-scrollbar {
		width : 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background : transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background    : rgba( 34, 211, 238, 0.2 );
		border-radius : 10px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background : rgba( 34, 211, 238, 0.4 );
	}
</style>
