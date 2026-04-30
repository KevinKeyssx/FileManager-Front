<script lang="ts">
	let {
		onfileselected = ( f: File ) => {}
	} = $props();

	let isDragging = $state( false );

	// SSR-safe: la interacción real ocurrirá en cliente
	function handleDrop( e: DragEvent ) {
		e.preventDefault();
		isDragging = false;
		const f    = e.dataTransfer?.files?.[ 0 ];
		if ( f ) onfileselected( f );
	}

	function handleDragOver( e: DragEvent ) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave( _e: DragEvent ) {
		isDragging = false;
	}

	function handleInputChange( e: Event ) {
		const f = ( e.target as HTMLInputElement ).files?.[ 0 ];
		if ( f ) onfileselected( f );
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
			<strong>Dropzone</strong>
			<span class="ml-2 text-xs text-gray-200/70">( UI )</span>
		</div>
		<span class="text-xs opacity-70">Drop an image</span>
	</div>
	<div
		role="button"
		tabindex="0"
		class="border-dashed border-2 border-cyan-400 rounded-md p-6 text-center cursor-pointer hover:bg-opacity-80"
		onclick={ () => ( document.getElementById( 'hidden-file-input' ) as HTMLInputElement )?.click() }
		onkeydown={ ( e ) => e.key === 'Enter' && ( document.getElementById( 'hidden-file-input' ) as HTMLInputElement )?.click() }
	>
		<p class="mb-2">Arrastra y suelta aquí o haz clic para seleccionar</p>
		<input
			id="hidden-file-input"
			type="file"
			accept="image/*"
			class="hidden"
			onchange={ handleInputChange }
		/>
	</div>
	<p class="text-xs text-cyan-200 mt-2 text-center">Este área es solo UI para la fase actual de implementación.</p>
</div>
