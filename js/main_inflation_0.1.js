import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
    const btnTop = document.getElementById('btnTop').addEventListener('click', clicked);
    const btnBottom = document.getElementById('btnBottom').addEventListener('click', clicked);
    let frames;
    let i = -1;
    let clock = new THREE.Clock();
    let delta = 0;
    // fps
    let interval = 1 / 24;


 //<---------------------------------------------------------------->  
    // camera settings
    const fov = 50; // field of view (vertical)
    const aspect = 0.6;  // the canvas default
    const near = 0.1;
    const far = 200;
    // creates a new (perspective) camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set( 0, 2, 45);
    console.log(camera)
 //<----------------------------------------------------------------> 
 
 // creates scene, (root of all drawn). All things to be rendered must be added to scene
    const scene = new THREE.Scene();

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const rgbeLoader = new RGBELoader();

 

    // let geomerty;
    
    const loader = new GLTFLoader();
    const url = 'gltf/pin-group-test_0.3.1.2_NLA-export_3.2.1.glb';


    loader.load(url,
        (gltf) => {
            gltf.scene.traverse( function (node){
                if (node.isMesh) {
                    let blend;
                    blend = node;
                    meshing(blend);
                };
            });

            


        },
        (xhr) => {
            console.log ((xhr.loaded/xhr.total * 100) + '% loaded');

            if (xhr.loaded==xhr.total) {
                update();
            }
        }
    );

    const loaderHDRI = new RGBELoader();

    const urlHDR = '../img/textures/studio_small_04_4k.hdr';


    loaderHDRI.load(urlHDR, (texture) =>{
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    })


    function meshing(blend) {
        // const texture = new TreeWalker.CanvasTexture()
        
        const materialProperties = {
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            metalness: 0.9,
            roughness: 0.5,
            color: 0xc5beca,
        }
        
        let geometry = blend.geometry
        const material = new THREE.MeshPhysicalMaterial(materialProperties);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        // mesh.material.map.anisotropy = 16;


        mesh.rotation.x = Math.PI / 2;
        frames = mesh.morphTargetInfluences;
        scene.add(mesh);
        

    }

    
    

    
    


//<-----------------------------------------------lights------------>

    // light settings
    const color = 0xFFFFFF;
    const intensity = 2;
    // creates light
    const light = new THREE.DirectionalLight(color, intensity);
    // sets position and points to origin (0,0,0)
    light.position.set(-30, 30, 20);
    light.castShadow = true;
    light.shadow.mapSize.set(1024 * 1, 1024 * 1);
    light.shadow.camera.top = 20;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 70;
    light.shadow.radius = 10;

    // adds light to the scene
    scene.add(light);

    const ambLight = new THREE.AmbientLight(0xffffff, 3);
    ambLight.position.set(0, 0, 40);

    scene.add(ambLight);

    // const helper = new THREE.DirectionalLightHelper( light, 5 );
    // scene.add( helper );

    // const cameraHelper = new THREE.CameraHelper(light.shadow.camera);
    // scene.add(cameraHelper);

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

 //<--------------------------------------------clock/framerate------->  

  

    function update() {
        requestAnimationFrame(update);
        
        delta += clock.getDelta();
        


        if (delta  > interval) {

            // The draw or time dependent code are here

            // runs through the morphtarget frames 0 - 600
            if(i < 600) {
                i += 1;

                frames[i-1] = 0;
                frames[i] = 1;

            } 
            // else 
            if (699 < i && i < 1200) {
                i += 1;

                frames[i-1] = 0;
                frames[i] = 1;

            }

            if (1399 < i && i < 1900) {
                i += 1;

                frames[i-1] = 0;
                frames[i] = 1;

            }
            render();
            

            delta = delta % interval;
            // console.log(i)
        }

    }

 //<------------------------------------------render-------------->  

    
    function render(time) {
        time *= 0.001;  // convert time to seconds

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.updateProjectionMatrix();
          };
        //   console.log(camera.position.z);

   
        // controls.update();
        renderer.render(scene, camera);
      };

     //<----------------------------------------------------------------> 
     function clicked(e) {

        if(e.target.id == 'btnBottom') {
            for (let i=0; i < frames.length; ++i){
                frames[i]=0;
            }
            i = 700;
        }

        if(e.target.id == 'btnTop') {
            for (let i=0; i < frames.length; ++i){
                frames[i]=0;
            }

            i = 1400;
        }
        console.log(e.target.id, i);

    };


 //<----------------------------------------------------------------> 



    
    

    

};

main();