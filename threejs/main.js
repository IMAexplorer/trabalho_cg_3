// ThreeJS variables#
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
var sun, earth, mercury, venus, mars, jupiter, saturn, uranus, neptune;
// To be added
var moon, saturn_ring;

// Light in the scene
var sunlight;

function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 3;
    camera.position.y = 20;
    camera.lookAt( 0, 0, -4);

    // Setting up scene
    scene = new THREE.Scene();
    // Planets
    mercury = createSphere(0.5, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = -10;

    venus = createSphere(1.3, 20, 'texture/venus_surface.jpg', 'Phong');
    venus.position.z = -14;
    //adicionar atmosfera

    earth = createSphere(1, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -9;

    moon = createSphere(0.2, 20, 'texture/moon.jpg', 'Phong')
    moon.position.z = -1.5;
    earth.add(moon);

    mars = createSphere(0.6, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -21;

    jupiter = createSphere(2, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -25;

    saturn = createSphere(1.8, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -30;

    uranus = createSphere(1, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -33;

    neptune = createSphere(0.8, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = -37;
    moon.position.z = -1.5;
    earth.add(moon);

    mars = createSphere(0.6, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -21;

    jupiter = createSphere(2, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -25;

    saturn = createSphere(1.8, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -30;

    saturn_ring = createRing(1, 1.2, 20, 'texture/saturn_ring_alpha.png', 'Phong');
    saturn.add(saturn_ring);

    uranus = createSphere(1, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -33;

    neptune = createSphere(0.8, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = -37;

    // Sun (Sphere + Light)

    sun = createSphere(4, 20, 'texture/sun.jpg');
    sun.position.z = -3;

    /* Complete: add light
    */
    const light = new THREE.PointLight( 0xffffff, 1, 0, 2);

    sun.add(light);
    light.decay = 10;

    /* Complete: add
    other planets */

    scene.add(sun);

    sun.add(mercury);
    sun.add(venus);
    sun.add(mars);
    sun.add(jupiter);
    sun.add(saturn);
    sun.add(uranus);
    sun.add(neptune);
    sun.add(earth);
    // Adding both renderer and stats to the Web page, also adjusting OrbitControls
    stats = new Stats();
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(stats.dom);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.zoomSpeed = 2;

    // Adding listener for keydown
    document.addEventListener("keydown", onDocumentKeyDown, false);

    // Saving initial position
    scene.traverse( function( node ) {
        if ( node instanceof THREE.Object3D ) {
            node.savePosition();
        }

    } );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentKeyDown(event) {
    console.log(event.which);
}

function animate() {

    requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

    stats.update();
    renderer.render( scene, camera );
    
    planet_mov(mercury, 58, 88, false);
    planet_mov(venus, 116, 225, false);
    planet_mov(earth, 1, 365, false);
    planet_mov(mars, 1, 687, false)
    planet_mov(jupiter, 0.41, 4328, false);
    planet_mov(saturn, 0.45, 10752, false);
    planet_mov(uranus, 0.72, 84, true);
    planet_mov(neptune, 0.67, 164, true);

}


function planet_mov(planet, rel_rot, rel_trans, inverse) {

    var translation = 0.1/rel_trans;
    var rotation = 0.1/rel_rot;

    if (inverse) {
        rotation *= -1;
    }
    const eixo = new THREE.Vector3( 0, 1, 0 );
    const point_translate = new THREE.Vector3( 0, 0, planet.z );
    const point_rotate = new THREE.Vector3(planet.position.x, planet.position.y, planet.position.z);

    planet.rotateAroundPoint(point_translate, translation, eixo, false); // 10752
    planet.rotateAroundPoint(point_rotate, rotation, eixo, false); // 0.45
}

init();
animate();
