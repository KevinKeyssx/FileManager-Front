<script lang="ts">
	import { Dialog } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		open        = $bindable( false ),
		title       = "",
		description = "",
		trigger,
		children
	}: {
		open?        : boolean;
		title?       : string;
		description? : string;
		trigger?     : Snippet;
		children     : Snippet;
	} = $props();
</script>

<Dialog.Root bind:open>
	{#if trigger}
		<Dialog.Trigger>
			{@render trigger()}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
		/>
		<Dialog.Content
			class="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
		>
			<div class="neon-glass w-full max-w-2xl rounded-3xl p-8 border-2 border-slate-700/50 shadow-2xl relative">
				{#if title}
					<Dialog.Title class="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400 mb-2">
						{ title }
					</Dialog.Title>
				{/if}

				{#if description}
					<Dialog.Description class="text-sm text-cyan-100/60 mb-6">
						{ description }
					</Dialog.Description>
				{/if}

				<div class="mt-4">
					{@render children()}
				</div>

				<Dialog.Close
					class="absolute right-6 top-6 rounded-xl p-2 text-cyan-200/50 hover:text-cyan-200 hover:bg-white/5 transition-all"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
					<span class="sr-only">Cerrar</span>
				</Dialog.Close>
			</div>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
