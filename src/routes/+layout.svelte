<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import favicon from '$lib/assets/favicon.svg';
	import SEO from '$lib/components/SEO.svelte';
	import './layout.css';

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
	{@render children()}
	<SvelteQueryDevtools initialIsOpen={ false } />
</QueryClientProvider>
