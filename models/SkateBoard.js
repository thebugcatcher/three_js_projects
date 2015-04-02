
SkateBoard = function() {
    var LENGTH = 5;
    var base = new THREE.BoxGeometry(10,5,2);

    var wheelgeo = new THREE.CylinderGeometry(0.1, 0.1, 0.1);
    var wheelMat = new THREE.MeshPhongMaterial({color: 0x848484});
    var wheels = new THREE.Mesh (wheelgeo, wheelMat);
    var board_group = new THREE.Group();

    board_group.add (base);

    //var s = wheels.clone();
    //
    //s.rotateZ(Math.PI/2);
    //s.translate
    //
    //var dAng = 2 * Math.PI / NUM_SPOKES;
    //for (var k = 0; k < NUM_SPOKES; k++) {
    //    var s = spoke.clone();
    //    s.rotateZ(k * dAng);
    //    s.translateY(1.75);
    //    wheel_group.add (s);
    //}
    return board_group;
}

SkateBoard.prototype = Object.create (THREE.Object3D.prototype);
SkateBoard.prototype.constructor = SkateBoard;