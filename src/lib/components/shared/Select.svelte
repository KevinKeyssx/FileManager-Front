<script lang="ts">
	import { Select } from "bits-ui";

	let {
		id,
		label,
		value    = $bindable( "" ),
		options  = [],
		onchange = ( v: string ) => {}
	}: {
		id?      : string;
		label?   : string;
		value?   : string;
		options  : { value: string; label: string }[];
		onchange : ( v: string ) => void;
	} = $props();

	// Buscar el label actual para mostrarlo en el trigger
	let selectedLabel = $derived(
		options.find( ( opt ) => opt.value === value )?.label ?? "Seleccionar..."
	);
</script>

<div class="space-y-2">
	{#if label}
		<label
			for={ id }
			class="block text-sm font-medium text-cyan-200"
		>
			{ label }
		</label>
	{/if}

	<Select.Root
		type="single"
		bind:value
		onValueChange={ ( v ) => onchange( v as string ) }
	>
		<Select.Trigger
			{ id }
			class="inline-flex w-full items-center justify-between rounded-lg bg-slate-900/50 border border-slate-700/50 p-2.5 text-sm text-white backdrop-blur-sm transition-all hover:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-cyan-400"
		>
			<Select.Value class="text-sm">
				{ selectedLabel }
			</Select.Value>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="opacity-50"
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="z-50 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/90 p-1 text-white shadow-2xl backdrop-blur-xl"
				style="width: var( --bits-select-anchor-width ); min-width: var( --bits-select-anchor-width );"
				sideOffset={ 4 }
			>
				<Select.Viewport class="p-1">
					{#each options as opt}
						<Select.Item
							value={ opt.value }
							label={ opt.label }
							class="relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 px-4 text-sm outline-none transition-colors hover:bg-cyan-500/10 focus:bg-cyan-500/20 data-selected:text-cyan-400"
						>
							{#snippet children({ selected })}
								{ opt.label }
								{#if selected}
									<div class="ml-auto">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="14"
											height="14"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="3"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="text-cyan-400"
										>
											<polyline points="20 6 9 17 4 12" />
										</svg>
									</div>
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
