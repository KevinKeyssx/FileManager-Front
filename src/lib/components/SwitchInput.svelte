<script lang="ts">
	let {
		id,
		label,
		checked,
		onchange = ( v: boolean ) => {}
	} = $props();

	function toggle() {
		onchange( !checked );
	}
</script>

<div class="flex items-center">
	<button
		type="button"
		aria-pressed={ checked }
		onclick={ toggle }
		class={ `relative inline-flex items-center h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 border ${ checked ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-800/80 border-slate-600/50' }` }
	>
		<span class="sr-only">{ label }</span>
		<span
			class="inline-block w-4 h-4 bg-white rounded-full shadow"
			style="transform: translateX({ checked ? '1.5rem' : '0' })"
		></span>
	</button>
	<label for={ id } class="ml-3 text-sm text-cyan-200">{ label }</label>
</div>
