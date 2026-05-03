<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

    import './layout.css';

    import favicon  from '$lib/assets/favicon.svg';
	import SEO      from '$lib/components/shared/SEO.svelte';
	import Header   from '$lib/components/home/Header.svelte';
	import Footer   from '$lib/components/home/Footer.svelte';


	let { data, children } = $props();
</script>

<SEO
	title="FileManager - Sube y optimiza tus imágenes"
	description="La plataforma más rápida para subir y transformar tus archivos e imágenes con configuraciones personalizadas."
/>

<svelte:head>
	<link rel="icon" href={ favicon } />
</svelte:head>

<QueryClientProvider client={ data.queryClient }>
	<main class="min-h-screen flex flex-col  text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
		<!-- Header -->
		<Header />

		<!-- Main Content -->
		<section class="flex-1">
			{@render children( )}
		</section>

		<!-- Footer -->
		<Footer />
	</main>

    <SvelteQueryDevtools initialIsOpen={ false } />
</QueryClientProvider>
