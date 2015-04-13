if ( ! Detector.webgl ) {

    Detector.addGetWebGLMessage();
    document.getElementById( 'container' ).innerHTML = "";

}

var container, stats;
var camera, scene, renderer;
var board, boarder;
var wavespeed = 3.0;
var in_water = false;
var moving_right = true;
var initi = false;
var jump = false;
var in_air = false;
var on_ramp = false;
var pauseAnim = true;
var board_speed = 2;
var board_speed_y = board_speed*Math.sin(35*Math.PI/180);
var gravity = board_speed/150;
var group = new THREE.Group();
var onRender = [];
var board_cf = new THREE.Matrix4();
var board_x;
var board_y;
var onlefthp;
var onrighthp;
var follow_board;
var camera_cf;
var pause_anim;

var parameters = {
    width: 2000,
    height: 2000,
    widthSegments: 250,
    heightSegments: 250,
    depth: 1500,
    param: 4,
    filterparam: 1
}

var waterNormals;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.5, 3000000 );
    camera.position.set( 2000, 750, 2000 );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.userPan = false;
    controls.userPanSpeed = 0.0;
    controls.maxDistance = 12500.0;
    controls.maxPolarAngle = Math.PI * 2;
    controls.center.set( 0, 500, 0 );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 2 );
    light.position.set( -1, 0, -1 );
    scene.add( light );

    var light2 = new THREE.SpotLight(0xffffff);
    light2.position.set(-1,-1, -1);
    scene.add(light2);

    waterNormals = new THREE.ImageUtils.loadTexture( 'textures/waternormals.jpg' );
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

    water = new THREE.Water( renderer, camera, scene, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        alpha: 	1.0,
        sunDirection: light2.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 500.0
    } );


    mirrorMesh = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
        water.material
    );

    mirrorMesh.add( water );
    mirrorMesh.rotation.x = - Math.PI * 0.5;
    scene.add( mirrorMesh );

    var stone_tex = THREE.ImageUtils.loadTexture("textures/concrete.jpg");
    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */

    var ground =  new THREE.Mesh(
        new THREE.BoxGeometry(12000,8000,500),
        new THREE.MeshPhongMaterial({color:0xfefefefe, ambient:0x1d6438, map:stone_tex})
    );
    ground.rotation.x = -Math.PI *0.5;
    ground.position.x = - 4000;
    scene.add(ground);

    var cement_text = THREE.ImageUtils.loadTexture("textures/cement.jpg");
    var grafitti_text = THREE.ImageUtils.loadTexture("textures/grafitti.jpg");
    var plank_text = THREE.ImageUtils.loadTexture("textures/plankTexture.jpg");

    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */
    cement_text.repeat.set(1,1);
    cement_text.wrapS = THREE.RepeatWrapping;
    cement_text.wrapT = THREE.RepeatWrapping;

    var up = new THREE.PlaneBufferGeometry(1000, 5000, 10, 10);
    var rampMat = new THREE.MeshPhongMaterial(
        {
            color:0xd3d3d3,
            ambient:0xd3d3d3,
            map:cement_text,
            side: THREE.DoubleSide
        }
    );
    var ramp = new THREE.Mesh (up, rampMat);
    ramp.position.y = 350;
    ramp.position.x = -7000;
    ramp.rotateX(THREE.Math.degToRad(90));
    ramp.rotateY(THREE.Math.degToRad(35));

    scene.add(ramp);


    board = new THREE.Group();
    var base = new THREE.Mesh(
        new THREE.BoxGeometry(300,150,25),
        new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            ambient:0xd3d3d3,
            map:plank_text,
            side: THREE.DoubleSide
        })
    );
    board.add(base);
    board.rotateX(Math.PI/2);
    var wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(20,20,10),
        new THREE.MeshPhongMaterial({ color: 0xaaaaaa,
            specular: 0x009900, shininess: 30, shading: THREE.FlatShading })
    )
    wheel.position.x = 500;
    board.position.x = 700;

    //var end1 = new THREE.Mesh(
    //    new THREE.RingGeometry(50,70,5,5,0,Math.PI/2),
    //    new THREE.MeshPhongMaterial({ color: 0xdddddd,
    //        specular: 0x009999, shininess: 30, shading: THREE.FlatShading })
    //);
    //
    //end1.position.x = 900;
    //scene.add(end1);

    var half_pipe = new THREE.Group();
    var ring = new THREE.Mesh(
        new THREE.CylinderGeometry(500,500,5000,10,10,1,0,Math.PI/2),
        new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            side: THREE.DoubleSide,
            map: grafitti_text
        })
    );

    //ring.material.side = THREE.DoubleSide;

    var ring2 = ring.clone();
    ring.position.y = 750;
    ring.position.x = -1000;
    ring.rotation.x = Math.PI/2;
    half_pipe.add(ring);

    ring2.position.y = 750;
    ring2.position.x = - 3000;
    ring2.rotation.x = Math.PI/2;
    ring2.rotation.z = Math.PI;
    half_pipe.add(ring2);
    scene.add(half_pipe);



    scene.add(board);

    var sky = new THREE.Mesh(
        new THREE.SphereGeometry(20000, 32, 32),
        new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('textures/skyboxsun25degtest.jpg')
        })
    );
    sky.material.side = THREE.BackSide;
    sky.rotation.x =- Math.PI * 0.5;
    scene.add(sky);


    var gripTape = THREE.ImageUtils.loadTexture("textures/batman.jpg");
    /* for repeat to work, the image size must be 2^k */

    /* repeat the texture 4 times in both direction */
    //gripTape.repeat.set(4,4);
    //gripTape.wrapS = THREE.RepeatWrapping;
    //gripTape.wrapT = THREE.RepeatWrapping;

    var scaling_factor = 200;
    var board3 = new THREE.BoxGeometry(1*scaling_factor,3*scaling_factor,.05*scaling_factor);
    var material3 = new THREE.MeshPhongMaterial( {color:0xd3d3d3, ambient:0xd3d3d3, map:gripTape});
    var deck = new THREE.Mesh( board3, material3 );

    deck.rotateX(THREE.Math.degToRad(90));
    deck.rotateZ(THREE.Math.degToRad(90));

    deck.position.set(0,2*scaling_factor,0);

    var base2 = new THREE.BoxGeometry(.3*scaling_factor,.2*scaling_factor,.3*scaling_factor);
    var material2 = new THREE.MeshBasicMaterial({color:0xd3d3d3});
    var backTruck = new THREE.Mesh(base2,material2);

    var pipe = new THREE.CylinderGeometry(0.05*scaling_factor, 0.05*scaling_factor,.7*scaling_factor);
    var frameMat = new THREE.MeshBasicMaterial({color:0xd3d3d3});
    var backAxil = new THREE.Mesh (pipe, frameMat);
    backAxil.rotateX(THREE.Math.degToRad(90));

    var fronTruck = backTruck.clone();
    var frontAxile = backAxil.clone();



    /*var tip = new  THREE.TorusGeometry(.2,.1, 15, 30);
     var tipMat = new THREE.MeshPhongMaterial({color: 0x000000});
     var nose = new THREE.Mesh (tip, tipMat);
     nose.side = THREE.DoubleSide;

     nose.position.set(0,3,0);*/

    var wheelGeo = new THREE.TorusGeometry(.1*scaling_factor,.08*scaling_factor, 15, 30);
    var tubeMat = new THREE.MeshPhongMaterial({color: 0x000000});
    var frontLeft = new THREE.Mesh (wheelGeo, tubeMat);

    var frontRight = frontLeft.clone();
    var backRight = frontLeft.clone();
    var backLeft = frontLeft.clone();

    frontRight.position.set (-1*scaling_factor, 1.8*scaling_factor,-.4*scaling_factor);
    frontLeft.position.set (-1*scaling_factor, 1.8*scaling_factor,.4*scaling_factor);
    backLeft.position.set(1*scaling_factor,1.8*scaling_factor,.4*scaling_factor);
    backRight.position.set(1*scaling_factor,1.8*scaling_factor,-.4*scaling_factor);

    backTruck.position.set(1*scaling_factor,1.88*scaling_factor,0);
    backAxil.position.set(1*scaling_factor,1.8*scaling_factor,0);

    fronTruck.position.set(-1*scaling_factor,1.88*scaling_factor,0);
    frontAxile.position.set(-1*scaling_factor,1.8*scaling_factor,0);

    group.add (frontLeft);
    group.add (frontRight);
    group.add (backRight);
    group.add (backLeft);
    group.add(deck);
    group.add(backAxil);
    group.add(backTruck);
    group.add(frontAxile);
    group.add(fronTruck);

    group.position.x = -10000;
    group.position.y = -75;

    board_cf.multiply(new THREE.Matrix4().makeTranslation(-10000,-75,0));
    board_x = -10000;
    var loader = new THREE.JSONLoader(); // init the loader util

// init loading
    loader.load('models/rotor.json', function (geometry) {
        // create a new material
        var material_x = new THREE.MeshLambertMaterial({
            //map: THREE.ImageUtils.loadTexture('textures/rotor_metal.jpg'),  // specify and load the texture
            colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
            colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
        });

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );

        mesh.position.y = 1000;
        mesh.scale.set(100, 100, 100);

        scene.add(mesh);
    });
    //scene.add(mesh);


    scene.add(group);

}

//

function animate() {

    requestAnimationFrame( animate );
    render();

}

function animate_board(time){
    var tran = new THREE.Vector3();
    var quat = new THREE.Quaternion();
    var rot = new THREE.Quaternion();
    var vscale = new THREE.Vector3();
    //board_cf.multiply(new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(time * 72)));


    if ( board_x < -7400){
        board_cf.multiply(new THREE.Matrix4().makeTranslation(board_speed*time,0,0));
        board_x += board_speed * time;
    }
    else if (on_ramp != true){
        board_x = -6800;
        board_cf = new THREE.Matrix4().makeTranslation(-6800,125, 0);
        board_cf.multiply(new THREE.Matrix4().makeRotationZ(Math.PI/180*35));
        on_ramp = true;
    }
    else if (board_x< -6000){
        board_x += board_speed *Math.cos(Math.PI/180*35)* time;
        board_cf.multiply(new THREE.Matrix4().makeTranslation(
            board_speed * time, 0, 0));
        if (board_x > -6000)
            board_cf.multiply(new THREE.Matrix4().makeRotationZ(-Math.PI/180*35));
    }
    else if (board_x < - 3850){
        board_cf.multiply(new THREE.Matrix4().makeTranslation
        (board_speed*Math.cos(Math.PI/180*35)*time, board_speed_y*time, 0));
        board_x += board_speed *Math.cos(Math.PI/180*35)* time;
        board_speed_y -= gravity;
        board_y = group.position.y;
        if (board_x >= -3850){
            board_cf = new THREE.Matrix4().makeTranslation(-3850,1000, 0);
            board_y = 1000;
            board_x - 3850;
            board_cf.multiply(new THREE.Matrix4().makeRotationZ(-Math.PI/2));
        }
        moving_right = true;
    }
    else if (board_y > -75 && moving_right){
        board_cf.multiply(new THREE.Matrix4().makeTranslation
        (2*board_speed * time, 0, 0));
        board_y -= board_speed*time;
        board_cf.multiply(new THREE.Matrix4().makeRotationZ(board_speed/500*time));
        if (board_y <= -75){
            board_y  = -75;
            board_x = -3000;
            board_cf = new THREE.Matrix4().makeTranslation(board_x,board_y, 0);
        }
    }
    board_cf.decompose(tran, quat, vscale);
    group.position.copy(tran);
    group.quaternion.copy(quat);
}

function animate_camera(time){
    if (board_x < -7400){
        camera.position.x = board_x - 1000;
        camera.position.z = group.position.z;
        camera.rotation.y = -Math.PI;
    }
    //camera.position.x = board_x - 1000;
    //camera.position.z = group.position.z;
    //camera.rotation.y = -Math.PI;
}

function render() {

    var time = performance.now() * 0.001;

    if (pause_anim) return;

    animate_board(time);
    if (follow_board ) animate_camera(time);

    water.material.uniforms.time.value -= wavespeed / 60.0;
    board.position.z = 20*(wavespeed)* time;
    controls.update();
    water.render();
    renderer.render( scene, camera );

}