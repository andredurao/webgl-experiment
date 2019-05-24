import React from 'react';
import './ImageDropZone.css';

class ImageDropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formClassName: '' };
    this.formClassName = '';
    this.canvas = React.createRef();
    this.image = React.createRef();
  }

  handleDragEvent(event) {
    event.persist();
    event.preventDefault();
    event.stopPropagation();
    this.highlightClassNames(event);
    this.loadImage(event);
  }


  highlightClassNames(event) {
    let formClassName = '';
    switch (event.type) {
      case 'dragenter':
      case 'dragover':
        formClassName = 'highlight';
        break;
      default:
        break;
    }
    event.target.className = formClassName;
  }

  loadImage(event) {
    if (event.type === 'drop') {
      const file = event.dataTransfer.files[0];
      let reader = new FileReader();
      let img = this.image.current;
      reader.onload = (event) => { img.src = event.target.result };
      this.image.current = img;
      reader.readAsDataURL(file);
      img.onload = () => { this.drawImage() };
    }
  }

  drawImage() {
    let img = this.image.current;
    let canvas = this.canvas.current;
    let context = canvas.getContext("2d");
    canvas.className = "canvas active";
    context.drawImage(img, 0, 0);
  }

  render() {
    return (
      <div className="ImageDropZone">
        <form id="dropzone-form"
          onDragEnter={(ev) => { this.handleDragEvent(ev) }}
          onDragLeave={(ev) => { this.handleDragEvent(ev) }}
          onDragOver={(ev) => { this.handleDragEvent(ev) }}
          onDrop={(ev) => { this.handleDragEvent(ev) }} >
          <p>drag and drop images here</p>
          <input type="file" id="file-input" accept="image/*"></input>
        </form>
        <canvas className="canvas" ref={this.canvas} />
        <img className="img-loader" alt="..." ref={this.image} />
      </div>
    );
  }
}
export default ImageDropZone;
