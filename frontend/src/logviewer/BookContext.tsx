import React, { useReducer } from 'react';
import { bookReducer, Book } from './reducer';
import { CountedPage } from './page';

const initialBook: Book = {
  pages: [],
  stats: {},
};

interface BookContextProps {
  book: Book;
  addPage: (page: CountedPage) => void;
}

export const BookContext = React.createContext<BookContextProps>({
  book: initialBook,
  addPage: () => {
    console.error('😕 Context addPage before it is initialized');
  },
});

export const BookProvider: React.FC = (props: any) => {
  const [book, addPage] = useReducer<React.Reducer<Book, CountedPage>>(bookReducer, initialBook);

  return <BookContext.Provider value={{ book, addPage }}>{props.children}</BookContext.Provider>;
};

export const useBookContext = (): BookContextProps => React.useContext(BookContext);
