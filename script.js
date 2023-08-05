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
        Gameboard.blocks.forEach(block => {
            let matchingPlay = Gameboard.array[Number(block.id)-1];
            block.textContent = matchingPlay;
        })
    };
    return {makeComputerPlay, renderPlays}
})()

Game.makeComputerPlay()

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
            // function delay(time) {
            //     return new Promise(resolve => setTimeout(resolve, time));
            // }
            // async function wait() {
            //     await delay(500);    
            //     Game.makeComputerPlay();
            // }
            // wait();
        }));
    };
    return {name, sign, makePlay}
};

let playerOne = playerFactory("Carlos", "X");
// playerOne.makePlay()