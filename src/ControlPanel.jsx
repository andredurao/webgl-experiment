import React from 'react';
import './ControlPanel.css';
import Knob from './Knob';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      samples: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, key) {
    this.setState((prevState) => ({ samples: { ...this.state.samples, [key]: value} }))
  }

  render() {
    return (
      <div className="ControlPanel">
        {Object.keys(this.state.samples).map((key) =>
          <Knob key={key} id={key} value={this.state.samples[key]}
            onValueChange={this.handleChange} />
        )}
      </div>
    );
  }
}
export default ControlPanel;
