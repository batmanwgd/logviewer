import { bookReducer, Book } from './reducer';
import { CountedPage } from './page';

const DATE = '2020-02-02 20:20:20,222';
describe('Book is empty', () => {
  const emptyBook: Book = {
    pages: [],
    stats: {},
  };

  describe('new page added', () => {
    const page: CountedPage = {
      lines: [
        { date: DATE, severity: 'WARN', message: 'Some warning' },
        { date: DATE, severity: 'INFO', message: 'Some info' },
      ],
      lineCount: 2,
      start: 0,
      end: 1023,
    };

    const newBook = bookReducer(emptyBook, page);

    it('adds one page to the book', () => {
      expect(newBook.pages).toHaveLength(1);
      expect(newBook.pages[0].lines).toHaveLength(2);
      expect(newBook.stats.WARN).toBe(1);
      expect(newBook.stats.INFO).toBe(1);
    });
  });
});