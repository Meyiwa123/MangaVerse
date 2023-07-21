<script lang="ts">
import { goto } from '$app/navigation';
	import { manga, currentIndex } from '$lib/stores';

	function increment() {
		currentIndex.subscribe((value) => {
			manga.subscribe((mangaData) => {
				if (value < mangaData.chapters.length - 1) {
					const chapterId = mangaData.chapters[value + 1].chapterId;
					goto(`/chapter/${chapterId}`);
				} else {
                    const mangaId = mangaData.mangaId;
					goto(`manga/${mangaId}`);
				}
			});
		});
	}
</script>

<button on:click={increment}>Next</button>
