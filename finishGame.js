export default function finishGame() {
    gameState = false;
    stopTimer();
    writeToStorage();
    alert(`Ура! Вы решили головоломку за ${readout} и ${moves} ходов`); // eslint-disable-line
    stopGame();
  }