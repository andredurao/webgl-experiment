import React, { useState, useEffect } from 'react';
import './Knob.css';

const Knob = (props) => {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    props.onValueChange(value, props.id);
  });
  return (
    <div className="Knob">
      <input type="text" value={value} onChange={(ev) => setValue(ev.target.value)} />
    </div>
  );
}

export default Knob;