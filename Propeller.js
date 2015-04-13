Propeller = function (scene, prop_scale, loader) {
    var group = new THREE.Group();
    var x = 0;
    var y = 0;
    var z = 60;
    var prop_tex = THREE.ImageUtils.loadTexture("textures/rotor_metal.jpg");
    var material_x =new THREE.MeshPhongMaterial(
        {color:0xfefefefe, ambient:0x1d6438, map:prop_tex}
    );
    loader.load('jsons/super_propeller1.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller2.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller3.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller4.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );

        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller5.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller6.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller7.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller8.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;

        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });

    loader.load('jsons/super_propeller9.json', function (geometry) {
        // create a mesh with models geometry and material
        var mesh = new THREE.Mesh(
            geometry,
            material_x
        );
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.scale.set(prop_scale, prop_scale, prop_scale);

        group.add(mesh);
    });
    return group;
}