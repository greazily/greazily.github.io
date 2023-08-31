import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { FlakesTexture } from 'three/addons/textures/FlakesTexture.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});
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
    const fov = 10; // field of view (vertical)
    const aspect = 0.6;  // the canvas default
    const near = 0.1;
    const far = 250;
    // creates a new (perspective) camera
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set( 0, 2, 230);
    console.log(camera)
 //<----------------------------------------------------------------> 
 
 // creates scene, (root of all drawn). All things to be rendered must be added to scene
    const scene = new THREE.Scene();

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
 

    // let geomerty;
    
    const loader = new GLTFLoader();
    const url = 'gltf/inflation-morph-texture_0.2.13.glb';
    // const url = 'gltf/pin-group-test_0.3.1.2_NLA-export_3.2.1.glb';


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
            }
        }
    );

    const hdriLoader = new RGBELoader();

    const urlHDR = '../img/textures/studio_small_04_4k.hdr';


    hdriLoader.load(urlHDR, (texture) =>{
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    })


    // const textureLoader = new THREE.TextureLoader();
    // const baseColor = textureLoader.load('./img/clash-grotesk@4x.png');
    //     baseColor.wrapS = THREE.RepeatWrapping;
    //     baseColor.wrapT = THREE.RepeatWrapping;
    //     baseColor.repeat.set(20,20)
    // const normalMap = textureLoader.load('./img/textures/padded/Fabric_Padded_006_normal.jpg');
    //     normalMap.wrapS = THREE.RepeatWrapping;
    //     normalMap.wrapT = THREE.RepeatWrapping; 
    // const heightMap = textureLoader.load('./img/textures/padded/Fabric_Padded_006_height.png');
    //     heightMap.wrapS = THREE.RepeatWrapping;
    //     heightMap.wrapT = THREE.RepeatWrapping; 
    // const roughnessMap = textureLoader.load('./img/textures/padded/Fabric_Padded_006_roughness.jpg');
    // const ambientOcclusionMap = textureLoader.load('./img/textures/padded/Fabric_Padded_006_ambientOcclusion.jpg');
    // console.log(heightMap);
    function meshing(blend) {

        
        // let geometry = blend.geometry
        const mesh = blend;

        // const material = new THREE.MeshStandardMaterial(
        //     {
        //         map: baseColor,


        //     }
        // );
        // const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        frames = mesh.morphTargetInfluences;
        mesh.receiveShadow = true;
        mesh.castShadow = true;


        
        scene.add(mesh);
        update();

        

    }

    
    

    
    


//<-----------------------------------------------lights------------>

    // light settings
    const color = 0xFFFFFF;
    const intensity = 12;
    // creates light
    const light = new THREE.DirectionalLight(color, intensity);
    // sets position and points to origin (0,0,0)
    light.position.set(0, 30, 30);
    light.castShadow = true;
    light.shadow.mapSize.set(1024 * 3, 1024 * 3);
    light.shadow.camera.top = 20;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 70;
    light.shadow.bias = -0.02;
    light.shadow.radius = 10;

    // adds light to the scene
    scene.add(light);

    const pntLight = new THREE.PointLight(0x1430e3,1000,100);
    pntLight.position.set(10,10,10);

    // scene.add(pntLight);



    const ambLight = new THREE.AmbientLight(0xffffff, 1);
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
 let angle = 0;
 
 function update() {
     requestAnimationFrame(update);
     
     delta += clock.getDelta();
     
     
     
     
     
     if (delta  > interval) {
         
         
            // console.log(light.position.x);
            angle -= 0.015
            light.position.x = 30 * Math.sin(angle);
            light.position.y = 40 + (20 * Math.cos(angle));
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

            // if (light.position.x <= 30 && light.position.x > -30){
            //     light.position.x -= 0.01;
            // } else {
            //     light.position.x += 0.01;
            // }
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