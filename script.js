// Module Pattern
const Gameboard = (() => {
    const _grid = document.querySelector(".grid");
    const _gridCells = document.querySelectorAll(".grid div");
    let _gameboardArray = [];
    return {
        grid: _grid,
        blocks: _gridCells,
        array: _gameboardArray
    };
})()

Gameboard.array.push("X");
Gameboard.array.push("O");
Gameboard.array.push("X");
Gameboard.array.push("O");
Gameboard.array.push("O");
Gameboard.array.push("X");
Gameboard.array.push("X");
Gameboard.array.push("O");
Gameboard.array.push("X");


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
        Gameboard.blocks.forEach(block => block.addEventListener("click", () => {
            block.textContent = sign;
        }));
    };
    return {name, sign, makePlay};
};

let playerOne = playerFactory("Carlos", "X");
playerOne.makePlay()

