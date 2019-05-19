import React from 'react';
import './ModelViewer.css';
import THREE from '../three';

class ModelViewer extends React.Component {
  constructor(props) {
    super(props);
    this.scene = new THREE.Scene();
    this.labels = [];
    this.renderScene = this.renderScene.bind(this);
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

    this.initCube();

    this.renderScene();
  }

  initLights() {
    let lights = [
      new THREE.PointLight( 0xffffff, 1, 0 ),
      new THREE.PointLight( 0xffffff, 1, 0 ),
      new THREE.PointLight( 0xffffff, 1, 0 ),
    ];
    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );
    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );
  }

  initCube(){
    const length = 12, width = 8;

    const shape = new THREE.Shape();
    shape.moveTo( 0,0 );
    shape.lineTo( 0, width );
    shape.lineTo( length, width );
    shape.lineTo( length, 0 );
    shape.lineTo( 0, 0 );

    const extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 16,
    };

    const materialSettings = {
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true,
    }

    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const material = new THREE.MeshPhongMaterial(materialSettings);
    const mesh = new THREE.Mesh( geometry, material ) ;
    this.scene.add( mesh );
  }

  renderScene(d) {
    requestAnimationFrame(this.renderScene);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  render() {
    return (
      <div className="ModelViewer" ref={(mount) => { this.mount = mount }} />
    );
  }
}
export default ModelViewer;
