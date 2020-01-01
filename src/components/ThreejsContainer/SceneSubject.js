import * as THREE from 'three'

export default scene => {
    //const group = new THREE.Group();

    const subjectGeometry = new THREE.BoxGeometry( 5, 5, 5 );

    const subjectMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

    // const subjectWireframe = new THREE.LineSegments(
    //     new THREE.EdgesGeometry(subjectGeometry),
    //     new THREE.LineBasicMaterial()
    // );

    //group.add(subjectMesh);
    //group.add(subjectWireframe);
    //scene.add(group);

    //group.rotation.z = Math.PI/4;

    scene.add(subjectMesh);

    const speed = 0.02;
    const textureOffsetSpeed = 0.02;

    function deformGeometry(geometry) {
        for (let i=0; i<geometry.vertices.length; i+=2) {
            const scalar = 1 + Math.random()*0.8;
            geometry.vertices[i].multiplyScalar(scalar)
        }

        return geometry;
    }

    function update(time) {
        // const angle = time*speed;
        //
        // group.rotation.y = angle;
        //
        // subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;
        //
        // subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );
        //
        // const scale = (Math.sin(angle*8)+6.4)/5;
        // subjectWireframe.scale.set(scale, scale, scale)

        subjectMesh.rotation.x += 0.01;
        subjectMesh.rotation.y += 0.01;
    }

    return {
        update
    }
}