import type { Manga, Chapter } from '$lib/types';

export async function fetchLatestUpdatedManga(limit: number): Promise<Manga[]> {
	const endpoint = 'https://api.mangadex.org/manga';
	const queryParams = `?limit=${limit}&order[latestUploadedChapter]=desc&includes[]=cover_art`;
	const manga = await fetchManga(endpoint, queryParams);
	return manga;
}

export async function fetchMangaById(mangaId: string) {
	const mangaEndpoint = `https://api.mangadex.org/manga/${mangaId}`;
	const mangaQueryParams = '?includes[]=cover_art';
	const chapterEndpoint = `https://api.mangadex.org/manga/${mangaId}/feed`;
	const chapterQueryParams = '';

	const [mangaData, chapterData] = await Promise.all([
		fetchManga(mangaEndpoint, mangaQueryParams),
		fetchChapterList(chapterEndpoint, chapterQueryParams)
	]);

	const mangaWithChapters = mangaData.map((manga: any) => ({
		...manga,
		chapters: chapterData
	}));

	return mangaWithChapters[0];
}

async function fetchManga(endpoint: string, queryParams: string): Promise<Manga[]> {
	try {
		const response = await fetch(`${endpoint}${queryParams}`);
		const data = await response.json();

		if (response.ok && data.data) {
			const mangaData = Array.isArray(data.data) ? data.data : [data.data];
			return mangaData.map(extractMangaData);
		} else {
			console.error('Error:', data.errors);
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}

function extractMangaData(data: any): Manga {
	const coverArt = data.relationships.find((relation: any) => relation.type === 'cover_art');
	const fileName = coverArt?.attributes.fileName || 'Cover art file name not available';
	const genres = data.attributes.tags
		.filter((tag: any) => tag.attributes.group === 'genre')
		.map((tag: any) => tag.attributes.name.en);

	return {
		mangaId: data.id,
		mangaTitle: data.attributes.title.en || 'Title not available',
		description: data.attributes.description.en || 'Description not available',
		latestChapter: data.attributes.lastChapter || 'Last chapter not available',
		latestChapterDateUploaded: data.attributes.updatedAt || 'Update date not available',
		status: data.attributes.status || 'Status not available',
		latestChapterId:
			data.attributes.latestUploadedChapter || 'Latest uploaded chapter not available',
		mangaCoverUrl: `https://uploads.mangadex.org/covers/${data.id}/${fileName}.256.jpg`,
		genres: genres || [],
		chapters: []
	};
}

async function fetchChapterList(endpoint: string, queryParams: string): Promise<Chapter[]> {
	try {
		const response = await fetch(`${endpoint}${queryParams}`);
		const data = await response.json();

		if (response.ok && data.data) {
			const results = data.data;
			const chapterData: Chapter[] = await Promise.all(
				results.map(async (result: any) => {
					return {
						chapterId: result.id,
						chapterNumber: result.attributes.chapter || 'Chapter not available',
						chapterTitle: result.attributes.title || 'Title not available'
					};
				})
			);
			return chapterData;
		} else {
			console.error('Error:', data.errors);
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}

export async function fetchChapterImagesByChapterId(chapterId: string): Promise<string[]> {
	const chapterImages = await fetchChapterImages(
		`https://api.mangadex.org/at-home/server/${chapterId}`
	);
	return chapterImages;
}

async function fetchChapterImages(endpoint: string): Promise<string[]> {
	try {
		const response = await fetch(endpoint);
		const data = await response.json();

		if (response.ok && data.baseUrl) {
			const results = data.chapter.data;
			const images: string[] = results.map((image: string) => {
				return `${data.baseUrl}/data/${data.chapter.hash}/${image}`;
			});
			return images;
		} else {
			console.error('Error:', data.errors);
			return [];
		}
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];
export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return formatter.format(new Date(date));
}
