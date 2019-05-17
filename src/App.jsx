import React from 'react';
import ControlPanel from './ControlPanel';
import Oscilloscope from './Oscilloscope';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      samples: { "0": 1, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(samples) {
    this.setState((prevState) => ({ samples: samples }));
  }

  render() {
    return (
      <div className="App">
        <ControlPanel samples={this.state.samples} onValueChange={this.handleChange} />
        <Oscilloscope samples={this.state.samples} />
      </div>
    );
  }
}

export default App;