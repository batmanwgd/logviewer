import { bookReducer, Book } from './reducer';
import { CountedPage } from './page';
import { config } from './config';

config.MAX_LINES_SHOWN = 5;

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

describe('book has one page already', () => {
  const someBook: Book = {
    pages: [
      {
        lines: [
          { date: '2020-02-02 20:20:20,222', severity: 'WARN', message: 'Some warning' },
          { date: '2020-02-02 20:20:20,222', severity: 'INFO', message: 'Some info' },
        ],
        lineCount: 2,
        start: 0,
        end: 1023,
      },
    ],
    stats: { WARN: 1, INFO: 1 },
  };

  describe('another page added', () => {
    const page: CountedPage = {
      lines: [
        { date: DATE, severity: 'WARN', message: 'Some warning 2' },
        { date: DATE, severity: 'WARN', message: 'Some warning 3' },
        { date: DATE, severity: 'EMERG', message: 'Some info' },
      ],
      lineCount: 3,
      start: 1024,
      end: 2048,
    };

    const newBook = bookReducer(someBook, page);

    it('adds that page to the book', () => {
      expect(newBook.pages).toHaveLength(2);
      expect(newBook.pages[0].lines).toHaveLength(2);
      expect(newBook.pages[1].lines).toHaveLength(3);
      expect(newBook.stats.WARN).toBe(3);
      expect(newBook.stats.INFO).toBe(1);
      expect(newBook.stats.EMERG).toBe(1);
    });
  });
});

describe('number of lines shown reaching max', () => {
  const fullBook: Book = {
    pages: [
      {
        lines: [
          { date: DATE, severity: 'WARN', message: 'Some warning' },
          { date: DATE, severity: 'INFO', message: 'Some info' },
        ],
        lineCount: 2,
        start: 0,
        end: 1023,
      },
      {
        lines: [
          { date: DATE, severity: 'WARN', message: 'Some warning 2' },
          { date: DATE, severity: 'WARN', message: 'Some warning 3' },
          { date: DATE, severity: 'EMERG', message: 'Some info' },
        ],
        lineCount: 3,
        start: 1024,
        end: 2048,
      },
    ],
    stats: { WARN: 3, INFO: 1, EMERG: 1 },
  };

  describe('another page added so that it would have more than max lines', () => {
    const page: CountedPage = {
      lines: [
        { date: DATE, severity: 'INFO', message: 'Some warning 2' },
        { date: DATE, severity: 'INFO', message: 'Some warning 3' },
        { date: DATE, severity: 'INFO', message: 'Some info' },
      ],
      lineCount: 3,
      start: 2049,
      end: 3096,
    };

    const newBook = bookReducer(fullBook, page);

    it('adds that page to the book, but lines are evicted from pages in the front', () => {
      expect(newBook.pages).toHaveLength(3);
      expect(newBook.pages[0].lines).toHaveLength(0);
      expect(newBook.pages[0].lineCount).toEqual(2);
      expect(newBook.pages[1].lines).toHaveLength(0);
      expect(newBook.pages[1].lineCount).toEqual(3);
      expect(newBook.pages[2].lines).toHaveLength(3);
      expect(newBook.pages[2].lineCount).toEqual(3);
      expect(newBook.stats.WARN).toBe(3);
      expect(newBook.stats.INFO).toBe(4);
      expect(newBook.stats.EMERG).toBe(1);
    });
  });
});
