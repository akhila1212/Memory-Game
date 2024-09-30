const cardsArray = [
    'fruit1.png', 'fruit1.png', 'fruit2.png', 'fruit2.png',
    'fruit3.png', 'fruit3.png', 'fruit4.png', 'fruit4.png',
    'fruit5.png', 'fruit5.png', 'fruit6.png', 'fruit6.png',
    'fruit7.png', 'fruit7.png', 'fruit8.png', 'fruit8.png'
];

let cardValues = [];
let cardIds = [];
let matchedCards = 0;

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create card elements
function createCards() {
    const gameContainer = document.getElementById('game-container');
    const shuffledCards = shuffle(cardsArray);

    for (let i = 0; i < shuffledCards.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', i);

        // Front side
        const front = document.createElement('div');
        front.classList.add('front');

        // Back side (image)
        const back = document.createElement('div');
        back.classList.add('back');
        const img = document.createElement('img');
        img.src = shuffledCards[i];
        back.appendChild(img);

        card.appendChild(front);
        card.appendChild(back);
        gameContainer.appendChild(card);

        card.addEventListener('click', flipCard);
    }
}

// Flip card function
function flipCard() {
    if (cardValues.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        cardValues.push(this.querySelector('img').src);
        cardIds.push(this.getAttribute('data-id'));

        if (cardValues.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Check for matches
function checkForMatch() {
    const cards = document.querySelectorAll('.card');
    const [firstCardId, secondCardId] = cardIds;
    const [firstCardValue, secondCardValue] = cardValues;

    if (firstCardValue === secondCardValue) {
        matchedCards += 2;
        document.getElementById('message').innerText = 'You found a match!';
        if (matchedCards === cardsArray.length) {
            document.getElementById('message').innerText = 'Congratulations! You won!';
        }
    } else {
        setTimeout(() => {
            cards[firstCardId].classList.remove('flipped');
            cards[secondCardId].classList.remove('flipped');
            document.getElementById('message').innerText = 'Try again!';
        }, 100);
    }
    cardValues = [];
    cardIds = [];
}

// Reset the game
document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
    matchedCards = 0;
    document.getElementById('game-container').innerHTML = '';
    document.getElementById('message').innerText = '';
    createCards();
}

// Start the game
createCards();
