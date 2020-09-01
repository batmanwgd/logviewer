import { CountedPage, Stats, Line } from "./page";

export interface Book {
  pages: CountedPage[];
  stats: Stats;
}

export const bookReducer = (book: Book, page: CountedPage): Book => {
  const pageIndex = book.pages.findIndex((p: CountedPage) => p.start === page.start);
  if (pageIndex === -1) {
    const pages = [...book.pages, page];

    const stats: Stats = page.lines.reduce<Stats>(
      (acc: Stats, line: Line) => {
        const newStats = { ...acc };
        const key = line.severity;
        newStats[key] = (newStats[key] | 0) + 1;
        return newStats;
      },
      {}
    );
    return { ...book, pages, stats };
  }
  
  console.error('cannot replace page yet, page: ', page);
  return book;
}
