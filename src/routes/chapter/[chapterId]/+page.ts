import { error } from '@sveltejs/kit';
import { manga, chapterImages, currentIndex } from '$lib/stores';
import { fetchChapterImagesByChapterId } from '$lib/utils';

export async function load({ params }) {
	const chapterId = params.chapterId;

	try {
		const chapterImagesData = await fetchChapterImagesByChapterId(chapterId);

		if (chapterImagesData.length === 0) {
			throw error(404, `Could not find chapter with ID ${chapterId}`);
		}

		manga.subscribe((mangaData) => {
    	const currentIndexData: number = Number(
				mangaData.chapters.findIndex((chapter) => chapter.chapterId === chapterId)
			);
    		currentIndex.set(currentIndexData);
  		});

		chapterImages.set(chapterImagesData);
	} catch (e) {
		throw error(500, 'Failed to fetch chapter data');
	}
}
