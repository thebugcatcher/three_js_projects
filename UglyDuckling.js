/**
 * Created by davidtanner on 4/8/15.
 */


UglyDuckling = function()
{

    var cover = THREE.ImageUtils.loadTexture("cheese.jpg");

    var top = new THREE.BoxGeometry(2,2,.5,15,30);
    var material = new THREE.MeshBasicMaterial( {color:0xd3d3d3, ambient:0xd3d3d3, map:cover});
    var body = new THREE.Mesh(top, material );

    body.rotateX(THREE.Math.degToRad(90));

    var topTip = new THREE.CylinderGeometry(1,1,.5,15,30);
    var material = new THREE.MeshBasicMaterial( {color:0xd3d3d3, ambient:0xd3d3d3, map:cover});
    var bodyTip = new THREE.Mesh(topTip, material );

    bodyTip.rotateY(THREE.Math.degToRad(90));
    bodyTip.position.set(-1,0,0);

    var topBack = new THREE.BoxGeometry(1.2,1.2,.5);
    var material = new THREE.MeshBasicMaterial( {color:0xd3d3d3, ambient:0xd3d3d3, map:cover});
    var bodyBack = new THREE.Mesh(topBack, material );

    bodyBack.rotateX(THREE.Math.degToRad(90));
    bodyBack.rotateZ(THREE.Math.degToRad(45));
    bodyBack.position.set(1,0,0);

    var pipe = new THREE.CylinderGeometry(.1,.1,8);
    var frameMat = new THREE.MeshBasicMaterial({color:0xd3d3d3});
    var axle = new THREE.Mesh (pipe, frameMat);
    axle.rotateX(THREE.Math.degToRad(90));
    axle.rotateZ(THREE.Math.degToRad(45));

    var axle2 = axle.clone();
    axle.rotateZ(THREE.Math.degToRad(90));

    var spot = new THREE.SpotLight('red', 5 );
    spot.position.set(-1, 1, 0);
    //scene.add( spot )

    var float_r = new THREE.CylinderGeometry(.5,.5,4);
    var floatMat = new THREE.MeshBasicMaterial({color:0xd3d3d3});
    var floatRight = new THREE.Mesh (float_r, floatMat);
    floatRight.rotateZ(THREE.Math.degToRad(90));
    floatRight.position.set(0,-0.5,-1);

    var floatLeft = floatRight.clone();
    floatLeft.position.set(0,-0.5,1);

    var floatGroup = new THREE.Group();
    floatGroup.add(floatRight);
    floatGroup.add(floatLeft);

    //var floatLeft = floatGroup.clone();


    var group = new THREE.Group();

    group.add(floatGroup);
    group.add(body);
    group.add(bodyTip);
    group.add(bodyBack);
    group.add(axle);
    group.add(axle2);

    group.add(spot);

    return group;


}
UglyDuckling.prototype = Object.create (THREE.Object3D.prototype);
UglyDuckling.prototype.constructor = UglyDuckling;
