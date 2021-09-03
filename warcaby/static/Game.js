class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.tileBoard = []
        this.tileSize = 20
        this.pawnBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]]
        this.pawnSize = 8
        this.playerColor
        this.number
        this.interval
        this.currentPlayer = "white"
        this.createBoard()
        this.createPlayBoard()
    }

    createBoard() {
        let x = -4 * 20 + 10
        let y = 4 * 20 - 10
        for (let i = 0; i < 8; i++) {

            let arr = new Array()
            for (let j = 0; j < 8; j++) {
                if (i % 2 == 0) {
                    if (j % 2 == 0) {
                        arr.push(this.createBlackTile(this.xPositionOnBoard(i), this.yPositionOnBoard(j)))
                    }
                    else {
                        arr.push(this.createWhiteTile(this.xPositionOnBoard(i), this.yPositionOnBoard(j)))
                    }
                }
                else {
                    if (j % 2 == 0) {
                        arr.push(this.createWhiteTile(this.xPositionOnBoard(i), this.yPositionOnBoard(j)))
                    }
                    else {
                        arr.push(this.createBlackTile(this.xPositionOnBoard(i), this.yPositionOnBoard(j)))
                    }
                }
                x += 20
            }
            x = -4 * 20 + 10
            this.tileBoard.push(arr)
            y -= 20
        }
    }
    createWhiteTile(x, y) {
        let scene = this.scene
        var geometry = new THREE.BoxGeometry(this.tileSize, 5, this.tileSize);
        let color = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('pictures/white.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
        })
        let cube = new THREE.Mesh(geometry, color);
        cube.name = "whiteTile"
        cube.position.set(x, 0, y)
        scene.add(cube)
        return (0)
    }
    createBlackTile(x, y) {
        let scene = this.scene
        var geometry = new THREE.BoxGeometry(this.tileSize, 5, this.tileSize);
        let color = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('pictures/black.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
        })
        let cube = new THREE.Mesh(geometry, color);
        cube.name = "blackTile"
        cube.position.set(x, 0, y)
        scene.add(cube)
        return (1)
    }

    createPlayBoard() {
        $("#board").append(this.renderer.domElement);
        this.renderer.setClearColor(0xd3d3d3);
        let renderer = this.renderer;
        let scene = this.scene
        let camera = this.camera
        camera.position.set(0, 100, 160);
        camera.lookAt(scene.position)
        document.body.onresize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        function render() {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();
    }

    generatePawns(color) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (j < 2) {
                    if (this.tileBoard[i][j] == 1) {
                        this.pawnBoard[i][j] = this.createWhitePawn(this.xPositionOnBoard(i), this.yPositionOnBoard(j))
                    }

                }
                else if (j > 5) {
                    if (this.tileBoard[i][j] == 1) {
                        this.pawnBoard[i][j] = this.createBlackPawn(this.xPositionOnBoard(i), this.yPositionOnBoard(j))
                    }
                }

            }
        }
        this.playerColor = color
        if (this.playerColor == "black") {
            this.camera.position.set(0, 100, -160)
            this.camera.lookAt(this.scene.position)
        }
        
        this.interval = setInterval(net.play, 1000);
        
        
        setInterval(() => {
            //net.checkPlayer()
            net.pawn()
        }, 2000);

    }

    checkIfPlay(play){
        if(JSON.parse(play)){
            document.getElementById("wait").style.display = "none"
            window.clearInterval(this.interval)
            this.movePawn()
        }
        else{
            document.getElementById("wait").style.display = "block"
        }
    }

    changePlayer(player) {
        this.currentPlayer = player
    }

   // changeBoard(board) {
    //    console.log(board)
    //    this.pawnBoard = board
    //}

    createWhitePawn(x, y) {
        let scene = this.scene
        var geometry = new THREE.CylinderGeometry(this.pawnSize, this.pawnSize, 5, 32)
        let color = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('pictures/white.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
        })
        let pawn = new THREE.Mesh(geometry, color);
        pawn.position.set(x, 5, y)
        pawn.name = "whitePawn"
        scene.add(pawn)
        return 1
    }

    createBlackPawn(x, y) {
        let scene = this.scene
        var geometry = new THREE.CylinderGeometry(this.pawnSize, this.pawnSize, 5, 32)
        let color = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('pictures/black.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
        })
        let pawn = new THREE.Mesh(geometry, color)
        pawn.position.set(x, 5, y)
        pawn.name = "blackPawn"
        scene.add(pawn)
        return 2
    }

    movePawn() {
        let raycaster = new THREE.Raycaster()
        let mouseVector = new THREE.Vector2()
        let camera = this.camera
        let scene = this.scene
        let selectedObject
        let selectedPawn
        if (this.playerColor == "white") { this.number = 1 }
        else { this.number = 2 }
        $(document).mousedown((event) => {
            mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);
            let intersects = raycaster.intersectObjects(scene.children, true);
            if (this.playerColor == this.currentPlayer) {
                if (intersects.length > 0) {
                    selectedObject = intersects[0].object

                    if (selectedObject.name == this.playerColor + "Pawn") {
                        if (selectedPawn != undefined) {
                            selectedPawn.material = new THREE.MeshBasicMaterial({
                                map: new THREE.TextureLoader().load('pictures/' + this.playerColor + '.jpg'),
                                side: THREE.DoubleSide,
                                transparent: true,
                            })
                        }
                        selectedPawn = intersects[0].object
                        selectedPawn.material = new THREE.MeshBasicMaterial({
                            map: new THREE.TextureLoader().load('pictures/red.jpg'),
                            side: THREE.DoubleSide,
                            transparent: true,
                        })

                    }
                    else if (selectedObject.name == "blackTile") {
                        if (selectedPawn != undefined) {
                            if ((this.xPositionOnArray(selectedPawn.position.x) == (this.xPositionOnArray(selectedObject.position.x)) ||
                                this.xPositionOnArray(selectedPawn.position.x) + 1 == (this.xPositionOnArray(selectedObject.position.x)) ||
                                this.xPositionOnArray(selectedPawn.position.x) - 1 == (this.xPositionOnArray(selectedObject.position.x))) && (
                                    this.yPositionOnArray(selectedPawn.position.z) == (this.yPositionOnArray(selectedObject.position.z)) ||
                                    this.yPositionOnArray(selectedPawn.position.z) + 1 == (this.yPositionOnArray(selectedObject.position.z)) ||
                                    this.yPositionOnArray(selectedPawn.position.z) - 1 == (this.yPositionOnArray(selectedObject.position.z)))) {

                                if (this.pawnBoard[this.xPositionOnArray(selectedObject.position.x)][this.yPositionOnArray(selectedObject.position.z)] == 0) {
                                    
                                    this.pawnBoard[this.xPositionOnArray(selectedPawn.position.x)][this.yPositionOnArray(selectedPawn.position.z)] = 0
                                    this.pawnBoard[this.xPositionOnArray(selectedObject.position.x)][this.yPositionOnArray(selectedObject.position.z)] = this.number
                                    selectedPawn.position.x = selectedObject.position.x
                                    selectedPawn.position.z = selectedObject.position.z
                                    this.checkId({id:selectedPawn.id,x:selectedPawn.position.x,y:selectedPawn.position.z})
                                    
                                    //net.move(JSON.stringify(selectedPawn))
                                    selectedPawn.material = new THREE.MeshBasicMaterial({
                                        map: new THREE.TextureLoader().load('pictures/' + this.playerColor + '.jpg'),
                                        side: THREE.DoubleSide,
                                        transparent: true,
                                    })
                                    //net.sendBoard(JSON.stringify(this.pawnBoard))
                                    //net.checkPlayer()
                                }

                            }
                        }
                    }

                }

            }
        })

    }

    checkId(obj){
        net.move(JSON.stringify(obj))
    }

    opponentMove(obj){
        let data = JSON.parse(obj)
        let scene = this.scene
        let objToMove = scene.getObjectById( data.id, true )
        objToMove.position.x = data.x
        objToMove.position.z = data.y
        if(objToMove.position.x==data.x&&objToMove.position.z==data.y){
            let pawnNumber
        this.pawnBoard[this.xPositionOnArray(objToMove.position.x)][this.yPositionOnArray(objToMove.position.z)] = 0
        if(objToMove.name=="whitePawn"){
            pawnNumber = 1
            this.currentPlayer = "black"
        }
        else if(objToMove.name=="blackPawn"){
            this.currentPlayer = "white"
            pawnNumber=2
        }
        this.pawnBoard[this.xPositionOnArray(data.x)][this.yPositionOnArray(data.y)] = pawnNumber}
    }

    xPositionOnArray(x) {
        return (Math.abs((-90 - x) / 20) - 1)
    }

    yPositionOnArray(y) {
        return (Math.abs((-90 + y) / 20) - 1)
    }

    xPositionOnBoard(x) {
        return (-70 + x * 20)
    }
    yPositionOnBoard(y) {
        return (70 - y * 20)
    }
}
