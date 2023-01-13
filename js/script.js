const cards = document.querySelectorAll('.cards');
var highScore = document.getElementById('highScore');
var player1ScoreHTML = document.getElementById('player1Score');
var player2ScoreHTML = document.getElementById('player2Score');
var turnText = document.getElementById('turntext');
var reset = document.getElementById('reset');
var highScoreHTML = document.getElementById('highScore');
var turnCountHTML = document.getElementById('tuncount');
var player1Score = 0
var player2Score = 0
var turn = true
let hasFlippedCard = false
let lockboard = false
let firstCard
let secondCard
var storageKey = 'scoreKey'
var count = 0

function highScoreDisplay() {
    highScoreHTML.innerHTML = `higscore: ${localStorage.getItem(storageKey)}`;
}
highScoreDisplay()

function turncount() {
    turnCountHTML.innerHTML = `turn: ${count}`
}
turncount()

function playerScore() {
    player1ScoreHTML.innerHTML = `score: ${player1Score}`
    player2ScoreHTML.innerHTML = `score: ${player2Score}`
}
playerScore()
turnText.innerHTML = `player 1 turn`;
function switchPlayer() {
    if (!turn) {
        player = 'player1'
        turnText.innerHTML = `player 1 turn`;
        turn = !turn
        count++
    } else {
        player = 'player2'
        turnText.innerHTML = `player 2 turn`;
        turn = !turn
        count++
    }
    turncount()
}

function flipCard() {
    if(lockboard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false
        secondCard = this
        checkForMatch();
    }

function checkForMatch() {
    let ismatch = firstCard.dataset.framework === secondCard.dataset.framework 
    /*Tjekker om de to kort har den samme data value*/

    ismatch ? correct() : wrong()
}

function correct() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    if (turn == true) {
        player1Score++
    }
    if (turn == false) {
        player2Score++
    }
    playerScore();
    highScoreCalculator();
    resetboard();
}

function wrong(){
    lockboard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        switchPlayer();
        resetboard();
    }, 1500);
}

function resetboard() {
    hasFlippedCard = false
    lockboard = false
    firstCard = null
    secondCard = null
}

function checkwin(){
    for(a = 0; a < cards.length; a++){
        if(cards[a].classList.contains('flip') == false){
            return false
         }
    }
    return true
}

function highScoreCalculator() {
    if (checkwin()) {
        if (player1Score > player2Score) {
            localStorage.setItem(storageKey, `sidste spil vandt spiler 1 med ${player1Score} stik med ${count} ture`)
        } else if (player1Score == player2Score) {
            localStorage.setItem(storageKey, `sidste Spil belv ufagjordt med ${player1Score} stik med ${count} ture`)
        } else {
            localStorage.setItem(storageKey, `sidste spil vandt spiler 2 med ${player2Score} stik med ${count} ture`)
        }
    }
    highScoreDisplay()
}

function shuffle(){
    cards.forEach(cards => {
        let randompos = Math.floor(Math.random() * 10);
        cards.style.order = randompos
    });
}
shuffle();

function click(){
    cards.forEach(cards => cards.addEventListener('click', flipCard));

}
click();

function playerReset() {
    turnText.innerHTML = `player 1 turn`;
    turn = true
}

reset.addEventListener('click', resetbutton)
function resetbutton() {
    count = 0
    player1Score = 0
    player2Score = 0
    flip = 0
    playerScore()
    playerReset();
    turncount();
    cards.forEach(cards => {
        cards.classList.remove('flip')
    });
    click();  
    setTimeout(() => {
    shuffle();
    },500);
}

/*
const cards = document.querySelectorAll('.cards');

let hasFlippedCard = false
let lockboard = false
let firstCard
let secondCard

function flipCard() {
    if(lockboard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false
        secondCard = this
        checkForMatch();
    }

function checkForMatch() {
    let ismatch = firstCard.dataset.framework === secondCard.dataset.framework 

    ismatch ? correct() : wrong()
}

function correct() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetcards()
}

function wrong(){
    lockboard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetcards()
    }, 1500);
}

function resetcards() {
    hasFlippedCard = false
    lockboard = false
    firstCard = null
    secondCard = null
}

function shuffle(){
    cards.forEach(cards => {
        let randompos = Math.floor(Math.random() * 10);
        cards.style.order = randompos
    });
}
shuffle()


cards.forEach(cards => cards.addEventListener('click', flipCard)); */
