import { CountedPage, Stats, Line } from './page';
import { config } from './config';

export interface Book {
  pages: CountedPage[];
  stats: Stats;
}

export const bookReducer = (book: Book, page: CountedPage): Book => {
  const pageIndex = book.pages.findIndex((p: CountedPage) => p.start === page.start);
  if (pageIndex === -1) {
    const pages = [...book.pages, page];

    const stats: Stats = page.lines.reduce<Stats>((acc: Stats, line: Line) => {
      const newStats = { ...acc };
      const key = line.severity;
      newStats[key] = (newStats[key] | 0) + 1;
      return newStats;
    }, book.stats);
    const result = { ...book, pages, stats };

    while (
      result.pages.reduce<number>((acc: number, page: CountedPage) => acc + page.lines.length, 0) >
      config.MAX_LINES_SHOWN
    ) {
      const evictIndex = result.pages.findIndex((page: CountedPage) => page.lines.length > 0);
      result.pages[evictIndex].lines = [];
    }

    return result;
  }

  const pages = [...book.pages];
  pages[pageIndex] = page;

  const result = { ...book, pages };

  while (
    result.pages.reduce<number>((acc: number, page: CountedPage) => acc + page.lines.length, 0) > config.MAX_LINES_SHOWN
  ) {
    const searchIn = result.pages.slice().reverse();
    const evictCandidate = searchIn.find((page: CountedPage) => page.lines.length > 0) as CountedPage;
    const evictIndex = result.pages.indexOf(evictCandidate);
    result.pages[evictIndex].lines = [];
  }

  return result;
};
