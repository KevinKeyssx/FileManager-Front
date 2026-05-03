<script lang="ts">
	import { Slider } from "bits-ui";

	let {
		id,
		label,
		value,
		min,
		max,
		step,
		onchange = ( v: number ) => {}
	} = $props();
</script>

<div class="space-y-2">
	<label for={ id } class="block text-sm font-medium text-cyan-200">{ label }</label>

    <Slider.Root
		type="single"
		{ id }
		{ min }
		{ max }
		{ step }
		value={ value }
		onValueChange={ ( v: number ) => onchange( v ) }
		class="relative flex w-full touch-none select-none items-center py-2"
	>
		<span class="relative h-2.5 w-full grow cursor-pointer overflow-hidden rounded-full bg-slate-800/80 shadow-inner">
			<Slider.Range class="absolute h-full bg-cyan-500" />
		</span>
		<Slider.Thumb
			index={ 0 }
			class="block h-5 w-5 cursor-pointer rounded-full border border-cyan-300 bg-slate-800 shadow-lg ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 hover:bg-slate-700 hover:border-cyan-200"
		/>
	</Slider.Root>
	<div class="text-xs text-gray-400 mt-2">Valor: { value }</div>
</div>
