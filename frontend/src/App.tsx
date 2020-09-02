import React from 'react';
import './App.css';

import { LogViewer } from './logviewer/LogViewer';
import { BookProvider } from './logviewer/BookContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <BookProvider>
        <LogViewer />
      </BookProvider>
    </div>
  );
};

export default App;
