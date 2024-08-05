import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function Threee() {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);

    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 10;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const scene = new THREE.Scene();

    const geo = new THREE.IcosahedronGeometry(1.0, 2);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xccff,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.001);
    scene.add(wireMesh);

    const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
    // hemiLight.position.set(0,50,0)
    scene.add(hemiLight);

    function animate(t = 0) {
      requestAnimationFrame(animate);
      console.log(t);
      mesh.rotation.x = t*0.0001;
      wireMesh.rotation.x = t*0.0001
      mesh.rotation.y = t*0.0001;
      wireMesh.rotation.y = t*0.0001
      renderer.render(scene, camera);
      controls.update();
    }

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef}></div>;
}

export default Threee;
