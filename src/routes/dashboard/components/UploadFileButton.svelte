

<script lang="ts">
	let {
		isUploadOpen = $bindable( ),
		size         = 20,
		sizeText     = 12,
		hiddenText   = false,
		hiddenButton = false
	} = $props<{
		isUploadOpen : boolean;
		size?        : number;
		sizeText?    : number;
		hiddenText?  : boolean;
		hiddenButton?: boolean;
	}>( );
</script>

<button
	class   = "{ hiddenButton ? 'hidden lg:flex' : 'hidden lg:flex mx-auto' } gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 items-center justify-center"
	onclick = { ( ) => isUploadOpen = true }
>
	<svg 
		xmlns  = "http://www.w3.org/2000/svg" 
		width  = { size } 
		height = { size } 
		viewBox = "0 0 24 24"
		class  = "shrink-0"
	>
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5">
			<path stroke-dasharray="32" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="32;0"/></path>
			<path stroke-dasharray="2 4" stroke-dashoffset="6" d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9" opacity="0"><set fill="freeze" attributeName="opacity" begin="0.45s" to="1"/><animateTransform fill="freeze" attributeName="transform" begin="0.45s" dur="0.6s" type="rotate" values="-180 12 12;0 12 12"/><animate attributeName="stroke-dashoffset" begin="0.85s" dur="0.6s" repeatCount="indefinite" to="0"/></path>
			<path stroke-dasharray="10" stroke-dashoffset="10" d="M12 16v-7.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.85s" dur="0.2s" to="0"/></path>
			<path stroke-dasharray="8" stroke-dashoffset="8" d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.05s" dur="0.2s" to="0"/></path>
		</g>
	</svg>

	<span 
		class = "{ hiddenText ? 'hidden xl:block' : 'block' } whitespace-nowrap" 
		style = "font-size: { sizeText }px;"
	>
		Subir Archivo
	</span>
</button>

