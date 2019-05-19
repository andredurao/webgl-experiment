import React from 'react';
import './ControlPanel.css';
import Knob from './Knob';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = { samples: props.samples };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(value, key) {
    if (this.state.samples[key] !== value){
      await this.setState((prevState) => (
        { samples: { ...this.state.samples, [key]: value} }
      ));
      this.props.onValueChange(this.state.samples);
    }
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
