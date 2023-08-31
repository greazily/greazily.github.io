import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    // camera settings
    const fov = 75; // field of view (vertical)
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    // creates a new (perspective) camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // creates scene, (root of all drawn). All things to be rendered must be added to scene
    const scene = new THREE.Scene();

//<-------------------------------------------- constitutes cube --->
    // geomerty (box) settings
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    // creates box
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // creates material and sets color in hex (basic material is not affected by lights)
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    // creates a mesh. Takes: 
    // 1 Geometry (the shape of the object)
    // 2 Material (shiny or flat, color, texture(s) Etc.)
    // 3 Position, orientation, and scale of object relative to its parent. (Undifined parent = scene as parent.)
    const cube = new THREE.Mesh(geometry, material);

    // adds 'cube' mesh to scene
    scene.add(cube);
//<---------------------------------------------------------------->

    // light settings
    const color = 0xFFFFFF;
    const intensity = 3;
    // creates light
    const light = new THREE.DirectionalLight(color, intensity);
    // sets position and points to origin (0,0,0)
    light.position.set(-1, 2, 4);
    // adds light to the scene
    scene.add(light);
    
    function render(time) {
        time *= 0.001;  // convert time to seconds
       
        cube.rotation.x = time; // rotation takes radians, 2 pi radians in a circle
        cube.rotation.y = time; // (360deg) so it takes 2*3.14 sec for a full rotation
       
        // renders the scene and camera to be displayed
        renderer.render(scene, camera);
       
        // request a new frame
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);

    

};

main();