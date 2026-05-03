<script lang="ts">
	let {
		id,
		label,
		value,
		min,
		max,
		step     = 1,
		onchange = ( v: number ) => {},
		disabled = false
	} = $props( );


    let timer: number | null = null;


    function handleInput( e: Event ) {
		const val = parseFloat( ( e.target as HTMLInputElement ).value );
		onchange( isNaN( val ) ? 0 : val );
	}


    function adjust( delta: number ) {
		if ( disabled ) return;

		// Aseguramos que el valor actual sea un número para evitar concatenación de strings
		const currentVal = Number( value ) || 0;
		let newValue     = currentVal + delta;

		if ( min !== undefined ) newValue = Math.max( min, newValue );
		if ( max !== undefined ) newValue = Math.min( max, newValue );

		onchange( newValue );
	}


    function startAdjusting( delta: number ): void {
		if ( disabled ) return;

        adjust( delta );

		let delay = 400;

        const repeat = ( ) => {
			adjust( delta );

            delay = Math.max( 30, delay * 0.8 );
			timer = setTimeout( repeat, delay );
		};

        timer = setTimeout( repeat, delay );
	}


    function stopAdjusting( ): void {
		if ( !timer ) return;

        clearTimeout( timer );

        timer = null;
	}

	$effect( ( ) => {
		return ( ) => stopAdjusting( );
	});
</script>


<div class="space-y-2 w-full">
	<label for={ id } class="block text-sm font-medium text-cyan-200">{ label }</label>

	<div class="relative group">
		<input
			{ id }
			{ min }
			{ max }
			{ step }
			{ disabled }
			{ value }
			type    = "number"
			class   = "w-full rounded-lg bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-white p-2.5 pr-10 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-900/70 disabled:opacity-50 disabled:cursor-not-allowed no-spinner"
			oninput = { handleInput }
		/>

		<div class="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col h-[ calc( 100% - 8px ) ] w-8">
			<button
				type            = "button"
				class           = "flex-1 flex items-center justify-center text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-t-md transition-colors disabled:opacity-0"
				onmousedown     = { ( ) => startAdjusting( step ) }
				onmouseup       = { stopAdjusting }
				onmouseleave    = { stopAdjusting }
                aria-label      = "incrementar"
				{ disabled }
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
			</button>

            <button
				type            = "button"
				class           = "flex-1 flex items-center justify-center text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-b-md transition-colors border-t border-slate-700/30 disabled:opacity-0"
				onmousedown     = { ( ) => startAdjusting( -step ) }
				onmouseup       = { stopAdjusting }
				onmouseleave    = { stopAdjusting }
                aria-label      = "decrement"
				{ disabled }
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
			</button>
		</div>
	</div>
</div>

<style>
	.no-spinner::-webkit-outer-spin-button,
	.no-spinner::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.no-spinner {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
