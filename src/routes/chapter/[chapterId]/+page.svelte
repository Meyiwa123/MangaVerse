<script lang="ts">
	import { chapterImages } from '$lib/stores';
	import Increment from './Increment.svelte';
	import Decrement from './Decrement.svelte';

	let chapterImagesData: string[];

	chapterImages.subscribe((value) => {
		chapterImagesData = value;
	});
</script>

<div class="image-container">
	{#each chapterImagesData as image}
		<img src={image} alt="Not available" class="chapter-image" />
	{/each}
	<div class="navigation-container">
		<Decrement />
		<Increment />
	</div>
</div>

<style>
	.image-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.chapter-image {
		margin-bottom: 20px;
		width: auto;
		height: auto;
		object-fit: cover;
	}

	.navigation-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 400px;
		margin-bottom: 20px;
	}
</style>
