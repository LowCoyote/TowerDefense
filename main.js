import './style.css';
import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import {map0_data , loadMap } from './map.js';


// variables
let scene;
let camera;
let renderer;
let clock;
let controls;

function init()
{
    clock = new THREE.Clock();
    scene = new THREE.Scene();

    //renderer
    renderer = new THREE.WebGLRenderer({antialias : true, alpha : true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement) ;

    // camera
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;

    camera = new THREE.OrthographicCamera( frustumSize * aspect / -2, frustumSize * aspect / 2, frustumSize/ 2 , frustumSize/ -2, 1, 1000);
    camera.position.set(-15, 15, -15);
    scene.add(camera);

    // controls
    controls = new MapControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI/2;

    //light
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(-1, 0.9, 0.4);
    scene.add(directionalLight);

    loadMap(map0_data, scene);

    render();
}

function render()
{
    let delta = clock.getDelta();
    let elapsed = clock.elapsedTime;

    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

init();
