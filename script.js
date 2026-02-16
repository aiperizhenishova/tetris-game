document.addEventListener('DOMContentLoaded', () =>{

    const grid = document.querySelector('.grid');
    const squares = document.querySelectorAll('.grid div');
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0


    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1 ,width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetronomies = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];


    let currentPosition = 4;
    let currentRotaion = 0;

    // randomly selected a Tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetronomies.length)
    let current = theTetronomies[random] [currentRotaion];

    // drawing a tetromino
    function draw(){
        current.forEach(index =>{
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    // undraw a tetromino
    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    
    // make the tetromino move down every second
    let timerId = setInterval(movedown, 700)
    

    // assign functions to KeyCodes
    function control(e){
        if(e.keyCode === 37){
            moveLeft()
        }else if(e.keyCode === 38){
            rotate()
        }else if(e.keyCode === 39){
            moveRight()
        }else if (e.keyCode === 40){
            movedown()
        }
    }
    document.addEventListener('keyup', control)


    // move down function
    function movedown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }



    // freeze function 
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            // start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetronomies.length)
            current = theTetronomies[random][currentRotaion]
            currentPosition = 4
            draw()
            displayShape()
        }
    }


    // move the tetromino LEFT, unless is at the edge or there is a blockage
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1;
        }

        draw()
    }


    // move the tetromino RIGHT, unless is at the edge or there is a blockage
    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if(!isAtRightEdge) currentPosition += 1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1;
        }

        draw()
    }


    // rotate function 
    function rotate(){
        undraw()
        currentRotaion ++
        if(currentRotaion === current.length){
            currentRotaion = 0    // like if the current roation gets 4, make it go back to 0
        }
        current = theTetronomies[random][currentRotaion]

        draw()
    }



    // show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4     // width of mini-grid
    let displayIndex = 0
    


    const upNextTetromino = [
        [1, width+1, width*2+1, 2],   // lTetromino
        [width+1, width+2, width*2, width*2+1],  // zTetromino
        [1, width, width+1, width+2],   // tTetromino
        [0, 1, width, width+1],   // oTetromino
        [1, width+1, width*2+1, width*3+1]   // iTetromino
    ]



    // display the shape in the mini-grid display
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetromino[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    }


    // add functionality to the button
    StartBtn.addEventListener('click', () => {
        if(timerId){     // If timerId has a value (something inside it)
            clearInterval(timerId)
            timerId = null
        }else{
            draw()
            timerId = setInterval(movedown, 700)
            nextRandom = Math.floor(Math.random() * theTetronomies.length)
            displayShape()
        }
    })

    

})