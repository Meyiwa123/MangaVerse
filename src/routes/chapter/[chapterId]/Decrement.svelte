<script lang="ts">
  import { goto } from '$app/navigation';
  import { manga, currentIndex } from '$lib/stores';
  import { onMount } from 'svelte';

  let isDisabled = false;

  function decrement() {
    currentIndex.subscribe((value) => {
      manga.subscribe((mangaData) => {
        if (value > 0) {
          const chapterId = mangaData.chapters[value - 1].chapterId;
          goto(`/chapter/${chapterId}`);
        } else {
          const mangaId = mangaData.mangaId;
          goto(`/manga/${mangaId}`);
        }
      });
    });
  }

  onMount(() => {
    currentIndex.subscribe((value) => {
      isDisabled = value === 0;
    });
  });
</script>

<button on:click={decrement} disabled={isDisabled}>Previous</button>
