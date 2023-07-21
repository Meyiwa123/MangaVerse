<script lang="ts">
	import { onMount } from 'svelte';
	import * as config from '$lib/config';
	import type { Manga } from '$lib/types';
	import { fetchLatestUpdatedManga } from '$lib/utils';

	let latestUpdatedMangaList: Manga[] = [];

	onMount(async () => {
		latestUpdatedMangaList = await fetchLatestUpdatedManga(15);
	});
</script>

<!-- SEO -->
<svelte:head>
	<title>{config.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={config.title} />
</svelte:head>

<div
	style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"
>
	{#each latestUpdatedMangaList as manga}
		<div class="manga-card">
			<a href="/manga/{manga.mangaId}">
				<img src={manga.mangaCoverUrl} title={manga.mangaTitle} alt="Imageunavailable" />
			</a>
			<div class="overlay">
				<div class="overlay-content">
					<h3>{manga.mangaTitle}</h3>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.manga-card {
		position: relative;
		display: inline-block;
		width: 80%;
	}

	.manga-card img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 8px;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		padding: 1rem;
		color: white;
		text-align: center;
		pointer-events: none;
	}

	.manga-card:hover .overlay {
		opacity: 1;
	}

	.overlay-content {
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		margin-top: 1rem;
	}

	.overlay-content h3 {
		color: white;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
</style>
