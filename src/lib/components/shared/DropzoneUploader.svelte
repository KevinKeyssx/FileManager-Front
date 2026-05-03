<script lang="ts">
	let { onfileselected } = $props<{ onfileselected : ( file: File | null ) => void }>( );

	let isDragging = $state( false );
	let previewUrl = $state<string | null>( null );
	let fileName   = $state( "" );

	function handleFile( f: File ) {
		if ( previewUrl ) URL.revokeObjectURL( previewUrl );
		previewUrl = URL.createObjectURL( f );
		fileName   = f.name;
		onfileselected( f );
	}

	function removeFile( ) {
		if ( previewUrl ) URL.revokeObjectURL( previewUrl );
		previewUrl = null;
		fileName   = "";
		onfileselected( null );
	}

	function handleDrop( e: DragEvent ) {
		e.preventDefault( );
		isDragging = false;
		const f    = e.dataTransfer?.files?.[ 0 ];
		if ( f ) handleFile( f );
	}

	function handleDragOver( e: DragEvent ) {
		e.preventDefault( );
		isDragging = true;
	}

	function handleDragLeave( _e: DragEvent ) {
		isDragging = false;
	}

	function handleInputChange( e: Event ) {
		const f = ( e.target as HTMLInputElement ).files?.[ 0 ];
		if ( f ) handleFile( f );
	}
</script>

<div
	role="presentation"
	class={ `border border-slate-700/50 rounded-2xl p-6 bg-slate-950/50 backdrop-blur-lg text-white transition-all duration-300 hover:bg-slate-950/70 ${ isDragging ? 'ring-2 ring-cyan-400 border-cyan-400' : 'shadow-inner' }` }
	ondragover={ handleDragOver }
	ondragleave={ handleDragLeave }
	ondrop={ handleDrop }
>
	<div class="flex items-center justify-between mb-4">
		<div class="flex items-center gap-2">
			<span class="w-5 h-5 rounded-full bg-cyan-400 inline-block"></span>

            <strong>Archivo</strong>
		</div>

        <span class="text-xs opacity-70">
			{ previewUrl ? 'Imagen seleccionada' : 'Arrastra la imagen' }
		</span>
	</div>

	{#if previewUrl}
		<div class="relative group aspect-video rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-slate-900 shadow-2xl">
			<img
				src={ previewUrl }
				alt="Preview"
				class="w-full h-full object-contain"
			/>

            <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
				<p class="text-xs font-medium text-cyan-100 truncate max-w-[ 80% ]">{ fileName }</p>

                <button
					class="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-xs font-bold hover:bg-red-500/30 transition-all active:scale-95 flex items-center gap-2"
					onclick={ removeFile }
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
					Eliminar
				</button>
			</div>
		</div>
	{:else}
		<div
			role="button"
			tabindex="0"
			class="border-dashed border-2 border-cyan-400/40 rounded-xl p-8 text-center cursor-pointer hover:bg-cyan-400/5 hover:border-cyan-400 transition-all group"
			onclick={ ( ) => ( document.getElementById( 'hidden-file-input' ) as HTMLInputElement )?.click( ) }
			onkeydown={ ( e ) => e.key === 'Enter' && ( document.getElementById( 'hidden-file-input' ) as HTMLInputElement )?.click( ) }
		>
			<div class="mb-3 flex justify-center">
				<div class="p-4 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
				</div>
			</div>

            <p class="text-sm text-cyan-100 font-medium">Arrastra y suelta aquí</p>

            <p class="text-xs text-cyan-100/40 mt-1">o haz clic para seleccionar</p>

            <input
				id="hidden-file-input"
				type="file"
				accept="image/*"
				class="hidden"
				onchange={ handleInputChange }
			/>
		</div>
	{/if}
</div>
