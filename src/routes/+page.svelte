<script lang="ts">
	import UploadImage from "$lib/components/UploadImage.svelte";

	let isUploadOpen = $state( false );
</script>

<main class="max-w-4xl mx-auto p-8 bg-neon-glass rounded-2xl shadow-2xl border-2 border-slate-700/50 my-auto space-y-4">
	<div class="flex justify-between items-center">
		<h1 class="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-purple-400 drop-shadow-sm">
			UploadFiles
		</h1>

		<button
			class="px-6 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 text-sm font-semibold hover:bg-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10 active:scale-95"
			onclick={ ( ) => isUploadOpen = true }
		>
			Subir Archivo
		</button>
	</div>

	<hr class="border-slate-700/50" />

	<div class="py-12 text-center space-y-4">
		<p class="text-cyan-100/60 text-lg">
			Bienvenido al sistema de carga de imágenes optimizado.
		</p>
		<p class="text-sm text-cyan-200/40">
			Haz clic en el botón superior para comenzar la configuración de tu subida.
		</p>
	</div>
</main>

<UploadImage bind:open={ isUploadOpen } />
