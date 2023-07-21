import { manga } from '$lib/stores';
import { error } from '@sveltejs/kit';
import { fetchMangaById } from '$lib/utils';

export async function load({ params }) {
	const mangaId = params.mangaId;

	try {
		const mangaData = await fetchMangaById(mangaId);

		if (mangaData.length === 0) {
			throw error(404, `Could not find manga with ID ${mangaId}`);
		}

		manga.set(mangaData)
	} catch (e) {
		throw error(500, 'Failed to fetch manga data');
	}
}
