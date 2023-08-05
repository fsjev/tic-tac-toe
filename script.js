// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    // let occupiedBlocks = Array.from(blocks).filter(block => block.textContent !== "");
    const storePlay = (event) => {
        let play = {
            sign: event.target.textContent,
            playLocation: event.target.id
        };
        array.push(play);
        console.log(array);
    };
    let array = [];
    return {blocks, storePlay};
})()


const Game = (() => {
    let renderPlays = () => {
        Gameboard.blocks.forEach(block => {
            let matchingPlay = Gameboard.array[Number(block.id)-1];
            block.textContent = matchingPlay;
        })
    };
    return {renderPlays}
})()

// Game.renderPlays();


const playerFactory = (name, sign) => {
    const makePlay = () => {
        Gameboard.blocks.forEach(block => block.addEventListener("click", (e) => {
            block.textContent = sign;
            Gameboard.storePlay(e);
        }));
    };
    return {name, sign, makePlay}
};

let playerOne = playerFactory("Carlos", "X");
playerOne.makePlay()