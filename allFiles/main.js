import * as THREE from '../node_modules/three';
import * as BufferGeometryUtils from '../node_modules/three/examples/jsm/utils/BufferGeometryUtils.js';
const MAXSPEED = .091;
const MINSPEED = .0091;
const AVOID_FACTOR = 0.0095;
const MATCHING_FACTOR = 0.0099;
const CENTERING_FACTOR = 0.000259521;
const PROTECTED_RANGE = .09031;
const TURNFACTOR = 0.000791;
const VISIBLE_RANGE = 0.86558; 
var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg"; 
var worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg"


var Bird = function () {
          var geometry = new THREE.BufferGeometry();
        const posit = [
                5, 0, 0,
                -5, 0, 0,
                -5, -2, 1,
                 0, 2, -6,
                -3, 0, 0,
                2, 0, 0,
                0, 2, 6,
                2, 0, 0,
                -3, 0, 0,
        ];
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(posit, 3));


        geometry.computeVertexNormals();
        return geometry;
  
};

//cloud shader

const cloudShader = {
        vertexShader:
       `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader:
  `
    uniform sampler2D map;
    uniform vec3 fogColor;
    uniform float fogNear;
    uniform float fogFar;
    varying vec2 vUv;

    void main() {

      float depth = gl_FragCoord.z / gl_FragCoord.w;
      float fogFactor = smoothstep( fogNear, fogFar, depth );

      gl_FragColor = texture2D( map, vUv );
      gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
      gl_FragColor = mix( gl_FragColor, vec4( fogColor , gl_FragColor.w ), fogFactor );

    }
  `
}

var sizes = {
        width: window.innerWidth,
        height: window.innerHeight
}

window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})


//scene init
const aspect = window.innerWidth / window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true} );
// renderer.setClearColor(0xb8e7fc, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
// const material = new THREE.MeshStandardMaterial( { color: THREE.MathUtils.randInt(4, 0xffffff), roughness:0.0, side:THREE.DoubleSide} );


// moon Material
const material = new THREE.MeshStandardMaterial( { color: 0xffffff , roughness:0.0, side:THREE.DoubleSide, metalness:0.46} );

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-100, 0, 14);
scene.add(directionalLight);

const light = new THREE.AmbientLight(0x404040, 10);
scene.add(light);

const spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(0, 0, 100);
spotlight.castShadow = true;
spotlight.angle = 20 * Math.PI / 180;
spotlight.exponent = 1;
spotlight.target.position.set(0.5, 0.5, 10);
scene.add(spotlight);

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 0, 0 );
scene.add( hemiLight );

const moonGeo = new THREE.SphereGeometry(1.35, 32, 164 );
var textureloader = new THREE.TextureLoader();
const texture = textureloader.load('./assets/moon.png');
const displacementMap = textureloader.load('./assets/bumps.jpg');
const worldTexture = textureloader.load('./assets/star2.jpg');
// worldTexture.offset.set(.000001, 0.0000001);
// worldTexture.wrapS = THREE.RepeatWrapping;
// worldTexture.wrapT = THREE.RepeatWrapping;

// worldTexture.repeat.set(2,2 );
const materialMoon = new THREE.MeshPhongMaterial(
        {
                color: 0xf0e4e4,
                map:texture,
                displacementMap: displacementMap,
                displacementScale: 0.012,
                bumpMap: displacementMap,
                bumpScale: 0.01,
                reflectivity:0,
                shininess: 0
        }
);

var worldGeometry = new THREE.SphereGeometry(7.5, 62, 62);
var worldMaterial = new THREE.MeshBasicMaterial ( 
  { /* color: 0xffffff, */
                map: worldTexture ,
                side: THREE.BackSide,
                transparent:true  
                // overdraw: 0.05
  } 
);
var world = new THREE.Mesh( worldGeometry, worldMaterial );
// world.scale.set(2, 1, );
scene.add( world );
const moon = new THREE.Mesh(moonGeo, materialMoon);
const haloVertexShader = /*glsl*/`
varying vec3 vertexNormal;
void main() {
     vertexNormal = normal;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);   
}
`;
const haloFragmentShader = /*glsl*/`
varying vec3 vertexNormal;
void main() {
float intensity = pow(0.7 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0);
gl_FragColor = vec4(.7, .79, .6, 0.024) * intensity;
}
`;
const halo = new THREE.Mesh(
     new THREE.SphereGeometry(8., 64, 64),
     new THREE.ShaderMaterial({
          vertexShader:haloVertexShader,
          fragmentShader:haloFragmentShader,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide
     })
)

// scene.add(sphere);
halo.scale.set(0.2, 0.2, 0.2);
halo.position.x = moon.position.x =5.;
halo.position.y = moon.position.y = 3.;
halo.position.z = moon.position.z = -5.9;
// moon
moon.rotation.x = Math.PI *0.02;
moon.rotation.y = Math.PI * 1.54;
scene.add(moon);
scene.add(halo);
const fog =  new THREE.FogExp2(0xcccccc, 0.04);
scene.fog = fog ;
camera.position.z = 4;
// camera.position.y = 2;
// camera.lookAt(moon.position);
// camera.position.x = 1;
// camera.position.y = -4;
// camera.position.z = -4;
// adding clouds in the scene




const cloudTexture = textureloader.load('./assets/cloud10.png');

var cloudMaterial = new THREE.ShaderMaterial({
        uniforms: {
                "map": { type: "t", value: cloudTexture },
                "fogColor" : { type: "c", value: fog.color },
                "fogNear" : { type: "f", value: fog.near },
                "fogFar" : { type: "f", value: fog.far },
        },
        vertexShader: cloudShader.vertexShader,
        fragmentShader: cloudShader.fragmentShader,
        depthWrite: false,
        depthTest: false,
        transparent: true,
}); 
function addClouds(){

        var planeGeo = new THREE.PlaneGeometry(64, 64);
        var planeObj = new THREE.Object3D();
        const geometries = [];

        const planeObjs = [];
        for ( var i = 0; i < 2; i++ ) {

                planeObj.position.x = -6-Math.random() * 5 ;
                // planeObj.position.x = 4.744833741001892;
                // planeObj.position.y = -0.93;
                planeObj.position.y = - Math.random() * Math.random() * 5 ;
                // planeObj.position.z = Math.random() * 0.00005 ;
                planeObj.rotation.z = Math.random() * Math.PI;
                planeObj.scale.x = .089;
                planeObj.scale.y =   .08 ;
                planeObj.updateMatrix()

                const clonedPlaneGeo = planeGeo.clone();
                clonedPlaneGeo.applyMatrix4(planeObj.matrix);
                const clonedPlaneObj = planeObj.clone();
                planeObjs.push(clonedPlaneObj);
                geometries.push(clonedPlaneGeo)

        }

        var planeGeos = BufferGeometryUtils.mergeGeometries(geometries);
        const planesMesh = new THREE.Mesh(planeGeos, cloudMaterial);
        // planesMesh.renderOrder = 2;
        for ( var i = 0; i < 2; i++ ) {

                planeObj.position.x = 15-Math.random() * 10 ;
                // planeObj.position.x = 4.744833741001892;
                // planeObj.position.y = -0.93;
                planeObj.position.y =  Math.random() * Math.random() * 5;
                // planeObj.position.z = Math.random() * 0.00005 ;
                planeObj.rotation.z = Math.random() * Math.PI;
                planeObj.scale.x = .065;
                planeObj.scale.y =   .064 ;
                planeObj.updateMatrix()

                const clonedPlaneGeo = planeGeo.clone();
                clonedPlaneGeo.applyMatrix4(planeObj.matrix);
                const clonedPlaneObj = planeObj.clone();
                planeObjs.push(clonedPlaneObj);
                geometries.push(clonedPlaneGeo)

        }

        planeGeos = BufferGeometryUtils.mergeGeometries(geometries);
        const planesMeshA = new THREE.Mesh(planeGeos, cloudMaterial);
        // planesMeshA.position.z = -1;
        // planesMeshA.renderOrder = 1;

        scene.add( planesMesh );
        scene.add(planesMeshA);
        return {pM: planesMesh, pM2: planesMeshA};
}


function moveClouds(pMesh, pM2 ){
       // pMesh.position.x = Math.max(0, Math.sin(Math.random() + 2000)) % 63;
        var vel =  Math.sin( 0.0065);
        pMesh.position.x = (pMesh.position.x +  Math.max(0,vel)) % 50;  
        pM2.position.x = (pM2.position.x -  Math.max(0, vel)) % 50;  
        var val1 = Math.sin( 0.0005);
        var val2 = Math.sin(0.0005);
        // if((pMesh.scale.x+val1) > 1.5 ){
        //         val1 = -Math.sin(0.0005);
        //         console.log("before val1", val1);
        // } 
        // if(pMesh.scale.x == 0){
        //         val1 = -val1;
        // }
        console.log("before", pMesh.scale.x);
        // pMesh.scale.x = (pMesh.scale.x + val1)%1.6 ;
        // pMesh.scale.y = (pMesh.scale.y + val1)%1.6 ;
        // if((pM2.scale.x+val2) > 1.5 ){
        //         val2 = -val2;
        // } 
        // if(pM2.scale.x == 0){
        //         val2 = -val2;
        // }
        // pM2.scale.x = (pM2.scale.x + val2)%1.6  ;
        // pM2.scale.y = (pM2.scale.y + val2)%1.6  ;
        // console.log(pM2.scale.x);
        console.log("after", pMesh.scale.x);
        console.log("val1", val1);
        // console.log(pMesh)
        // var planeObj = new THREE.Object3D();
        // for(var i=0; i<pMesh.length; i++ ){
        //         pObj[i].position.x = (pObj[i].position.x + Math.max(0, Math.sin(Math.random() * 0.05))) % 10;
        //         // pObj[i].updateMatrix();
        //
        //         pMesh[i].applyMatrix4(pObj[i].matrix);
        //
        // }
        //
        //
        //         const planeGeos = BufferGeometryUtils.mergeGeometries(pMesh);
        //         const planesMesh = new THREE.Mesh(planeGeos, cloudMaterial);
        //
        // scene.add(planesMesh);
        // return {pM: planesMesh, geos: pMesh, pObj: pObj};
}





var clouds = addClouds();
console.log(clouds.pM);







var birds = [];
function createBirds(no){
        for (var i=0; i<no; i++){

                var bd = {
                        mesh: new THREE.Mesh( Bird(), material),
                        speed: new THREE.Vector3(),
                        vector : new THREE.Vector3(),
                        pos: new THREE.Vector3(),
                        x_ : function(vector){return Math.round((0.5 + vector.x / 2) * (renderer.domElement.width / window.devicePixelRatio)) },
                        y_ : function(vector){ return Math.round((0.5 - vector.y / 2) * (renderer.domElement.height / window.devicePixelRatio))},
                        x : 0,
                        y : 0,
                        close_dx : 0,
                        close_dy : 0,
                        close_dz : 0,
                        xvel_avg : 0,
                        yvel_avg : 0,
                        zvel_avg : 0,
                        xpos_avg : 0,
                        ypos_avg: 0,
                        zpos_avg: 0,
                        neighboring_boids: 0,
                        
                        phase: Math.floor(Math.random()) * 62.83,

                                        };
                var ra = Math.random();
                bd.mesh.position.x = (ra - 0.5) * 5;
                bd.mesh.position.y = (Math.random() - 0.5) * 5;
                // bd.mesh.position.y = (Math.random() - 0.5) * 5;
                bd.speed.x = Math.abs(Math.random() - 0.5) / 100;
                bd.speed.y = Math.abs(Math.random() - 0.5) / 100;
                bd.speed.z = (Math.random() - 0.5) / 100;
                bd.mesh.scale.set(0.00521, 0.00521, 0.00521);
                scene.add(bd.mesh);
                // console.log(bd.speed);
                birds.push(bd);
        }
}



function moveBirds(no){
       for (var i=0; i<no; i++) {
                birds[i].vector.setFromMatrixPosition(birds[i].mesh.matrixWorld);
                birds[i].vector.project(camera);

                birds[i].x = birds[i].x_(birds[i].vector);
                birds[i].y = birds[i].y_(birds[i].vector);
                birds[i].mesh.updateMatrixWorld();
                // birds[i].checkBoundary();
                // console.log(birds[i].speed.x, birds[i].y);
                birds[i].mesh.position.x += birds[i].speed.x;
                birds[i].mesh.position.y += birds[i].speed.y;
                birds[i].mesh.position.z += birds[i].speed.z;
                birds[i].pos = birds[i].mesh.position.clone();
                birds[i].pos.x += birds[i].speed.x*50;
                birds[i].pos.y += birds[i].speed.y*50;
                birds[i].mesh.rotation.z = Math.asin(birds[i].speed.y / 2);
                birds[i].mesh.rotation.y = Math.atan2(-birds[i].speed.z, birds[i].speed.x);
                
                birds[i].phase = (birds[i].phase + (Math.max(0, birds[i].mesh.rotation.z) + 0.1)) % 62.83;
                const positions = birds[i].mesh.geometry.attributes.position.array;
                positions[3*3 + 1] = positions[3*6+1] = Math.sin(birds[i].phase) * 5;
                birds[i].mesh.geometry.attributes.position.needsUpdate = true;

                // birds[i].mesh.lookAt(birds[i].pos);
        }
}



function calcFlocking(no){
        for (var i=0; i<no; i++){
                var boid1 = birds[i];
                boid1.close_dx = 0;
                boid1.close_dy = 0;
                boid1.close_dz = 0;
                boid1.xvel_avg = 0;
                boid1.yvel_avg = 0;
                boid1.zvel_avg = 0;
                boid1.xpos_avg = 0;
                boid1.ypos_avg= 0;
                boid1.zpos_avg= 0;
                boid1.neighboring_boids= 0;

                for (var j =0; j<no; j++){
                        var boid2 = birds[j];
                        var dist = boid2.mesh.position.distanceTo(boid1.mesh.position);
                        if (dist < PROTECTED_RANGE){
                                boid1.close_dx += boid1.mesh.position.x - boid2.mesh.position.x;
                                boid1.close_dy += boid1.mesh.position.y - boid2.mesh.position.y;
                                boid1.close_dz += boid1.mesh.position.z - boid2.mesh.position.z;
                        }

                        if (dist < VISIBLE_RANGE){
                                boid1.xvel_avg += boid2.speed.x;
                                boid1.yvel_avg += boid2.speed.y;
                                boid1.zvel_avg += boid2.speed.z;
                                boid1.neighboring_boids += 1;
                                boid1.xpos_avg += boid2.mesh.position.x;
                                boid1.ypos_avg += boid2.mesh.position.y;
                                boid1.zpos_avg += boid2.mesh.position.z;

                        }
                        
                }
                boid1.speed.x += boid1.close_dx*AVOID_FACTOR;
                boid1.speed.y += boid1.close_dy*AVOID_FACTOR;
                boid1.speed.z += boid1.close_dz*AVOID_FACTOR;
                if (boid1.neighboring_boids > 0){
                        boid1.xvel_avg = boid1.xvel_avg / boid1.neighboring_boids;
                        boid1.yvel_avg = boid1.yvel_avg / boid1.neighboring_boids;
                        boid1.zvel_avg = boid1.zvel_avg / boid1.neighboring_boids;
                        boid1.xpos_avg = boid1.xpos_avg / boid1.neighboring_boids;
                        boid1.ypos_avg = boid1.ypos_avg / boid1.neighboring_boids;
                        boid1.zpos_avg = boid1.zpos_avg / boid1.neighboring_boids;
                }
                boid1.speed.x += (boid1.xvel_avg - boid1.speed.x) * MATCHING_FACTOR;
                boid1.speed.y += (boid1.yvel_avg - boid1.speed.y) * MATCHING_FACTOR;
                boid1.speed.z += (boid1.zvel_avg - boid1.speed.z) * MATCHING_FACTOR;
                
                boid1.speed.x += (boid1.xpos_avg - boid1.mesh.position.x) * CENTERING_FACTOR;
                boid1.speed.y += (boid1.ypos_avg - boid1.mesh.position.y) * CENTERING_FACTOR;
                boid1.speed.z += (boid1.zpos_avg - boid1.mesh.position.z) * CENTERING_FACTOR;

                var speed = Math.sqrt(boid1.speed.x**2 + boid1.speed.y**2 + boid1.speed.z**2);
                if (speed > MAXSPEED){
                        // console.log(speed);
                        boid1.speed.x = (boid1.speed.x / speed) * MAXSPEED;
                        boid1.speed.y = (boid1.speed.y / speed) * MAXSPEED;
                }
                if (speed < MINSPEED){
                        boid1.speed.x = (boid1.speed.x / speed) * MINSPEED;
                        boid1.speed.y = (boid1.speed.y / speed) * MINSPEED;
                }
                if (boid1.x < 50){
                        boid1.speed.x += TURNFACTOR;
                        // console.log("speed", boid1.x);
                }
                if(boid1.x >= window.innerWidth+50){
                        boid1.speed.x -= TURNFACTOR;
                        // console.log(boid1.x, window.innerWidth);
                }
                if(boid1.y < 50){
                        boid1.speed.y -= TURNFACTOR;
                }
                if(boid1.y > window.innerHeight-50){
                        boid1.speed.y += TURNFACTOR;
                }

                if(boid1.mesh.position.z < 0){
                        boid1.speed.z += TURNFACTOR;
                }
                if(boid1.mesh.position.z > 1.9){
                        boid1.speed.z -= TURNFACTOR;
                }

        }
}

function deleteBirds(no){
        no = Math.abs(no);
        for(var i=0; i<no; i++){
                var b = birds.pop();
                scene.remove(b.mesh);
                b.mesh.geometry.dispose();
                b.mesh.material.dispose();
                renderer.renderLists.dispose();
                b = undefined;
        }
}


function dynamicBirds(noBirds){
        var diff = noBirds - birds.length;
        // console.log(diff);
        if (diff > 0){
                createBirds(diff);
        }
        if(diff < 0){
                deleteBirds(diff);
        }
}


var noBirds;
var slider = document.querySelector("#myRange");
var amount = document.getElementById("amount");

noBirds = amount.value;

createBirds(noBirds);

slider.addEventListener('input', function() {
noBirds = this.value;
// console.log(noBirds);
dynamicBirds(noBirds);
});




// birds[0].mesh.geometry.rotateX(Math.PI/2);


function animate() {
        requestAnimationFrame( animate );                
        moon.rotation.y += 0.0002;
        moon.rotation.x +=0.0001;
        world.rotation.x += 0.00002;
        world.rotation.y += 0.00001;
        calcFlocking(noBirds);
        moveBirds(noBirds);
        // scene.remove(clouds.pM);
        moveClouds(clouds.pM, clouds.pM2);
        renderer.render( scene, camera );
}


animate()
