import React from 'react';
import './Knob.css';

class Knob extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({value: value});
    this.props.onValueChange(value, this.props.id);
  }

  render() {
    return (
      <div className="Knob">
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </div>
    );
  }
}
export default Knob;
