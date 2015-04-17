Goku = function(scene, hex_scale,loader){
    var group = new THREE.Group();
    //var goku_tex = THREE.ImageUtils.loadTexture("textures/hex.jpg");
    var material_x =new THREE.MeshPhongMaterial(
        {color:0xfefefefe, ambient:0x1d6438}
    );
    loader.load('jsons/goku_part1.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });

    loader.load('jsons/goku_part2.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });

    loader.load('jsons/goku_part3.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part4.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part5.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part6.json', function (geometry) {


        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part7.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part8.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part9.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part10.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    loader.load('jsons/goku_part11.json', function (geometry) {

        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );


        mesh.scale.set(hex_scale, hex_scale, hex_scale);

        group.add(mesh);
    });
    // loader.load('jsons/goku_part12.json', function (geometry) {

    //     // create a mesh with models geometry and material
    //     var mesh = new THREE.Mesh(
    //         geometry,
    //         material_x
    //     );


    //     mesh.scale.set(hex_scale, hex_scale, hex_scale);

    //     group.add(mesh);
    // });
    return group;
}
