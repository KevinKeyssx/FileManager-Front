<script lang="ts">
	import SEO from "$lib/components/shared/SEO.svelte";
</script>

<SEO
	title="FileManager - Tu centro de medios en la nube"
	description="Sube, organiza, optimiza y transforma tus imágenes y videos al instante. Una experiencia diseñada para la velocidad y la belleza."
/>

<div class="relative overflow-hidden w-full">
	<!-- Elementos de fondo decorativos -->
	<div class="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none"></div>
	<div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none"></div>
	
	<!-- Hero Section -->
	<section class="relative max-w-[1400px] mx-auto px-4 md:px-8 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md mb-8 animate-fade-in-up">
			<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
			<span class="text-xs font-semibold text-cyan-200 tracking-wider uppercase">FileManager v2.0 Disponible</span>
		</div>

		<h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1] animate-fade-in-up animation-delay-100">
			Gestiona tus <br class="hidden md:block"/>
			<span class="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-indigo-400 to-purple-400 drop-shadow-lg">
				recursos sin límites.
			</span>
		</h1>

		<p class="text-lg md:text-xl text-cyan-100/60 max-w-2xl mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
			La plataforma definitiva para organizar, optimizar y transformar tus imágenes en tiempo real. Interfaz moderna, subidas ultrarrápidas y control total sobre tus medios.
		</p>

		<div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
			<a 
				href="/dashboard" 
				class="px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-600 to-purple-600 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-15px_rgba(6,182,212,0.7)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
			>
				Ir al Dashboard
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
			</a>
			
			<a 
				href="https://github.com/KevinKeyssx/FileManager-Front" 
				target="_blank"
				class="px-8 py-4 rounded-2xl bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-cyan-100 font-bold text-lg transition-all flex items-center justify-center gap-3 backdrop-blur-md"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
				Ver en GitHub
			</a>
		</div>
	</section>

	<!-- Features Section -->
	<section class="max-w-[1400px] mx-auto px-4 md:px-8 py-24 border-t border-slate-800/50 relative z-10">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-5xl font-bold mb-6 text-white">¿Cómo funciona?</h2>
			<p class="text-cyan-100/50 max-w-2xl mx-auto">Todo lo que necesitas para gestionar tus archivos, integrado en una sola plataforma rápida y fácil de usar.</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div class="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 group">
				<div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-cyan-500/20">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">1. Sube al instante</h3>
				<p class="text-cyan-100/60 text-sm leading-relaxed">
					Arrastra y suelta tus imágenes o videos en nuestra zona de carga optimizada. Soporta múltiples formatos y tamaños grandes sin bloqueos.
				</p>
			</div>

			<!-- Feature 2 -->
			<div class="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300 group">
				<div class="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-purple-500/20">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">2. Transforma sobre la marcha</h3>
				<p class="text-cyan-100/60 text-sm leading-relaxed">
					Aplica recortes, redimensionamiento, conversiones de formato (AVIF, WEBP) y reduce la calidad antes de guardar para ahorrar espacio.
				</p>
			</div>

			<!-- Feature 3 -->
			<div class="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all duration-300 group">
				<div class="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
				</div>
				<h3 class="text-xl font-bold text-white mb-3">3. Navegación jerárquica</h3>
				<p class="text-cyan-100/60 text-sm leading-relaxed">
					Organiza tus archivos en carpetas infinitas. Nuestro explorador con diseño de árbol te permite encontrar lo que buscas en milisegundos.
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		opacity: 0;
	}

	.animation-delay-100 {
		animation-delay: 100ms;
	}

	.animation-delay-200 {
		animation-delay: 200ms;
	}

	.animation-delay-300 {
		animation-delay: 300ms;
	}
</style>
