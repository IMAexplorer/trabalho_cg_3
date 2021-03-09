// ThreeJS variables#
var camera, scene, renderer;

// OrbitControls (camera)
var controls;

// Optional (showFps)
var stats;

// Objects in Scene
var sun, earth, mercury, venus, mars, jupiter, saturn, uranus, neptune, fakeEarth, fakeSun;
// To be added
var moon, saturn_ring;

// Light in the scene
var sunlight;
var dia = 0.1;
var ano = dia/365;

function init() {

    // Setting up renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    window.addEventListener('resize', onWindowResize, false);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Setting up camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.5, 1000 );
    camera.position.z = 5;
    camera.position.y = 44;
    camera.position.x = 42;
    camera.lookAt( -40, 42, -30);

    // Setting up scene
    scene = new THREE.Scene();
    // Planets
    mercury = createSphere(0.5, 20, 'texture/mercury.jpg', 'Phong');
    mercury.position.z = -10;

    venus = createSphere(1.3, 20, 'texture/venus_surface.jpg', 'Phong');
    venus.position.z = -15;

    earth = createSphere(1, 20, 'texture/earth.jpg', 'Phong');
    earth.position.z = -20;
    fakeEarth = createSphere(1.05, 20, 'texture/earth.jpg', 'Phong');
    fakeEarth.position.z = -20;
    
    moon = createSphere(0.2, 20, 'texture/moon.jpg', 'Phong')
    moon.position.z = -1.5;
    earth.add(moon);

    mars = createSphere(0.6, 20, 'texture/mars.jpg', 'Phong');
    mars.position.z = -24;

    jupiter = createSphere(2, 20, 'texture/jupiter.jpg', 'Phong');
    jupiter.position.z = -29;

    saturn = createSphere(1.8, 20, 'texture/saturn.jpg', 'Phong');
    saturn.position.z = -36;
    
    saturn_ring = createRing(2, 2.4, 20, 'texture/saturn_ring_alpha.png', 'Phong');
    saturn_ring.position.z = 0;
    saturn_ring.rotation.x =  -1.1;
    saturn.add(saturn_ring);

    uranus = createSphere(1, 20, 'texture/uranus.jpg', 'Phong');
    uranus.position.z = -41;

    neptune = createSphere(0.8, 20, 'texture/neptune.jpg', 'Phong');
    neptune.position.z = -47;

    sun = createSphere(4, 20, 'texture/sun.jpg');
    sun.position.z = 0;
    fakeSun = createSphere(4.05, 20, 'texture/sun.jpg');
    fakeSun.position.z = 0;

    const light = new THREE.PointLight( 0xffffff, 1.5, 100, 2);
    sun.add(light);
    
    scene.add(sun);
    scene.add(fakeSun);
    sun.add(mercury);
    sun.add(fakeEarth);
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
    const a = new THREE.Vector3( 0, 0, 0 );
    const b = new THREE.Vector3( 0, 1, 0 );

    earth.rotateAroundPoint(a, ano, b, true);
    fakeEarth.rotateAroundPoint(a, ano, b, true);
    fakeEarth.rotateAroundPoint(new THREE.Vector3(earth.position.x, earth.position.y, earth.position.z), dia, b, false);
    
    fakeSun.rotateAroundPoint(a, dia/27, b, true);
    moon.rotateAroundPoint(new THREE.Vector3(0, 0, 0), dia/27, b, false);

    mercury.rotateAroundPoint(a, dia/88, b, true);
    mercury.rotateAroundPoint(new THREE.Vector3(mercury.position.x, mercury.position.y, mercury.position.z), dia/58, b, false);

    venus.rotateAroundPoint(a, dia/225, b, true);
    venus.rotateAroundPoint(new THREE.Vector3(venus.position.x, venus.position.y, venus.position.z), dia/116, b, false);

    mars.rotateAroundPoint(a, dia/687, b, true);
    mars.rotateAroundPoint(new THREE.Vector3(mars.position.x, mars.position.y, mars.position.z), dia/1, b, false);
    
    jupiter.rotateAroundPoint(a, dia/4328, b, true);
    jupiter.rotateAroundPoint(new THREE.Vector3(jupiter.position.x, jupiter.position.y, jupiter.position.z), dia/0.41, b, false);
    
    saturn.rotateAroundPoint(a, dia/10725, b, true);
    saturn.rotateAroundPoint(new THREE.Vector3(saturn.position.x, saturn.position.y, saturn.position.z), dia/0.45, b, false);
    
    uranus.rotateAroundPoint(a, dia/84, b, true);
    uranus.rotateAroundPoint(new THREE.Vector3(uranus.position.x, uranus.position.y, uranus.position.z), -dia/0.72, b, false);

    neptune.rotateAroundPoint(a, dia/164, b, true);
    neptune.rotateAroundPoint(new THREE.Vector3(neptune.position.x, neptune.position.y, neptune.position.z), -dia/0.67, b, false);
}

init();
animate();
