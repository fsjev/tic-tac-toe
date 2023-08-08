// Module Pattern
const Gameboard = (() => {
    const blocks = document.querySelectorAll(".grid div");
    let array = [];
    const form = document.querySelector("form");
    const overlay = document.getElementById("form-overlay");
    const prompts = document.querySelector(".prompts");
    const banner = document.getElementById("win-banner");
    const restartBtn = document.getElementById("restart");
    return {blocks, array, form, overlay, prompts, banner, restartBtn};
})()


// let playOne = {sign: 'X', playLocation: '1'}

// let playTwo = {sign: 'O', playLocation: '6'}

// let playThree = {sign: 'X', playLocation: '4'}

// let playFour = {sign: 'O', playLocation: '3'}

// let playFive = {sign: 'X', playLocation: '7'}

// let playSix = {sign: 'O', playLocation: '9'}

// let test = [];
// Gameboard.array.push(playTwo)
// Gameboard.array.push(playFour)
// Gameboard.array.push(playSix)
// Gameboard.array.push(playFive)

// test.push(playOne)
// test.push(playTwo)
// test.push(playThree)
// test.push(playFour)
// test.push(playFive)
// test.push(playSix)

const Game = (() => {
    let gameWon = false;
    let winnerSign;
    const makeComputerPlay = (name, sign) => {
        Gameboard.prompts.innerHTML = `<span>Computer</span>'s turn`;
        Gameboard.prompts.style.backgroundColor = "rgba(0, 0, 0, 0.144)";
        function delay(time){
            return new Promise(resolve => setTimeout(resolve, time));
        };
    
        async function wait(){
            await delay(1000);
            let unoccupiedBlocks = Array.from(Gameboard.blocks).filter(block => block.textContent === "");
            let randomUnoccupiedBlock = unoccupiedBlocks[Math.floor(Math.random() * unoccupiedBlocks.length)];
            let compSign = sign === "X"? "O" : "X";
            let play = {
                sign: compSign,
                playLocation: randomUnoccupiedBlock.id
            };
            Gameboard.array.push(play);
            renderPlays();
            Game.checkForWin();
            Gameboard.prompts.innerHTML = `<span>${name}</span>'s turn`;
            Gameboard.prompts.style.backgroundColor = "rgba(0, 224, 30, 0.329)";
        };
        wait();
    };

    const renderPlays = () => {
        if(gameWon === false){
            Gameboard.array.forEach(play => {
                let location = play.playLocation;
                let matchingBlock = Array.from(Gameboard.blocks).find(block => block.id === location);
                matchingBlock.textContent = play.sign;
            });
        };
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
                    if(check[dir].win){
                        gameWon = true;
                        winnerSign = block.textContent;
                        Gameboard.prompts.style.visibility = "hidden";
                        displayGameResult(winnerSign);
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                    };
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
                        gameWon = true;
                        winnerSign = block.textContent;
                        Gameboard.prompts.style.visibility = "hidden";
                        displayGameResult(winnerSign);
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                    };
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
                        gameWon = true;
                        winnerSign = block.textContent;
                        Gameboard.prompts.style.visibility = "hidden";
                        displayGameResult(winnerSign);
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                    };
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
                        gameWon = true;
                        winnerSign = block.textContent;
                        Gameboard.prompts.style.visibility = "hidden";
                        displayGameResult(winnerSign);
                        for(let block of check[dir].blockGroup){
                            block.setAttribute("class", "win");
                        };
                    };
                };
            }
        });
        // console.log(gameWon);
        // console.log(winnerSign);
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

        playerOne.makePlay(makeComputerPlay);
    };
    const displayGameResult = (sign) => {
        let playerOneSign = Gameboard.array.find(play => Gameboard.array.indexOf(play) === 0).sign;
        Gameboard.overlay.setAttribute("class", "show");
        Gameboard.banner.setAttribute("class", "show");
        if(playerOneSign === sign){
            Gameboard.banner.textContent = "You Won!";
            Gameboard.banner.style.backgroundColor = "rgba(0, 224, 30, 3.329)";
        }else{
            Gameboard.banner.textContent = "You Lost!";
            Gameboard.banner.style.backgroundColor = "rgba(255, 56, 49, 3.589)";
        };
        Gameboard.restartBtn.setAttribute("class", "banner");

    };
    return {processForm, showForm, renderPlays, runGame, checkForWin}
})()

window.addEventListener("load", Game.showForm);
Gameboard.form.addEventListener("submit", Game.processForm);
// Gameboard.restartBtn.addEventListener("click", )

const playerFactory = (name, sign) => {
    const makePlay = (compPlay) => {
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
                    await delay(500);
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
                Game.renderPlays();
                compPlay(name, sign);
                Gameboard.restartBtn.setAttribute("class", "show");
            };
        }));
    };
    return {name, sign, makePlay}
};