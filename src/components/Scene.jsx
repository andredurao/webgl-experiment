import React from 'react';
import './Scene.css';
import THREE from '../three';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();
    this.renderScene = this.renderScene.bind(this);
    this.canvas = React.createRef();
    this.image = React.createRef();
  }

  componentDidMount() {
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.mount.appendChild(this.renderer.domElement);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 50;

    this.initLights();

    this.renderScene();
  }

  initLights() {
    let lights = [
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
    ];
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  drawCubes() {
    const canvas = this.canvas.current;
    const context = canvas.getContext("2d");
    const center = { width: (canvas.width / 2), height: (canvas.height / 2)};
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    for (let i = 0; i < canvas.width; i++) {
      for (let j = 0; j < canvas.height; j++) {
        const pixelData = context.getImageData(i,j,1,1).data;
        const color = new THREE.Color(
          pixelData[0] / 255.0,
          pixelData[1] / 255.0,
          pixelData[2] / 255.0
        )
        const materialSettings = {
          color: color,
          emissive: 0x072534,
          side: THREE.DoubleSide,
          flatShading: true,
        }
        const material = new THREE.MeshPhongMaterial(materialSettings);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (i - center.width) * 2;
        mesh.position.y = (j - center.height) * -2;
        this.scene.add(mesh);
      }
    }
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  renderScene(d) {
    requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
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
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    this.drawCubes();
  }

  render() {
    return (
      <div className="Scene">
        <div className="dropzone">
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
        <div className="scene-container" ref={(mount) => { this.mount = mount }} />
      </div>
    );
  }
}

export default Scene;
