// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    let array = [];
    return {blocks, array};
})()

let playOne = {sign: 'X', playLocation: '5'}

let playTwo = {sign: 'O', playLocation: '9'}

let playThree = {sign: 'X', playLocation: '4'}

let playFour = {sign: 'O', playLocation: '7'}

let playFive = {sign: 'X', playLocation: '2'}

let playSix = {sign: 'O', playLocation: '1'}

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
                let acrosscheck = Array.from(Gameboard.blocks).filter(block => block.id > "1" && block.id < "4")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let downCheck = Array.from(Gameboard.blocks).filter(block => block.id === "4" || block.id === "7")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let diagCheck = Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "9")
                .every(nextBlock => nextBlock.textContent === block.textContent);
                

            }else if(block.id === "3"){
                let acrosscheck = Array.from(Gameboard.blocks).filter(block => block.id < "3" && block.id >= "1")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let downCheck = Array.from(Gameboard.blocks).filter(block => block.id === "6" || block.id === "9")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let diagCheck = Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "7")
                .every(nextBlock => nextBlock.textContent === block.textContent);
                
            }else if(block.id === "7"){
                let acrosscheck = Array.from(Gameboard.blocks).filter(block => block.id > "7" && block.id <= "9")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let upCheck = Array.from(Gameboard.blocks).filter(block => block.id === "6" || block.id === "1")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                // let diagCheck = Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "3")
                // .every(nextBlock => nextBlock.textContent === block.textContent);
                   
            }else if(block.id === "9"){
                let acrosscheck = Array.from(Gameboard.blocks).filter(block => block.id < "8" && block.id > "6")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let upCheck = Array.from(Gameboard.blocks).filter(block => block.id === "6" || block.id === "3")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                // let diagCheck = Array.from(Gameboard.blocks).filter(block => block.id === "5" || block.id === "1")
                // .every(nextBlock => nextBlock.textContent === block.textContent);

            }else if(block.id === "5"){
                let columnCheck = Array.from(Gameboard.blocks).filter(block => block.id === "2" || block.id === "8")
                .every(nextBlock => nextBlock.textContent === block.textContent);

                let rowCheck = Array.from(Gameboard.blocks).filter(block => block.id === "4" || block.id === "6")
                .every(nextBlock => nextBlock.textContent === block.textContent);
                console.log(rowCheck, block.textContent);

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

