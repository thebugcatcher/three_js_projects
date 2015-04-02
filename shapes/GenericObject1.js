var GenericObject1 = function (top_rad, bottom_rad, height, num) {
    var geometry = new THREE.BufferGeometry();

    var vertexArr = new Float32Array(3*(2*num + 2));
    var angle = 0;
    var dAngle = 2 * Math.PI / num;
    for (var k = 0; k < num; k++) {
        vertexArr[3 * k] = top_rad * Math.cos(angle);
        vertexArr[3 * k + 1] = top_rad * Math.sin(angle);
        vertexArr[3 * k + 2] = height/2;
        angle += dAngle;
    }

    angle = 0;
    for (var k = 0; k < num; k++) {
        vertexArr[3 * k + num] = bottom_rad * Math.cos(angle);
        vertexArr[3 * k + num + 1] = bottom_rad * Math.sin(angle);
        vertexArr[3 * k + num + 2] = -height/2;
        angle += dAngle;
    }

    vertexArr[3* (2*num)] = 0;
    vertexArr[3 * (2*num) + 1] = 0;
    vertexArr[3 * (2*num) + 2] = height/2;

    vertexArr[3* (2*num+1)] = 0;
    vertexArr[3 * (2*num+1) + 1] = 0;
    vertexArr[3 * (2*num+1) + 2] = -height/2;
    geometry.addAttribute('position', new THREE.BufferAttribute(vertexArr, 3));

    /* similar to glNormalPointer */
    var normalArr = new Float32Array(vertexArr.length);
    angle = 0;
    var norm = new THREE.Vector3();
    for (var k = 0; k < num; k++) {
        norm.x = Math.cos(angle);
        norm.y = Math.sin(angle);
        norm.z = height/2;
        norm.normalize();
        normalArr[3 * k] = norm.x;
        normalArr[3 * k + 1] = norm.y;
        normalArr[3 * k + 2] = norm.z;
        angle += dAngle;
    }

    angle = 0;
    for (var k = 0; k < num; k++) {
        norm.x = Math.cos(angle);
        norm.y = Math.sin(angle);
        norm.z = -height/2;
        norm.normalize();
        normalArr[3 * k + num] = norm.x;
        normalArr[3 * k + num + 1] = norm.y;
        normalArr[3 * k + num + 2] = norm.z;
        angle += dAngle;
    }
    normalArr[3 *(2*num)] = 0;
    normalArr[3 * (2*num) + 1] = 0;
    normalArr[3 * (2*num) + 2] = 1;

    normalArr[3 *(2*num+1)] = 0;
    normalArr[3 * (2*num+1) + 1] = 0;
    normalArr[3 * (2*num+1) + 2] = 1;
    geometry.addAttribute('normal', new THREE.BufferAttribute(normalArr, 3));

    /* similar to glColorPointer */
    //var colorArr = new Float32Array(vertexArr.length);
    //var color = new THREE.Color;
    //for (var k = 0; k < Ndiv + 1; k++) {
    //    color.r = baseColor.r + Math.random() * 0.3;
    //    color.g = baseColor.g + Math.random() * 0.3;
    //    color.b = baseColor.b + Math.random() * 0.3;
    //    colorArr[3 * k] = color.r;
    //    colorArr[3 * k + 1] = color.g;
    //    colorArr[3 * k + 2] = color.b;
    //}
    //geometry.addAttribute('color', new THREE.BufferAttribute(colorArr, 3));

    var indexArr = new Uint32Array(Ndiv * 3);
    for (var k = 0; k < num; k++) {
        indexArr[2 * k] = k;
        indexArr[2 * k + 1] = k+num;
    }

    indexArr[2*num] = 0;
    indexArr[2*num + 1] = num;

    indexArr[2*num + 2] = 2*num;

    for (var k = 0; k < num + 3; k++){
        indexArr[2*num+2+k] = k;
    }

    indexArr [ 3*num +3] = 0;

    var count = 0;
    for (var k = num - 1; k > -1; k--){
        indexArr [count+3*num+3] = k+num;
        count ++;
    }
    indexArr[4*num+3] = 2*num-1;


    geometry.addAttribute('index', new THREE.BufferAttribute(indexArr, 1));

    geometry.computeBoundingSphere();
    return geometry;
}
