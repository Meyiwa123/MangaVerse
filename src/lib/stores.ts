import { writable } from 'svelte/store';
import type { Manga } from '$lib/types';

export let manga = writable<Manga>({} as Manga);
export let currentIndex = writable<number>(0);
export let chapterImages = writable<string[]>([]);
