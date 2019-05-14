import React from 'react';
import './Oscilloscope.css';
import * as THREE from 'three';
class Oscilloscope extends React.Component {
  componentDidMount() {
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.camera.position.z = 4
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#000000')
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    // ADD POINTS
    this.geometry = new THREE.Geometry();
    for (let i = -50; i < 50; i++) {
      this.geometry.vertices.push(new THREE.Vector3(i, 0, 0));
    }
    this.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: { time: { value: 1.0 }, },
      vertexShader: this.vertexShader(),
      fragmentShader: this.fragmentShader()
    });

    this.points = new THREE.Points(this.geometry, this.shaderMaterial);
    this.scene.add(this.points);

    this.start()
  }
  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
  stop = () => {
    cancelAnimationFrame(this.frameId)
  }
  animate = () => {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }
  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }
  vertexShader = () => {
    return(`uniform float time;

    void main(){
      gl_PointSize = 1.0;
      gl_Position = vec4(position, 75.0);
    }`)
  }
  fragmentShader = () => {
    return(`void main(){
      gl_FragColor = vec4(1.0,0.2,0.3,1.0);
    }`)
  }
  render() {
    return (
      <div className="Oscilloscope" ref={(mount) => { this.mount = mount }} />
    );
  }
}
export default Oscilloscope;
