window.addEventListener(`DOMContentLoaded`, () => {
    const myCanvas = document.querySelector("#myCanvas");

    // const axes = new THREE.AxesHelper();

    const scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xbbbbbb );
    // scene.add(axes);

    const camera = new THREE.PerspectiveCamera(
        20,
        myCanvas.offsetWidth / myCanvas.offsetHeight
    );
    camera.position.set(16, 11, 16);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas,
        alpha: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(myCanvas.offsetWidth, myCanvas.offsetHeight);

    const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.maxPolarAngle = Math.PI * 0.5;
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 50;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 1.0;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);
    render();
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    let miku;
    const loader = new THREE.GLTFLoader();
    loader.load("/mikumengo.glb", function (gltf) {
        scene.add(gltf.scene);
        render();
    });

    renderer.outputEncoding = THREE.sRGBEncoding;

    camera.lookAt(0, 0, 0);

    renderer.setAnimationLoop(() => {
        orbitControls.update();
        render();
    });
    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        render();
    }

    function render() {
        renderer.render(scene, camera);
    }
});
