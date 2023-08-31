import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

 //<---------------------------------------------------------------->  
    // camera settings
    const fov = 75; // field of view (vertical)
    const aspect = canvas.clientWidth / canvas.clientHeight;;  // the canvas default
    const near = 0.1;
    const far = 5;
    // creates a new (perspective) camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
 //<----------------------------------------------------------------> 

    // creates scene, (root of all drawn). All things to be rendered must be added to scene
    const scene = new THREE.Scene();

//<-------------------------------------------- constitutes cube & instances --->
    // geomerty (box) settings
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    // creates box
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);


    function makeInstance(geomerty, color, x) {
        // creates material and sets color (basic material is not affected by lights)
        const material = new THREE.MeshPhongMaterial({color});

        // creates a mesh. Takes: 
        // 1 Geometry (the shape of the object)
        // 2 Material (shiny or flat, color, texture(s) Etc.)
        // 3 Position, orientation, and scale of object relative to its parent. (Undifined parent = scene as parent.)
        const cube = new THREE.Mesh(geometry, material);

        // adds 'cube' mesh to scene
        scene.add(cube);

        // set x position to variable of x
        cube.position.x = x;
 
        return cube;

    };

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];
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

 //<---------------------------------------------------------------->   

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }

 //<---------------------------------------------------------------->   
    
    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
          }
       
        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
          });
       
        // renders the scene and camera to be displayed
        renderer.render(scene, camera);
       
        // request a new frame
        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);

    

};

main();