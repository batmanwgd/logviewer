import React from 'react';
import './App.css';

import { LogViewer } from './logviewer/LogViewer';

const App: React.FC = () => {
  return (
    <div className="App">
      <LogViewer />
    </div>
  );
};

export default App;
