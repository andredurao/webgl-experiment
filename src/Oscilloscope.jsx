import React from 'react';
import './Oscilloscope.css';
import * as THREE from 'three';
class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.uniforms = { time: { value: 0.0 } };
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD SCENE
    this.scene = new THREE.Scene();
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 4;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.clock = new THREE.Clock();
    this.tick = 0;
    // ADD POINTS
    this.geometry = new THREE.Geometry();
    for (let i = -100; i < 100; i++) {
      this.geometry.vertices.push(new THREE.Vector3(i, 0, 0));
    }
    console.log(this.uniforms);

    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader(),
      fragmentShader: this.fragmentShader()
    });

    this.points = new THREE.Points(this.geometry, this.shaderMaterial);
    this.scene.add(this.points);

    this.start();
  }
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId);
  }
  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }
  renderScene = () => {
    // TODO: use only integers here, let the shader do the FP math
    this.tick = (this.tick + 1) % 1000;
    this.shaderMaterial.uniforms.time.value = (this.tick / 10000.0);
    // this.shaderMaterial.needsUpdate = true;
    // this.geometry.elementsNeedUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
  vertexShader = () => {
    return(`
    uniform float time;

    void main(){
      gl_PointSize = 5.0;
      float amplitude = 30.0;
      float newY = sin(time * position.x) * amplitude;

      gl_Position = vec4(position.x, newY, position.z, 75.0);
    }
    `);
  }
  fragmentShader = () => {
    return(`uniform float time;

    void main(){
      gl_FragColor = vec4(1.0,(time * 2.0),0.3,1.0);
    }`);
  }
  render() {
    return (
      <div className="Oscilloscope" ref={(mount) => { this.mount = mount }} />
    );
  }
}
export default Oscilloscope;
