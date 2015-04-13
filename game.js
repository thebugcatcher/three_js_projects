/**
 * Created by adityaiyengar on 4/12/15.
 */
require([],function() {
    if (!Detector.webgl) {

        Detector.addGetWebGLMessage();
        document.getElementById('container').innerHTML = "";

    }

    var container, stats;
    var camera, scene, renderer, keyboard;

    var render_functions = [];
    var start = true;

    var hex_scale = 5;
    var prop_scale = 100;

    var prop1, prop2, prop3, prop4, hexCopter,
        hex_cop, loader, light;

    var water, waterNormals, mirrorMesh;

    var prop1_cf, prop2_cf, prop3_cf, prop4_cf,
        hex_cop_cf, hexCopter_cf, camera_cf;

    var min_prop_speed = 400;
    var max_prop_speed = 600;
    var inc_rate = 50;
    var gravity = 980;
    var follow = false;

    var prop1_speed = min_prop_speed;
    var prop2_speed = min_prop_speed;
    var prop3_speed = min_prop_speed;
    var prop4_speed = min_prop_speed;
    var linear_speed = prop1_speed + prop2_speed + prop3_speed + prop4_speed - 1600;

    var vertical_height = 0.0;
    var wavespeed = 10;
    var rotation_factor = 800;


    var parameters = {
        width: 2000,
        height: 2000,
        widthSegments: 250,
        heightSegments: 250,
        depth: 1500,
        param: 4,
        filterparam: 1
    }

    document.addEventListener('keypress', function (event) {
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'g') {
            start ^= true;
        }
        if (key == 'f') {
            start ^= true;
        }

    }, false);

    document.addEventListener('keydown', function (event) {
        var key = String.fromCharCode(event.keyCode || event.charCode);
        if (key == 'I') {
            if (prop1_speed < max_prop_speed)
                prop1_speed += inc_rate;
        }
        if (key == 'M') {
            if (prop2_speed < max_prop_speed)
                prop2_speed += inc_rate;
        }
        if (key == 'W') {
            if (prop3_speed < max_prop_speed)
                prop3_speed += inc_rate;
        }
        if (key == 'X') {
            if (prop4_speed < max_prop_speed)
                prop4_speed += inc_rate;
        }
    });




    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    //camera_cf = new THREE.Matrix4();
    //camera_cf.makeTranslation(-2000, 2000, 0);
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 3000000);
    camera.position.x = -2000;
    camera.position.y = 1000;
    camera.lookAt(scene.position);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.userPan = false;
    //controls.userPanSpeed = 0.0;
    ////controls.maxDistance = 12500.0;
    //controls.maxPolarAngle = Math.PI * 2;
    //controls.center.set(0, 500, 0);

    light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2);
    light.color.setHSL(1, 1, 1);
    light.position.set(0, 10000, 0);
    scene.add(light);

    var light2 = new THREE.SpotLight(0xff99944);
    light2.position.set(-1, -1, -1);
    scene.add(light2);
    {
        waterNormals = new THREE.ImageUtils.loadTexture('textures/waternormals.jpg');
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

        water = new THREE.Water(renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 1.0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 10
        });

        //water.rotation.x = -Math.PI/2;


        mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(parameters.width * 500, parameters.height * 500),
            water.material
        );

        mirrorMesh.add(water);
        mirrorMesh.rotation.x = -Math.PI * 0.5;
        scene.add(mirrorMesh);

        var sky = new THREE.Mesh(
            new THREE.SphereGeometry(30000, 320, 320),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('textures/skyboxsun25degtest.jpg')
            })
        );
        sky.material.side = THREE.BackSide;
        sky.rotation.x = -Math.PI * 0.5;
        scene.add(sky);
    }

    loader = new THREE.JSONLoader(); // init the loader util
    prop1_cf = new THREE.Matrix4();
    prop2_cf = new THREE.Matrix4();
    prop3_cf = new THREE.Matrix4();
    prop4_cf = new THREE.Matrix4();

    hexCopter = new THREE.Group();
    hex_cop = new HexCopter(scene, hex_scale, loader);
    hex_cop_cf = new THREE.Matrix4();
    hex_cop_cf.makeTranslation(0, 0, 0);
    hexCopter.add(hex_cop);

    //hexCopter.add(camera);
    {
        prop1 = new Propeller(scene, prop_scale, loader);
        prop1.position.x = 610;
        prop1.position.y = -30;
        prop1.position.z = 610;
        prop1_cf = new THREE.Matrix4();
        prop1_cf.makeTranslation(610, -30, 610);
        hexCopter.add(prop1);


        prop2 = new Propeller(scene, prop_scale, loader);
        prop2.position.x = -590;
        prop2.position.y = -30;
        prop2.position.z = 610;
        prop2_cf = new THREE.Matrix4();
        prop2_cf.makeTranslation(-590, -30, 610);
        hexCopter.add(prop2);


        prop3 = new Propeller(scene, prop_scale, loader);
        prop3.position.x = -590;
        prop3.position.y = -30;
        prop3.position.z = -610;
        prop3_cf = new THREE.Matrix4();
        prop3_cf.makeTranslation(-590, -30, -610);
        hexCopter.add(prop3);

        prop4 = new Propeller(scene, prop_scale, loader);
        prop4.position.x = 610;
        prop4.position.y = -30;
        prop4.position.z = -610;
        prop4_cf = new THREE.Matrix4();
        prop4_cf.makeTranslation(610, -30, -610);
        hexCopter.add(prop4);
    }

    hexCopter_cf = new THREE.Matrix4();
    hexCopter_cf.makeTranslation(0, 1000, 0);
    hexCopter.position.y = 1000;
    scene.add(hexCopter);

    render_functions.push(function(delta, now){

        water.material.uniforms.time.value -= wavespeed *delta;
        water.render();
        //controls.update();
        renderer.render(scene, camera);
    });

    render_functions.push(function(delta) {
        var tran = new THREE.Vector3();
        var quat = new THREE.Quaternion();
        var rot = new THREE.Quaternion();
        var vscale = new THREE.Vector3();
        linear_speed = prop3_speed + prop4_speed + prop1_speed + prop2_speed - 1600;
        {
            hexCopter_cf = new THREE.Matrix4().makeTranslation(
                hexCopter.position.x,
                hexCopter.position.y - gravity*delta*delta,
                hexCopter.position.z);

            hexCopter_cf.multiply(new THREE.Matrix4().
                makeRotationX((prop3_speed + prop4_speed - prop1_speed - prop2_speed) / rotation_factor));


            hexCopter_cf.multiply(new THREE.Matrix4().
                makeRotationZ((prop1_speed + prop3_speed - prop2_speed - prop4_speed) / rotation_factor));
            
            if (hexCopter.position.y <= 3000) {
                hexCopter_cf.multiply(new THREE.Matrix4().
                    makeTranslation(0, linear_speed / 2 * delta, 0));
            }
            else {
                hexCopter_cf.multiply(new THREE.Matrix4().
                    makeTranslation(
                    linear_speed * 2 * delta * (-Math.sin(hexCopter.rotation.z)),
                    0, linear_speed * 2 * delta * (Math.sin(hexCopter.rotation.x))));
            }
            hexCopter_cf.decompose(tran, quat, vscale);
            hexCopter.position.copy(tran);
            hexCopter.quaternion.copy(quat);
        }
        {
            if (follow) {
               camera_cf = new THREE.Matrix4().makeTranslation(hexCopter.x + 5000, hexCopter.y + 5000, hexCopter.z);
                camera_cf.makeRotationY(Math.PI/2);
                camera_cf.decompose(tran, quat, vscale);
                //camera.lookAt(hexCopter);
                //camera.position.x = hexCopter.x + 5000;
                //camera.position.x = hexCopter.x - 5000;
                //camera.position.z = hexCopter.z;
                //controls.center.set(hexCopter.x + 5000, hexCopter.y-5000, hexCopter.z);
                //camera.position.copy(tran);
                //camera.quaternion.copy(quat);
            }
        }
        {
            if (prop1_speed > min_prop_speed) {
                prop1_speed -= inc_rate * delta;
            }
            else {
                prop1_speed = min_prop_speed;
            }
            if (prop2_speed > min_prop_speed) {
                prop2_speed -= inc_rate * delta;
            }
            else {
                prop2_speed = min_prop_speed;
            }
            if (prop3_speed > min_prop_speed) {
                prop3_speed -= inc_rate * delta;
            }
            else {
                prop3_speed = min_prop_speed;
            }
            if (prop4_speed > min_prop_speed) {
                prop4_speed -= inc_rate * delta;
            }
            else {
                prop4_speed = min_prop_speed;
            }
        }
        {
            prop1_cf.multiply(new THREE.Matrix4().
                makeRotationY(prop1_speed * Math.PI / 200 * delta));

            prop1_cf.decompose(tran, quat, vscale);
            prop1.position.copy(tran);
            prop1.quaternion.copy(quat);

            prop2_cf.multiply(new THREE.Matrix4().
                makeRotationY(-prop2_speed * Math.PI / 200 * delta));

            prop2_cf.decompose(tran, quat, vscale);
            prop2.position.copy(tran);
            prop2.quaternion.copy(quat);

            prop3_cf.multiply(new THREE.Matrix4().
                makeRotationY(prop3_speed * Math.PI / 200 * delta));

            prop3_cf.decompose(tran, quat, vscale);
            prop3.position.copy(tran);
            prop3.quaternion.copy(quat);

            prop4_cf.multiply(new THREE.Matrix4().
                makeRotationY(-prop4_speed * Math.PI / 200 * delta));

            prop4_cf.decompose(tran, quat, vscale);
            prop4.position.copy(tran);
            prop4.quaternion.copy(quat);
        }
    });

    render_functions.push(function(){
        renderer.render(scene,camera);
    });

    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60;
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec);
        lastTimeMsec	= nowMsec;
        // call each update function
        if (!start) {
            return;
        }
        else {
            render_functions.forEach(function(f){
                f(deltaMsec/1000, nowMsec/1000)
            })
        }

    })
});


