HexCopter = function(scene, hex_scale,loader){
    var group = new THREE.Group();
    var hex_tex = THREE.ImageUtils.loadTexture("textures/hex.jpg");
    var material_x =new THREE.MeshPhongMaterial(
        {color:0xfefefefe, ambient:0x1d6438, map:hex_tex}
    );
    loader.load('jsons/hexacopter1.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });

    loader.load('jsons/hexacopter2.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });

    loader.load('jsons/hexacopter3.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter4.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter5.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter6.json', function (geometry) {


        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter7.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter8.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter9.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter10.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/hexacopter11.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    return group;
}