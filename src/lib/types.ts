export interface Manga {
	mangaId: string;
	mangaTitle: string;
	description: string;
	latestChapter: string;
	latestChapterId: string;
	latestChapterDateUploaded: string;
	status: string;
	genres: string[];
	mangaCoverUrl: string;
	chapters: Chapter[];
}

export interface Chapter {
	chapterId: string;
	chapterTitle: string;
	chapterNumber: number;
}
