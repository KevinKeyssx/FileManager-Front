<script lang="ts">
	// type Option = {
	// 	value : string;
	// 	label : string;
	// };

	let {
		id,
		label,
		value    = $bindable(),
		options  = [],
		onchange = ( v: string ) => {}
	} = $props();

	function handleChange( e: Event ) {
		onchange( ( e.target as HTMLSelectElement ).value );
	}
</script>

<div class="space-y-2">
	<label for={ id } class="block text-sm font-medium text-cyan-200 ">{ label }</label>

    <select
		id={ id }
		class="w-full rounded-lg bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-white p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-900/70"
		bind:value={ value }
		onchange={ handleChange }
	>
		{#each options as opt}
			<option value={ opt.value }>{ opt.label }</option>
		{/each}
	</select>
</div>
