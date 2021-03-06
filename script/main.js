import '../style/style.css';
import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {map0_data, map1_data , loadMap } from './map.js';
import Stats from 'stats.js'


// variables
let scene;
let camera;
let renderer;
let clock;
let controls;
let objLoader;
let mtlLoader;
//Stat variable for display fps,ms...
const stats = new Stats();

export let number = 0;
let cursor_cube = undefined;

let raycaster;
let mouse = new THREE.Vector2();
let clickableObjs = new Array();

function init()
{
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    raycaster = new THREE.Raycaster();
    const loader = new GLTFLoader();
    scene.add(new THREE.AxesHelper(5))

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

    //cursor
    // const cursor_material = new THREE.MeshLambertMaterial({transparent : true, opacity : 0 , color : 0xc0392b});
    // const cursor_geometry = new THREE.BoxGeometry(1.9, 2.5, 1.9);
    // cursor_cube = new THREE.Mesh(cursor_geometry, cursor_material);
    // scene.add(cursor_cube);

    loader.load( '../model/cursor.gltf', function ( gltf ) {
        cursor_cube = gltf.scene;
        let newMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
        cursor_cube.traverse((o) => {
            if (o.isMesh) o.material = newMaterial;
        });
        scene.add( cursor_cube );

    }, undefined, function ( error ) {
        console.error( error );
    } );

    //eventListener
    document.addEventListener('pointerdown', onMouseDown, false);
    document.addEventListener('pointerup', onMouseUp, false);

    //light
    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(-1, 0.9, 0.4);
    scene.add(directionalLight);

    switch (number){
        case 0:
            loadMap(map0_data, scene, clickableObjs);
        break;

        case 1:
            loadMap(map1_data, scene, clickableObjs);
        break;

        case 2:
            loadMap(map0_data, scene, clickableObjs);
        break;

        case 3:
            loadMap(map0_data, scene, clickableObjs);
        break;

        case 4:
            loadMap(map0_data, scene, clickableObjs);
        break;
    }
    render();
}

function render()
{
    stats.begin();
    let delta = clock.getDelta();
    let elapsed = clock.elapsedTime;

    controls.update();
    renderer.render(scene, camera);

    stats.setMode(0); // 0: fps, 2: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left  = 'inherit';
    stats.domElement.style.right  = '10px';
    document.getElementById('Stats-output').appendChild(stats.domElement);

    stats.end();
    requestAnimationFrame(render);
}
function onMouseUp(event)
{
    cursor_cube.material.emissive.g = 0;
}

function onMouseDown(event)
{
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 -1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 +1;

    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(clickableObjs);

    if(intersects.length > 0)
    {
        let selectedBloc = intersects[0].object;
        cursor_cube.position.set(selectedBloc.position.x, selectedBloc.position.y, selectedBloc.position.z);
        cursor_cube.material.opacity = 0.5;
        cursor_cube.material.emissive.g = 0.5;
    }
    else
    {
        cursor_cube.material.opacity = 0;
    }
}


init();
