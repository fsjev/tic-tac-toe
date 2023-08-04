// Module Pattern
const Gameboard = (() => {
    const _grid = document.querySelector(".grid");
    return {
        prop: _grid
    };
})()

const GameboardBlocks = (() => {
    const _gridCells = document.querySelectorAll(".grid div");
    return {
        prop: _gridCells
    };
})()

const GameboardObjects = (() => {
    let _gameboardArray = [];
    return {
        prop: _gameboardArray
    };
})()

GameboardObjects.prop.push("X");
GameboardObjects.prop.push("O");
GameboardObjects.prop.push("X");
GameboardObjects.prop.push("O");
GameboardObjects.prop.push("O");
GameboardObjects.prop.push("X");
GameboardObjects.prop.push("X");
GameboardObjects.prop.push("O");
GameboardObjects.prop.push("X");


const UpdateGameboard = (() => {
    let renderPlays = () => {
        GameboardBlocks.prop.forEach(block => {
            let matchingPlay = GameboardObjects.prop[Number(block.id)-1];
            block.textContent = matchingPlay;
        })
    };
    return { renderPlays }
})()

UpdateGameboard.renderPlays();



