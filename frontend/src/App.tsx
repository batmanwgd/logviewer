import React from 'react';
import './App.css';

import { BookComponent } from './logviewer/BookComponent';
import { BookProvider } from './logviewer/BookContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <BookProvider>
        <BookComponent />
      </BookProvider>
    </div>
  );
};

export default App;
