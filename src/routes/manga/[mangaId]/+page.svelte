<script lang="ts">
    import type { Manga } from '$lib/types';
	import { manga } from '$lib/stores';
    import { formatDate } from '$lib/utils';
    let mangaData: Manga;

    manga.subscribe(value => {
        mangaData = value;
    });
</script>

<!-- SEO -->
<svelte:head>
	<title>{mangaData.mangaTitle}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={mangaData.mangaTitle} />
</svelte:head>

<article>
	<h1>{mangaData.mangaTitle}</h1>
	<img src={mangaData.mangaCoverUrl} alt={mangaData.mangaTitle} />

	<div class="tags">
		{#each mangaData.genres as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="content">
        <p>Published at {formatDate(mangaData.latestChapterDateUploaded)}</p>
		<p>{mangaData.description}</p>
	</div>

    <div class="chapters-box">
		{#each mangaData.chapters.sort((a, b) => b.chapterNumber - a.chapterNumber) as chapter}
			<a href="/chapter/{chapter.chapterId}">
				<p>Chapter {chapter.chapterNumber}: {chapter.chapterTitle}</p>
			</a>
		{/each}
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
	}

	h1 {
		text-transform: capitalize;
		font-size: 35px;
		max-width: 100%;
		padding-bottom: var(--size-3);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-3);
		margin-top: var(--size-7);
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}

	.content {
		margin-top: var(--size-4);
	}

	.content p {
		margin-bottom: var(--size-3);
	}

	.chapters-box {
		margin-top: var(--size-4);
		background-color: var(--color-gray-100);
		border-radius: var(--radius-md);
		padding: var(--size-4);
		max-height: 300px;
		overflow: auto;
	}
</style>
