import React from 'react';
import ControlPanel from './ControlPanel';
import Oscilloscope from './Oscilloscope';

import './App.css';

function App() {
  return (
    <div className="App">
      <ControlPanel/>
      <Oscilloscope/>      
    </div>
  );
}

export default App;
