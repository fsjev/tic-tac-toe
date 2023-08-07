// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    let array = [];
    return {blocks, array};
})()

let playOne = {sign: 'X', playLocation: '4'}

let playTwo = {sign: 'O', playLocation: '9'}

let playThree = {sign: 'X', playLocation: '5'}

let playFour = {sign: 'O', playLocation: '2'}

let playFive = {sign: 'X', playLocation: '6'}

let playSix = {sign: 'O', playLocation: '3'}

let test = [];

test.push(playOne)
test.push(playTwo)
test.push(playThree)
test.push(playFour)
test.push(playFive)
test.push(playSix)

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
    const renderPlays = () => {
        test.forEach(play => {
            let location = play.playLocation;
            let matchingBlock = Array.from(Gameboard.blocks).find(block => block.id === location);
            matchingBlock.textContent = play.sign;
        });
    };

    const checkForWin = () => {
        Gameboard.blocks.forEach(block => {
            if(block.id === "1"){
                // top left corner block
                const check = {
                    across: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id > "1" && block.id < "4")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id > "1" && block.id < "4" || block.id === "1")
                    },
                    down: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "4" || block.id === "7")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "4" || block.id === "7" || block.id === "1")
                    },
                    diag: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "9")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "5" || block.id === "9" || block.id === "1")
                    }
                };
                for(let dir in check){
                    if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                };

            }else if(block.id === "3"){
                // top right corner block
                const check = {
                    down: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "6" || block.id === "9")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "6" || block.id === "9" || block.id === "3")
                    },
                    diag: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "7")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "5" || block.id === "7" || block.id === "3")
                    }
                };
                for(let dir in check){
                    if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                };
            
            }else if(block.id === "7"){
                // bottom left corner block
                const check = {
                    across: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id > "7" && block.id <= "9")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id > "7" && block.id <= "9" || block.id === "7")
                    },
                    // up: {
                    //     win: Array.from(Gameboard.blocks).filter(block => block.id === "1" || block.id === "4")
                    //     .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                    //     blockGroup: Array.from(Gameboard.blocks)
                    //     .filter(block => block.id === "1" || block.id === "4" || block.id === "7")
                    // }
                };
                for(let dir in check){
                    if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                };
     
            }else if(block.id === "9"){
                // bottom right corner block
                // const check = {
                //     across: {
                //         win: Array.from(Gameboard.blocks).filter(block => block.id > "6" && block.id < "9")
                //         .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                //         blockGroup: Array.from(Gameboard.blocks)
                //         .filter(block => block.id > "6" && block.id < "9" || block.id === "9")
                //     },
                //     // up: {
                //     //     win: Array.from(Gameboard.blocks).filter(block => block.id === "6" || block.id === "3")
                //     //     .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                //     //     blockGroup: Array.from(Gameboard.blocks)
                //     //     .filter(block => block.id === "6" || block.id === "3" || block.id === "9")
                //     // }
                // };
                // for(let dir in check){
                //     if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                // };

            }else if(block.id === "5"){
                // middle block
                const check = {
                    column: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "2" || block.id === "8")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "2" || block.id === "8" || block.id === "5")
                    },
                    row: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id === "4" || block.id === "6")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id === "4" || block.id === "6" || block.id === "5")
                    }
                };
                for(let dir in check){
                    if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                };
            }
        });
    };
    return {makeComputerPlay, renderPlays, checkForWin}
})()

Game.renderPlays()
Game.checkForWin()


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

