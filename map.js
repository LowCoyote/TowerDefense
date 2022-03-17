import * as THREE from 'three';

export let map0_data = {
    "data" : [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    ]
};

export function loadMap(mapdata, scene){
    let size_Y = mapdata.data.length;
    let size_X = mapdata.data[0].length;

    const material = new THREE.MeshLambertMaterial({
        color : 0x58d777
    });
    const geometry = new THREE.BoxGeometry(2 ,2 ,2);
    let basic_cube = new THREE.Mesh(geometry, material);

    const road_material = new THREE.MeshLambertMaterial({
        color : 0x2c3e50
    });
    let road_cube = new THREE.Mesh(geometry, road_material);

    for(let x = 0 ; x < size_X ; x++)
    {
        for(let y = 0 ; y < size_Y ; y++)
        {
            const posix = (x*2) - (size_X/2)*2;
            const posy  = (y*2) - (size_Y/2)*2; //Z axis

            switch (mapdata.data[y][x]){
                case 0:
                    let bloc = basic_cube.clone();
                    bloc.position.set(posix, 0, posy);
                    scene.add(bloc);
                break;

                case 1:
                    let block = road_cube.clone();
                    block.scale.y = 0.8;
                    block.position.set(posix, -0.2, posy);
                    scene.add(block);
                break;
            }
        }
    }
}