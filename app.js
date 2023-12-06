const cards = document.querySelectorAll('.memory-card');

const nbreDeCoups = document.getElementById('coups');//déclaration de ma constante
//console.log(nbreDeCoups);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let nbCoups = 0;//Je déclare ma vaiable dans laquelle je mettrai le nombre de coups


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

//la fonction qui vérifie si les 2 cartes sont identifiées
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  nbCoups = nbCoups + 1;//quand le joueur clique sur une première carte, puis une deuxième carte, le compteur augmente de 1
  nbreDeCoups.innerText = `Nombre de coups jouer égale à ${nbCoups}`;//J'ajoute du texte avec innerText 
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

//Mon code JavaScript pour rafraichir la page en vue d'une nouvelle partie.
const reprendre = document.getElementById('reprendreJeu');//déclaration de la constante pour sélectionner le id
//j'ajoute la fonction qui permet de rafraichir la page
function reprendreLeJeu (){
  location.reload();
}
reprendre.addEventListener('click', reprendreLeJeu);//j'ajoute un évenement click sur ma fonction reprendreLeJeu
//console.log(reprendre);

