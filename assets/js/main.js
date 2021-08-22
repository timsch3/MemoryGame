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
let winString1 = 'You finished with '
let winString2 = ' tries.<br><br><a href="index.html">Play again</a>'

function shuffleCards() {
    // add card elements to cards array
    for (let i = 1; i < 17; i++) {
        cards.push(document.getElementById(i))
    }
    // shuffle cards array
    cards.sort((a, b) => 0.5 - Math.random())
    // set random images to card pairs
    let random = getRandomIntInclusive(1, 9999)
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
    } // play animation and output score when finished
    if (pairsFound == 8) {
        setTimeout(() => {
            let n = 0
            cards.forEach((c) => {
                c.style.animation = 'finished ' + (0.4 + n) + 's linear 1 forwards'
                n += 0.1
            })
        }, 1200)
        setTimeout(() => { document.getElementById('output').innerHTML = winString1 + tries + winString2 }, 3200)
    }
}

// change strings to german if user browser is set to a german language
function setLanguage() {
    if (navigator.language == "de" || navigator.language == "de-DE" || navigator.language == "de-CH" || navigator.language == "de-AT" || navigator.language == "de-LU" || navigator.language == "de-LI") {
        document.getElementById('instructions').innerHTML = `<h1>Spiele Memory</h1>
        <p>
            Klicke auf eine Karte um sie umzudrehen und das Bild darauf zu sehen, dann klicke auf eine weitere Karte.<br><br>Wenn die zwei Karten übereinstimmen hast du ein Paar gefunden und sie bleiben umgedreht.<br><br>Ziel des Spiels ist es, alle acht Paare in so wenigen Versuchen wie möglich zu finden.
        </p>
        <p id='output'></p>`
        winString1 = 'Du hast das Spiel mit '
        winString2 = ' Versuchen beendet.<br><br><a href="index.html">Nochmal spielen</a>'
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}