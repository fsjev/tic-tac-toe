// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    let array = [];
    return {blocks, array};
})()

const Game = (() => {
    const makeComputerPlay = () => {
        let unoccupiedBlocks = Array.from(Gameboard.blocks).filter(block => block.textContent === "");
        let randomUnoccupiedBlock = unoccupiedBlocks[Math.floor(Math.random() * unoccupiedBlocks.length)];
        // randomUnoccupiedBlock.textContent = playerOne.sign === "X"? "O" : "X";
        randomUnoccupiedBlock.textContent = "O";
        let play = {
            sign: randomUnoccupiedBlock.textContent,
            playLocation: randomUnoccupiedBlock.id
        };
        Gameboard.array.push(play);
        console.log(Gameboard.array);
    };
    let renderPlays = () => {
        Gameboard.array.forEach(play => {
            let location = play.playLocation;
            let matchingBlock = Array.from(Gameboard.blocks).find(block => block.id === location);
            matchingBlock.textContent = play.sign;
        });
    };
    return {makeComputerPlay, renderPlays}
})()

Game.renderPlays()

const playerFactory = (name, sign) => {
    const makePlay = () => {
        Gameboard.blocks.forEach(block => block.addEventListener("click", (e) => {
            block.textContent = sign;
            let play = {
                sign: e.target.textContent,
                playLocation: e.target.id
            };
            Gameboard.array.push(play);
            console.log(Gameboard.array);
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
            }
            async function wait() {
                await delay(500);
                Game.makeComputerPlay();
            }
            wait();
        }));
    };
    return {name, sign, makePlay}
};

let playerOne = playerFactory("Carlos", "X");
playerOne.makePlay()


// let playOne = {sign: 'X', playLocation: '1'}

// let playTwo = {sign: 'O', playLocation: '8'}

// let playThree = {sign: 'X', playLocation: '2'}

// let playFour = {sign: 'O', playLocation: '4'}

// let playFive = {sign: 'X', playLocation: '3'}

// let playSix = {sign: 'O', playLocation: '7'}

// let test = []

// test.push(playOne)
// test.push(playTwo)
// test.push(playThree)
// test.push(playFour)
// test.push(playFive)
// test.push(playSix)
// // console.log(test);