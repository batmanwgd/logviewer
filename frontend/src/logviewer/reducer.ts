import { CountedPage, Stats, Line } from './page';
import { config } from './config';

export interface Book {
  pages: CountedPage[];
  stats: Stats;
}

const addPageToBook = (book: Book, page: CountedPage): Book => {
  const pageIndex = book.pages.findIndex((p: CountedPage) => p.start === page.start);
  if (pageIndex === -1) {
    const pages = [...book.pages, page];

    const stats: Stats = page.lines.reduce<Stats>((acc: Stats, line: Line) => {
      const newStats = { ...acc };
      const key = line.severity;
      newStats[key] = (newStats[key] | 0) + 1;
      return newStats;
    }, book.stats);

    return { ...book, pages, stats };
  }

  const pages = [...book.pages];
  pages[pageIndex] = page;

  return { ...book, pages };
};

const evictLinesAboveMax = (book: Book, page: CountedPage): Book => {
  const addedIndex = book.pages.indexOf(page);
  const middleIndex = Math.floor(book.pages.length / 2);
  while (
    book.pages.reduce<number>((acc: number, page: CountedPage) => acc + page.lines.length, 0) > config.MAX_LINES_SHOWN
  ) {
    const searchIn = addedIndex > middleIndex ? book.pages : book.pages.slice().reverse();
    const evictCandidate = searchIn.find((page: CountedPage) => page.lines.length > 0) as CountedPage;
    const evictIndex = book.pages.indexOf(evictCandidate);
    book.pages[evictIndex].lines = [];
  }

  return book;
};

export const bookReducer = (book: Book, page: CountedPage): Book => {
  const bookWithNewPage = addPageToBook(book, page);
  return evictLinesAboveMax(bookWithNewPage, page);
};
