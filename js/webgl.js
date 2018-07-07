const windowWidth = 512;
const windowHeight = 512;
$(document).ready(function () {

    // Setup scene and camera
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
    scene.background = new THREE.Color(0xf4f4f4);

    // Build our renderer and append it to its container
    var renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(windowWidth, windowHeight);
    document.getElementById('render-target').appendChild(renderer.domElement);

    // Load an obj from url
    var texture = new THREE.Texture(document.getElementById('canvas-target'));
    var loader = new THREE.OBJLoader();
    var loadedObj;
    loader.setPath( "https://s3-ap-southeast-2.amazonaws.com/spiff-security-test/" );
    loader.load( 'spot_triangulated.obj', function ( object ) {
        loadedObj = object;
            var material = new THREE.MeshBasicMaterial({ map: texture });
            object.traverse( function(child) {
                if (child instanceof THREE.Mesh) {
                  child.material = material;
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
              });
            object.material = material;
            scene.add(object);
    });

    // Add a light to the scene
    var spotlight = new THREE.SpotLight(0xffffff);
    spotlight.position.set(10, 100, -50);
    scene.add(spotlight);

    // Position the camera
    camera.position.z = 2;

    // Setup rendering loop
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var lastFrameTime = new Date().getTime() / 1000;
    var totalGameTime = 0;

    function update(dt, t) {

        if(loadedObj) {
            loadedObj.rotation.x += 1 * dt;
            loadedObj.rotation.y += 1 * dt;
        }

        setTimeout(function () {
            var currTime = new Date().getTime() / 1000;
            var dt = currTime - (lastFrameTime || currTime);
            totalGameTime += dt;

            update(dt, totalGameTime);

            lastFrameTime = currTime;
        }, 0);
    }

    function render() {
        texture.needsUpdate = true;
        renderer.render(scene, camera);
        requestAnimFrame(render);
    }

    render();
    update(0, totalGameTime);
}) 
