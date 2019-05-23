import React from 'react';
import './ImageDropZone.css';

class ImageDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formClassName: '' };
  }

  handleDragEvent(event) {
    this.highlightClassNames(event.type);
    event.preventDefault();
    event.stopPropagation();
  }

  highlightClassNames(eventType=null) {
    let formClassName = '';
    debugger;
    switch(eventType) {
      case 'dragenter':
      case 'dragover':
        formClassName = 'highlight';
        break;
      default:
        break;
    }
    this.setState(() => ({ formClassName: formClassName }));
  }

  render() {
    return (
      <div className="ImageDropZone">
        <form id="dropzone-form"
          onDragEnter={this.handleDragEvent}
          onDragLeave={this.handleDragEvent}
          onDragOver={this.handleDragEvent}
          onDrop={this.handleDragEvent}
          className={this.state.formClassName}
        >
          <p>drag and drop images here</p>
          <input type="file" id="file-input" multiple accept="image/*">
          </input>
        </form>        
      </div>
    );
  }
}
export default ImageDropZone;
