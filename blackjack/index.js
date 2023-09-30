let pCards = []
let dCards = []
let pSum = 0
let dSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let playerEl = document.getElementById("player-el")
let pCardsEl = document.getElementById("playerCards-el")
let dCardsEl = document.getElementById("dealerCards-el")
let rounds = 0
let money = 100.00


function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if(message == "Do you want to draw a new card?") {
        if(pSum > dSum){
            money *= 1.75
        }else if (dSum > pSum){
            money *= (1/1.75)
        }
    }

    isAlive = true
    hasBlackJack = false
    rounds = 0

    pCards = [getRandomCard(), getRandomCard()]
    dCards = [getRandomCard(), getRandomCard()]

    pSum = pCards[0] + pCards[1]
    dSum = dCards[0] + dCards[1]
    renderGame()
}

function renderGame() {
    pCardsEl.textContent = "Cards: "
    dCardsEl.textContent = "Dealer Cards: "
    for (let i = 0; i < pCards.length; i++) {
        pCardsEl.textContent += pCards[i] + " "
    }
    for (let i = 0; i < dCards.length; i++) {
        dCardsEl.textContent += dCards[i] + " "
    }
    pCardsEl.textContent += '(' + pSum + ')'
    dCardsEl.textContent += '(' + dSum + ')'
    
    
    if (pSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (pSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        if(rounds === 0){
            money *= 2.5
        }else{
            money *= 2
        }
    } else {
        message = "You're out of the game!"
        isAlive = false
        money *= 0.5
    }

    while(dSum < 17){
        let newCard = getRandomCard()
        dCards.push(newCard)
        dSum += newCard
        dCardsEl.textContent = "Dealer Cards: "
        for (let i = 0; i < dCards.length; i++) {
            dCardsEl.textContent += dCards[i] + " "
        }
        dCardsEl.textContent += '(' + dSum + ')'        
    }

    if (dSum > 21) {
        message = "Dealer overflowed. You win!"
        isAlive = false
        money *= 2
    } else if(dSum === 21){
        message = "Dealer got 21. You lose!"
        isAlive = false
        money *= .5
    }

    messageEl.textContent = message
    playerEl.textContent = "Player: $" + money.toFixed(2)
    console.log(isAlive, hasBlackJack)
}


function newCard() {
    console.log(isAlive, hasBlackJack)
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        pSum += card
        pCards.push(card)
        renderGame()        
    }
}
