import React from 'react';
import './Knob.css';
import Slider from '@material-ui/lab/Slider';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event, value) {
    await this.setState({value: value});
    this.props.onValueChange(value, this.props.id);
  }

  render() {
    return (
      <div className="Knob">
        <Slider value={this.state.value} onChange={this.handleChange} vertical />
      </div>
    );
  }
}
export default Knob;
