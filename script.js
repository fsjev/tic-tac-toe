// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    let array = [];
    const form = document.querySelector("form");
    const overlay = document.getElementById("form-overlay");
    const prompts = document.querySelector(".prompts");
    return {blocks, array, form, overlay, prompts};
})()


let playOne = {sign: 'X', playLocation: '6'}

let playTwo = {sign: 'O', playLocation: '1'}

let playThree = {sign: 'X', playLocation: '4'}

let playFour = {sign: 'O', playLocation: '5'}

let playFive = {sign: 'X', playLocation: '7'}

let playSix = {sign: 'O', playLocation: '9'}

let test = [];
Gameboard.array.push(playTwo)
test.push(playOne)
test.push(playTwo)
test.push(playThree)
test.push(playFour)
test.push(playFive)
test.push(playSix)

const Game = (() => {
    let win = false;
    const makeComputerPlay = (sign) => {
        Gameboard.prompts.innerHTML = `<span>Computer</span>'s turn`;
        Gameboard.prompts.style.backgroundColor = "rgba(0, 0, 0, 0.144)";
        let unoccupiedBlocks = Array.from(Gameboard.blocks).filter(block => block.textContent === "");
        let randomUnoccupiedBlock = unoccupiedBlocks[Math.floor(Math.random() * unoccupiedBlocks.length)];
        randomUnoccupiedBlock.textContent = sign === "X"? "O" : "X";
        // randomUnoccupiedBlock.textContent = "O";
        let play = {
            sign: randomUnoccupiedBlock.textContent,
            playLocation: randomUnoccupiedBlock.id
        };
        Gameboard.array.push(play);
        console.log(Gameboard.array);
    };

    const renderPlays = () => {
        Gameboard.array.forEach(play => {
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
                // if(check[dir].win) console.log(check[dir].blockGroup, block.textContent);
                for(let dir in check){
                    if(check[dir].win){
                        win = true;
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                        return block.textContent
                    }
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
                    if(check[dir].win){
                        win = true;
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                        return block.textContent
                    }
                };
            
            }else if(block.id === "7"){
                // bottom left corner block
                const check = {
                    across: {
                        win: Array.from(Gameboard.blocks).filter(block => block.id > "7" && block.id <= "9")
                        .every(nextBlock => nextBlock.textContent === block.textContent && nextBlock.textContent !== ""),
                        blockGroup: Array.from(Gameboard.blocks)
                        .filter(block => block.id > "7" && block.id <= "9" || block.id === "7")
                    }
                };
                for(let dir in check){
                    if(check[dir].win){
                        win = true;
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                        return block.textContent
                    }
                };

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
                    if(check[dir].win){
                        win = true;
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                        return block.textContent
                    }
                };
            }
        });
    };
    const processForm = (e) => {
        e.preventDefault();
        let playerName = document.getElementById("name").value
        const difficultyChoice = {
            easy: document.getElementById("easy"),
            lessEasy: document.getElementById("less-easy")
        };
        
        const signChoice = {
            X: document.getElementById("X"),
            O: document.getElementById("O")
        };

        for(let letter in signChoice){
            if(signChoice[letter].checked){
                var sign = letter;
            }
        };

        for(let diff in difficultyChoice){
            if(difficultyChoice[diff].checked){
                var difficulty = diff;
            }
        };

        hideForm();
        runGame(playerName, sign, difficulty);

    };
    const hideForm = () => {
        Gameboard.form.setAttribute("class", "hide");
        Gameboard.overlay.setAttribute("class", "hide");
    };
    const showForm = () => {
        Gameboard.form.setAttribute("class", "show");
        Gameboard.overlay.setAttribute("class", "show");
    };
    const runGame = (playerName, sign, gameDifficulty) => {
        let playerOne = playerFactory(playerName, sign);
        // while(win === false){

        // }
        playerOne.makePlay();
        // Game.checkForWin();
        // makeComputerPlay(sign);
        // renderPlays();
    };
    return {processForm, showForm, renderPlays}
})()

Gameboard.form.addEventListener("submit", Game.processForm);
// window.addEventListener("load", Game.showForm);

Game.renderPlays();

const playerFactory = (name, sign) => {
    const makePlay = () => {
        Gameboard.prompts.innerHTML = `<span>${name}</span>'s turn`;
        Gameboard.prompts.style.backgroundColor = "rgba(0, 224, 30, 0.329)";
        Gameboard.blocks.forEach(block => block.addEventListener("click", (e) => {
            if(block.textContent !== ""){
                Gameboard.prompts.textContent = `Can't play there!`;
                Gameboard.prompts.style.backgroundColor = "rgba(255, 56, 49, 0.589)";
                function delay(time){
                    return new Promise(resolve => setTimeout(resolve, time));
                }
                  
                async function wait() {
                    await delay(1000);
                    Gameboard.prompts.innerHTML = `<span>${name}</span>'s turn`;
                    Gameboard.prompts.style.backgroundColor = "rgba(0, 224, 30, 0.329)";
                }
                  
                wait();
            }else{
                let play = {
                    sign: sign,
                    playLocation: e.target.id
                };
                Gameboard.array.push(play);
                console.log(Gameboard.array);
                Game.renderPlays();
            };
        }));
    };
    return {name, sign, makePlay}
};


let playerOne = playerFactory("Link", "X");
playerOne.makePlay();
