<script lang="ts">
	let { path = $bindable( "" ), count = 0 } = $props<{ 
		path  : string;
		count : number;
	}>( );

	const segments = $derived( path ? path.split( "|" ) : [ ] );

	function navigateTo( index: number ) {
		path = segments.slice( 0, index + 1 ).join( "|" );
	}
</script>

<nav class="flex flex-wrap items-center gap-1.5" aria-label="Breadcrumb">
	<button 
		class="p-1.5 rounded-lg text-cyan-500/70 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
		onclick={ ( ) => path = "" }
		title="Raíz"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
	</button>

	{#each segments as segment, index}
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><path d="m9 18 6-6-6-6"/></svg>

		<div class="flex items-center gap-1.5">
			<button 
				class="px-2.5 py-1 text-sm font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/40 { index === segments.length - 1 ? 'text-cyan-100 bg-cyan-500/10 border border-cyan-500/20 cursor-default shadow-sm shadow-cyan-500/10' : 'text-cyan-500/70 hover:text-cyan-300 hover:bg-slate-800/50' }"
				onclick={ ( ) => index !== segments.length - 1 && navigateTo( index ) }
			>
				{ segment }
			</button>

			{#if index === segments.length - 1 && count > 0}
				<span
					class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30"
					title={ count === 1 ? '1 Archivo' : `${ count } Archivos` }
				>
					{ count }

					<span class="hidden md:flex">
						archivos
					</span>
				</span>
			{/if}
		</div>
	{/each}
</nav>
