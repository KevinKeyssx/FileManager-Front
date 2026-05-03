<script lang="ts">
	import { DEFAULT_SEO } from "$lib/seo";
	import type { SEOMetadata } from "$lib/seo";

	let {
		title       = DEFAULT_SEO.title,
		description = DEFAULT_SEO.description,
		canonical,
		ogType      = DEFAULT_SEO.ogType,
		ogImage,
		noindex     = DEFAULT_SEO.noindex
	}: SEOMetadata = $props();

	const siteName = "FileManager";
</script>

<svelte:head>
	<title>{ title }</title>
	<meta name="description" content={ description } />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	{#if canonical}
		<link rel="canonical" href={ canonical } />
	{/if}

	<!-- Open Graph -->
	<meta property="og:site_name" content={ siteName } />
	<meta property="og:title" content={ title } />
	<meta property="og:description" content={ description } />
	<meta property="og:type" content={ ogType } />
	{#if ogImage}
		<meta property="og:image" content={ ogImage } />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ title } />
	<meta name="twitter:description" content={ description } />
	{#if ogImage}
		<meta name="twitter:image" content={ ogImage } />
	{/if}
</svelte:head>
