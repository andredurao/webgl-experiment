import React from 'react';
import './Oscilloscope.css';
import * as THREE from 'three';
class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    this.uniforms = { tick: { value: 0 } };
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
    this.shaderMaterial.uniforms.tick.value = this.tick;
    this.renderer.render(this.scene, this.camera);
  }
  vertexShader = () => {
    return(`
    uniform int tick;

    void main(){
      gl_PointSize = 5.0;
      float amplitude = 30.0;
      float prop = ((position.x + 100.0) / 200.0) + (float(tick) / 1000.0);
      float rad = radians(prop * 360.0);
      float frequency = 5.0;
      float newY = sin(rad * frequency) * amplitude;

      gl_Position = vec4(position.x, newY, 1.0, 75.0);
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
