<script lang="ts">
	let {
		id,
		label,
		value,
		placeholder = "",
		required    = false,
		onchange    = ( v: string ) => {}
	} = $props();

	function handleInput( e: Event ) {
		onchange( ( e.target as HTMLInputElement ).value );
	}
</script>

<div class="space-y-2">
	<label for={ id } class="block text-sm font-medium text-cyan-200">{ label }</label>

	<input
		id={ id }
		type="text"
		class="w-full rounded-lg bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-white p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-900/70"
		placeholder={ placeholder }
		{ required }
		value={ value }
		oninput={ handleInput }
	/>
</div>
