import { CountedPage, Stats } from "./page";

export interface Book {
  pages: CountedPage[];
  stats: Stats;
}

export const bookReducer = (book: Book, page: CountedPage): Book => {
  const pageIndex = book.pages.findIndex((p: CountedPage) => p.start === page.start);
  if (pageIndex === -1) {
    const pages = [...book.pages, page];
    return { ...book, pages };
  }
  
  // throw new Error
  console.error('cannot replace page yet, page: ', page);
  return book;
}
