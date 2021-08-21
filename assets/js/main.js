let board = document.getElementById('board')
let cards = []
let cardsFlipped = 0
let firstCard
let firstCardOverlay
let secondCard
let secondCardOverlay
let pairsFound = 0
let tries = 0
let zIndex = 10

function shuffleCards() {
    // add card elements to cards array
    for (let i = 1; i < 17; i++) {
        cards.push(document.getElementById(i))
    }
    // shuffle cards array
    cards.sort((a, b) => 0.5 - Math.random())
    // set random images to card pairs
    let random = getRandomIntInclusive(1, 9999)
    console.log(random)
    cards[0].style.background = cards[1].style.background = 'url(https://picsum.photos/seed/' + random * 1 + '/500) center/cover no-repeat'
    cards[2].style.background = cards[3].style.background = 'url(https://picsum.photos/seed/' + random * 2 + '/500) center/cover no-repeat'
    cards[4].style.background = cards[5].style.background = 'url(https://picsum.photos/seed/' + random * 3 + '/500) center/cover no-repeat'
    cards[6].style.background = cards[7].style.background = 'url(https://picsum.photos/seed/' + random * 4 + '/500) center/cover no-repeat'
    cards[8].style.background = cards[9].style.background = 'url(https://picsum.photos/seed/' + random * 5 + '/500) center/cover no-repeat'
    cards[10].style.background = cards[11].style.background = 'url(https://picsum.photos/seed/' + random * 6 + '/500) center/cover no-repeat'
    cards[12].style.background = cards[13].style.background = 'url(https://picsum.photos/seed/' + random * 7 + '/500) center/cover no-repeat'
    cards[14].style.background = cards[15].style.background = 'url(https://picsum.photos/seed/' + random * 8 + '/500) center/cover no-repeat'
}

function flipCard(id) {
    let card = document.getElementById(id)
    let cardOverlay = card.firstElementChild
    if (card != firstCard && card != secondCard) {
        // flip card and track number of cards already flipped
        card.style.transform = 'rotateY(0)'
        cardOverlay.style.background = 'linear-gradient(to top left, var(--cardBacksideTransp), var(--cardBacksideTransp) 20%, var(--cardBackside2Transp) 20%, var(--cardBackside2Transp) 40%, var(--cardBacksideTransp) 40%, var(--cardBacksideTransp) 60%, var(--cardBackside2Transp) 60%, var(--cardBackside2Transp) 80%, var(--cardBacksideTransp) 80%, var(--cardBacksideTransp) 100%)'
        cardsFlipped++
        // store first and second flipped card
        switch (cardsFlipped) {
            case 1:
                firstCard = card
                firstCardOverlay = cardOverlay
                break;
            case 2:
                secondCard = card
                secondCardOverlay = cardOverlay
                tries++
                break;
        }
        // check for pairs, make them animate and be shown on top of all other cards
        if (cardsFlipped == 2 && firstCard.style.background == secondCard.style.background) {
            pairsFound++
            firstCard.onclick = secondCard.onclick = null
            firstCard.style.position = secondCard.style.position = 'relative'
            firstCard.style.zIndex = secondCard.style.zIndex = zIndex
            firstCard.style.animation = secondCard.style.animation = 'pairFound 0.9s ease-in 0.3s 1 forwards'
            zIndex++
        }
        // reset flipped cards
        else if (cardsFlipped == 3) {
            if (firstCard.style.background != secondCard.style.background) {
                firstCard.style.transform = secondCard.style.transform = 'rotateY(180deg)'
                firstCardOverlay.style.background = secondCardOverlay.style.background = 'linear-gradient(to top left, var(--cardBackside), var(--cardBackside) 20%, var(--cardBackside2) 20%, var(--cardBackside2) 40%, var(--cardBackside) 40%, var(--cardBackside) 60%, var(--cardBackside2) 60%, var(--cardBackside2) 80%, var(--cardBackside) 80%, var(--cardBackside) 100%)'
                firstCard.style.transition = secondCard.style.transition = 'all .3s linear 0s'
                firstCardOverlay.style.transition = secondCardOverlay.style.transition = 'all .3s linear 0s'
            }
            firstCard = card
            firstCardOverlay = cardOverlay
            secondCard = secondCardOverlay = null
            cardsFlipped = 1
        }
    } // play randomized animation and output score when finished
    if (pairsFound == 8) {
        setTimeout(() => { document.getElementById('output').innerHTML = 'You finished with ' + tries + ' tries.<br><br><a href="index.html">Play again</a>' }, 2000)
        cards.forEach((c) => { c.style.animation = 'finished ' + (1 + Math.random()) + 's ease-in 1 forwards' })
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}