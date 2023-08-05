// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    const storePlay = (event) => {
        let play = {
            sign: event.target.textContent,
            playLocation: event.target.id
        };
        array.push(play);
    };
    let array = [];
    return {blocks, storePlay};
})()


const Game = (() => {
    let makeComputerPlay = () => {
        let unoccupiedBlocks = Array.from(Gameboard.blocks).filter(block => block.textContent === "");
        let randomUnoccupiedBlock = unoccupiedBlocks[Math.floor(Math.random() * unoccupiedBlocks.length)];
        // randomUnoccupiedBlock.textContent = playerOne.sign === "X"? "O" : "X";
        randomUnoccupiedBlock.textContent = "O";
        console.log(randomUnoccupiedBlock);
    };
    let renderPlays = () => {
        Gameboard.blocks.forEach(block => {
            let matchingPlay = Gameboard.array[Number(block.id)-1];
            block.textContent = matchingPlay;
        })
    };
    return {makeComputerPlay, renderPlays}
})()

// Game.makeComputerPlay()

const playerFactory = (name, sign) => {
    const makePlay = () => {
        Gameboard.blocks.forEach(block => block.addEventListener("click", (e) => {
            block.textContent = sign;
            Gameboard.storePlay(e);
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