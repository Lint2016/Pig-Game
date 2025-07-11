'use strict';
// DOM Elements
const playerNameForm = document.getElementById('player-form');
const playerNameModal = document.getElementById('player-names');
const mainGame = document.querySelector('main');

// Player name form submission
playerNameForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get player names from the form
    const player1Name = document.getElementById('player1').value.trim() || 'Player 1';
    const player2Name = document.getElementById('player2').value.trim() || 'Player 2';
    
    // Update player name displays
    document.getElementById('name--0').textContent = player1Name;
    document.getElementById('name--1').textContent = player2Name;
    
    // Hide the modal and show the game
    playerNameModal.classList.add('hidden');
    mainGame.classList.remove('hidden');
    
    // Initialize the game
    init();
});

// Add touch feedback function
const addTouchFeedback = (element) => {
  element.addEventListener('touchstart', () => {
    element.classList.add('btn--touched');
  });
  
  element.addEventListener('touchend', () => {
    element.classList.remove('btn--touched');
  });
};

//we select the elements with the below
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El= document.getElementById('score--0');
const score1El= document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl= document.querySelector('.dice')
const btnNew= document.querySelector('.btn--new');
const btnRoll= document.querySelector('.btn--roll');
const btnHold= document.querySelector('.btn--hold');

// Add touch feedback to buttons
[btnNew, btnRoll, btnHold].forEach(btn => addTouchFeedback(btn));



let playing, activePlayer, scores, currentScore
// create a function which initializes the game
const init = function() {
    // starting conditions
    diceEl.classList.add('hidden');
    scores = [0, 0]; // initial scores for both players
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    playing = true;
    currentScore = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
//switch player function
const switchPlayer = function() {
 document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
       player0El.classList.toggle('player--active');// change of background color
       player1El.classList.toggle('player--active');// change of background color
}
//Rolling dice functionality
btnRoll.addEventListener('click', ()=>{
    if(playing){
    //Generate a random dice number
    const randomDiceNumber = Math.trunc(Math.random()*6)+1;
    console.log(randomDiceNumber);
    //Display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${randomDiceNumber}.png`;
 

    //Check fo rolled 1,
    if(randomDiceNumber !==1){
        //add dice to current scrore
        currentScore += randomDiceNumber;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    }//  if true , switch to the next player
    else{
        const currentPlayerName = document.getElementById(`name--${activePlayer}`).textContent;
    const nextPlayerName = document.getElementById(`name--${activePlayer === 0 ? 1 : 0}`).textContent;
    
    Swal.fire({
        title: 'Time\'s Up!',
        html: `<strong>${currentPlayerName}'s</strong> turn has ended.<br>It's now <strong>${nextPlayerName}'s</strong> turn to play.`,
        icon: 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        allowEscapeKey: false
    });
      switchPlayer(); 
    }   
    }
})

// functionality of the hold button

btnHold.addEventListener('click', ()=>{
    if(playing){
        // add the score to the active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // Get player name for the alert
        const playerName = document.getElementById(`name--${activePlayer}`).textContent;
        
        //check if the player's score is >=40, if true, end the game
        if(scores[activePlayer] >= 40) {
    // Player has won
    playing = false;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    diceEl.classList.add('hidden');
    
    const winnerName = document.getElementById(`name--${activePlayer}`).textContent;
    
    Swal.fire({
      title: '🎉 Game Over!',
      html: `<strong>${winnerName}</strong> wins the game with ${scores[activePlayer]} points!`,
      icon: 'success',
      confirmButtonText: 'Play Again',
      confirmButtonColor: '#2ecc71',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        // Show player name input again for a new game
        playerNameModal.classList.remove('hidden');
        mainGame.classList.add('hidden');
      }
    });
  } else {
    // Switch to the next player if no one has won yet
    switchPlayer();
  }
}
})

// Reset the game
 btnNew.addEventListener('click', function() {
    playerNameModal.classList.remove('hidden');
    mainGame.classList.add('hidden');
});
