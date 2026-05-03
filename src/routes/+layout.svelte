<script lang="ts">
	import { QueryClientProvider }  from '@tanstack/svelte-query';
	import { SvelteQueryDevtools }  from '@tanstack/svelte-query-devtools';
	import { Toaster, toast }       from "svelte-sonner";
	import { page }                 from '$app/state';

    import './layout.css';

	import SEO      from '$lib/components/shared/SEO.svelte';
	import Header   from '$lib/components/home/Header.svelte';
	import Footer   from '$lib/components/home/Footer.svelte';


	let { data, children } = $props();


    $effect( ( ) => {
		if ( page.url.searchParams.get( "error" ) === "unauthorized" ) {
			toast.error( "Acceso Denegado.", {
				description : "Tienes prohibido el acceso.",
				id          : "unauthorized-error",
			} );
		}
	} );
</script>


<SEO
	title="FileManager - Sube y optimiza tus imágenes"
	description="La plataforma más rápida para subir y transformar tus archivos e imágenes con configuraciones personalizadas."
/>


<svelte:head>
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />
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

	<Toaster 
		richColors 
		theme="dark"
		position="bottom-right"
		toastOptions={ {
			style : "background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 1rem; color: #f1f5f9;",
		} }
	/>

    <SvelteQueryDevtools initialIsOpen={ false } />
</QueryClientProvider>
