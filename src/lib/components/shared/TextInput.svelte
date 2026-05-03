<script lang="ts">
	import type { KeyboardEventHandler } from "svelte/elements";

	let {
		id,
		label,
		value,
		placeholder = "",
		required    = false,
		onchange    = ( v: string ) => {},
		type        = "text",
		onkeydown   = ( ) => {}
	}: {
		id           : string;
		label        : string;
		value        : string;
		placeholder ?: string;
		required    ?: boolean;
		onchange    ?: ( v: string ) => void;
		type        ?: string;
		onkeydown   ?: KeyboardEventHandler<HTMLInputElement>;
	} = $props( );

	function handleInput( e: Event ) {
		onchange( ( e.target as HTMLInputElement ).value );
	}
</script>

<div class="space-y-2">
	<label for={ id } class="block text-sm font-medium text-cyan-200">{ label }</label>

	<input
		{ id }
		{ type }
		class="w-full rounded-lg bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-white p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-slate-900/70"
		placeholder={ placeholder }
		{ required }
		value={ value }
		oninput={ handleInput }
		onkeydown={ onkeydown }
	/>
</div>
