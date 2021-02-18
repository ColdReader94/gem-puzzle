/* eslint-disable import/extensions */
import playSound from './playSound.js';
import randomInteger from './randomInteger.js';
import swap from './swap.js';

/* eslint-disable no-alert */
const game = document.createElement('div');
const menu = document.createElement('div');
const statusbar = document.createElement('div');
const showtime = document.createElement('div');
const showmoves = document.createElement('div');
const scoreList = document.createElement('div');
const field = document.createElement('div');
const form = document.createElement('div');
const label = document.createElement('div');
const closeButton = document.createElement('button');
const numbersButton = document.createElement('button');
numbersButton.textContent = 'Nums off';
numbersButton.shows = false;
closeButton.textContent = 'Close';
label.textContent = 'Field size: ';
const select = document.createElement('select');
select.size = '1';
select.name = 'select-field';
select.id = 'field-size';
const optionOne = document.createElement('option');
const optionTwo = document.createElement('option');
const optionThree = document.createElement('option');
const optionFour = document.createElement('option');
const optionFive = document.createElement('option');
const optionSix = document.createElement('option');
optionOne.value = '3';
optionOne.textContent = '3x3';
optionTwo.value = '4';
optionTwo.selected = 'true';
optionTwo.textContent = '4x4';
optionThree.value = '5';
optionThree.textContent = '5x5';
optionFour.value = '6';
optionFour.textContent = '6x6';
optionFive.value = '7';
optionFive.textContent = '7x7';
optionSix.value = '8';
optionSix.textContent = '8x8';
const startButton = document.createElement('button');
startButton.textContent = 'Start';
const volumeButton = document.createElement('button');
volumeButton.innerHTML = '<img src = ./assets/sound-on.png alt="">';
const scoresButton = document.createElement('button');
scoresButton.textContent = 'Scores';
const cellSound = document.createElement('audio');
cellSound.src = './assets/cell.wav';
cellSound.classList.add('cellSound');
document.body.append(cellSound);
game.classList.add('game');
menu.classList.add('menu');
form.classList.add('form');
statusbar.classList.add('statusbar');
statusbar.textContent = 'Time passed: 00:00   Moves: 0';
startButton.classList.add('start');
volumeButton.classList.add('volume');
closeButton.classList.add('close-button');
scoresButton.classList.add('best-scores');
numbersButton.classList.add('nums-button');
field.classList.add('field');
scoreList.classList.add('score-list');

document.body.append(game);
game.append(menu);
scoreList.append(closeButton);
document.body.prepend(scoreList);
menu.append(statusbar);
statusbar.append(showtime);
statusbar.append(showmoves);
menu.append(form);
form.append(label, select);
select.append(optionOne, optionTwo, optionThree, optionFour, optionFive, optionSix);
form.append(startButton);
menu.append(volumeButton, scoresButton, numbersButton);
game.append(field);
let image;
let continueGame;
if (localStorage.getItem('continue')) continueGame = JSON.parse(localStorage.getItem('continue'));

scoresButton.addEventListener('click', () => {
  scoreList.classList.toggle('open');
  let result = localStorage.getItem('results');
  result = JSON.parse(result);
  for (let i = 0; i < result.length; i += 1) {
    const scoreItem = document.createElement('span');
    scoreItem.classList.add('score-item');
    scoreItem.textContent = `${i + 1}. Moves:  ${result[i].score} Time: ${result[i].time}`;
    document.querySelector('.score-list').append(scoreItem);
  }
});

closeButton.addEventListener('click', () => {
  const elems = scoreList.querySelectorAll('.score-item');
  for (let i = 0; i < elems.length; i += 1) {
    elems[i].remove();
  }
  scoreList.classList.toggle('open');
});

volumeButton.addEventListener('click', () => {
  const audio = document.querySelector('.cellSound');
  audio.muted = (audio.muted === false) ? !audio.muted : false;
  if (document.querySelector('.cellSound').muted === true) volumeButton.innerHTML = '<img src="./assets/sound-off.png">';
  else volumeButton.innerHTML = '<img src="./assets/sound-on.png">';
});

numbersButton.addEventListener('click', () => {
  numbersButton.shows = !numbersButton.shows;
  if (numbersButton.shows) {
    numbersButton.textContent = 'Nums on';
    const colorFont = document.querySelectorAll('.cell');
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of colorFont) {
      elem.style.color = 'white';
    }
  } else {
    numbersButton.textContent = 'Nums off';
    const colorFont = document.querySelectorAll('.cell');
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of colorFont) {
      elem.style.color = 'transparent';
    }
  }
});

let moves = 0;
let gameState = false;

let cells = [];
let empty = {
  value: '',
  left: 0,
  top: 0,
  element: null,
};

let cellSize = 100;

// функции и переменные секундомера
const base = 60;
let clocktimer; let dateObj; let dm; let
  ds;
let readout = '';
let h = 1;
let m = 1;
let tm = 1;
let s = 0;
let ts = 0;
let ms = 0;

function StartTIME() {
  const cdateObj = new Date();
  const t = (cdateObj.getTime() - dateObj.getTime()) - (s * 1000);
  window.addEventListener('unload', () => {
    const saveTime = JSON.stringify([h, m, tm, s, ts, ms, dm, ds, clocktimer,
      cdateObj, t, readout]);
    localStorage.setItem('time', saveTime);
  });
  if (t > 999) {
    s += 1;
  }
  if (s >= (m * base)) {
    ts = 0;
    m += 1;
  } else {
    ts = parseInt((ms / 100) + s, 10);
    if (ts >= base) {
      ts -= ((m - 1) * base);
    }
  }
  if (m > (h * base)) {
    tm = 1;
    h += 1;
  } else {
    tm = parseInt((ms / 100) + m, 10);
    if (tm >= base) {
      tm -= ((h - 1) * base);
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms === 0) {
    ms = '00';
  }
  if (ms > 0 && ms <= 9) {
    ms = `0${ms}`;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = `0${ts}`;
    }
  } else {
    ds = '00';
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = `0${dm}`;
    }
  } else {
    dm = '00';
  }

  readout = `${dm}:${ds}`;
  statusbar.textContent = `Time passed: ${readout} Moves: ${moves}`;
  clocktimer = setTimeout(StartTIME, 1);
}

// функция для сброса секундомера
function ClearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  readout = '00:00';
  statusbar.textContent = `Time passed: ${readout} Moves: ${moves}`;
}

// Функция запуска и остановки секундомера
function startTimer() {
  ClearСlock();
  dateObj = new Date();
  if (continueGame) {
    dateObj = new Date(localStorage.getItem('dateObj'));
    continueGame = false;
  }
  localStorage.setItem('dateObj', dateObj);
  StartTIME();
}

function stopTimer() {
  clearTimeout(clocktimer);
}

function refreshStatusbar() {
  statusbar.textContent = `Time passed: ${readout} Moves: ${moves}`;
}

// запись и чтение из localStorage
function writeToStorage() {
  let results = null;
  const record = {
    score: moves,
    time: readout,
  };

  if (!localStorage.getItem('results')) {
    results = [];
    results.push(record);
    results = JSON.stringify(results);
    localStorage.setItem('results', results);
  } else {
    localStorage.getItem('results');
    results = localStorage.getItem('results');
    results = JSON.parse((results));
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].score > record.score) {
        if (results.length >= 10) {
          results.splice(10, 1);
          results.splice(i, 0, record);
          results = JSON.stringify(results);
          localStorage.setItem('results', results);
        } else {
          results.splice(i, 0, record);
          results = JSON.stringify(results);
          localStorage.setItem('results', results);
        }
        break;
      }
      if (results[i].score < record.score) {
        if (results.length >= 10) {
          break;
        } else {
          results.push(record);
          results = JSON.stringify(results);
          localStorage.setItem('results', results);
        }
        break;
      }
      if (results[i].score === record.score) {
        if (results[i].time < record.time) {
          if (results.length >= 10) {
            results.splice(10, 1);
            results.splice(i, 0, record);
            results = JSON.stringify(results);
            localStorage.setItem('results', results);
          } else {
            results.splice(i, 0, record);
            results = JSON.stringify(results);
            localStorage.setItem('results', results);
          }
          break;
        } else {
          if (results.length <= 10) {
            results.splice(i + 1, 0, record);
            results = JSON.stringify(results);
            localStorage.setItem('results', results);
          } else {
            results.splice(i + 1, 0, record);
            results = JSON.stringify(results);
            localStorage.setItem('results', results);
          }
          break;
        }
      }
    }
  }
}

// завершение игры при выигрыше
function stopGame() {
  stopTimer();
  ClearСlock();
  const fieldElems = document.querySelectorAll('.cell');
  document.querySelector('.emptycell').remove();
  moves = 0;
  cells = [];
  for (let i = 0; i < fieldElems.length; i += 1) {
    fieldElems[i].remove();
  }
  startButton.textContent = 'Start';
  refreshStatusbar();
}

export default function finishGame() {
  gameState = false;
  stopTimer();
  writeToStorage();
  alert(`Ура! Вы решили головоломку за ${readout} и ${moves} ходов`); // eslint-disable-line
  stopGame();
}

// адаптив
function checkWindowSize() {
  if (document.body.clientWidth <= 768) {
    cellSize = 35;
    if (document.querySelector('.cell')) {
      document.querySelectorAll('.cell').forEach((item) => {
        const elem = item;
        elem.style.width = '35px';
        elem.style.height = '35px';
      });
      document.querySelector('.emptycell').style.height = '35px';
      document.querySelector('.emptycell').style.width = '35px';
      cells.forEach((item) => {
        const elem = item;
        elem.element.style.left = `${elem.left * cellSize}px`;
        elem.element.style.top = `${elem.top * cellSize}px`;
        elem.element.style.backgroundImage = image;
        elem.element.style.backgroundRepeat = 'no-repeat';
        elem.element.style.backgroundSize = `${select.value * cellSize}px ${select.value * cellSize}px`;
        // eslint-disable-next-line no-bitwise
        elem.element.style.backgroundPosition = `-${(elem.value % select.value) * cellSize}px -${(elem.value / select.value | 0) * cellSize}px`;
      });
      empty.element.style.left = `${empty.left * cellSize}px`;
      empty.element.style.top = `${empty.top * cellSize}px`;
    }
  } else if (document.body.clientWidth > 768 && document.body.clientWidth <= 1200) {
    cellSize = 60;
    if (document.querySelector('.cell')) {
      document.querySelectorAll('.cell').forEach((item) => {
        const elem = item;
        elem.style.width = '60px';
        elem.style.height = '60px';
      });
      document.querySelector('.emptycell').style.height = '60px';
      document.querySelector('.emptycell').style.width = '60px';
      cells.forEach((item) => {
        const elem = item;
        elem.element.style.left = `${elem.left * cellSize}px`;
        elem.element.style.top = `${elem.top * cellSize}px`;
        elem.element.style.backgroundImage = image;
        elem.element.style.backgroundRepeat = 'no-repeat';
        elem.element.style.backgroundSize = `${select.value * cellSize}px ${select.value * cellSize}px`;
        // eslint-disable-next-line no-bitwise
        elem.element.style.backgroundPosition = `-${(elem.value % select.value) * cellSize}px -${(elem.value / select.value | 0) * cellSize}px`;
      });
      empty.element.style.left = `${empty.left * cellSize}px`;
      empty.element.style.top = `${empty.top * cellSize}px`;
    }
  } else {
    cellSize = 75;
    if (document.querySelector('.cell')) {
      document.querySelectorAll('.cell').forEach((item) => {
        const elem = item;
        elem.style.width = '75px';
        elem.style.height = '75px';
      });
      document.querySelector('.emptycell').style.height = '75px';
      document.querySelector('.emptycell').style.width = '75px';
      cells.forEach((item) => {
        const elem = item;
        elem.element.style.left = `${elem.left * cellSize}px`;
        elem.element.style.top = `${elem.top * cellSize}px`;
        elem.element.style.backgroundImage = image;
        elem.element.style.backgroundRepeat = 'no-repeat';
        elem.element.style.backgroundSize = `${select.value * cellSize}px ${select.value * cellSize}px`;
        // eslint-disable-next-line no-bitwise
        elem.element.style.backgroundPosition = `-${(elem.value % select.value) * cellSize}px -${(elem.value / select.value | 0) * cellSize}px`;
      });
      empty.element.style.left = `${empty.left * cellSize}px`;
      empty.element.style.top = `${empty.top * cellSize}px`;
    }
  }
  field.style.width = `${cellSize * select.value}px`;
  field.style.height = `${cellSize * select.value}px`;
}

checkWindowSize();

window.addEventListener('resize', checkWindowSize);

// перемещение ячейки
function move(index) {
  const cell = cells[index];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);
  if (leftDiff + topDiff > 1) {
    return;
  }
  checkWindowSize();
  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;
  const emptyLeft = empty.left;
  const emptyTop = empty.top;
  empty.left = cell.left;
  empty.top = cell.top;
  empty.element.style.left = `${empty.left * cellSize}px`;
  empty.element.style.top = `${empty.top * cellSize}px`;
  cell.left = emptyLeft;
  cell.top = emptyTop;

  // проверка на выигрыш (после каждого хода)

  const isFinished = cells.every((item) => item.value === item.top * select.value + item.left);

  moves += 1;
  if (isFinished) {
    setTimeout(finishGame, 400);
  }
  refreshStatusbar();
}

// Генерация фишек на поле, перемешивание, вставка их в поле и назначение обработчиков

function startGame() {
  if (continueGame && JSON.parse(localStorage.getItem('gameState')) === true) {
    // eslint-disable-next-line no-restricted-globals
    continueGame = confirm('Do you want to continue saved game?');
    if (continueGame && JSON.parse(localStorage.getItem('gameState')) === true) {
      select.value = JSON.parse(localStorage.getItem('select'));
      moves = JSON.parse(localStorage.getItem('turns'));
      refreshStatusbar();
    }
  }

  let link = randomInteger(1, 150);
  if (continueGame && JSON.parse(localStorage.getItem('gameState')) === true) link = localStorage.getItem('link');
  image = `url('./assets/box/${link}.jpg')`;
  localStorage.setItem('link', link);
  let numbers = []; let ei; let
    ej;
  checkWindowSize();
  if (continueGame && JSON.parse(localStorage.getItem('gameState')) === true) {
    numbers = JSON.parse(localStorage.getItem('numbers'));
    ei = JSON.parse(localStorage.getItem('numbers')) - 1;
    ej = ei;
  } else {
    for (let i = 0; i < select.value; i += 1) {
      numbers[i] = [];
      for (let j = 0; j < select.value; j += 1) {
        if (i + j !== (select.value - 1) * 2) numbers[i][j] = i * select.value + j + 1;
        else numbers[i][j] = '';
      }
    }
    ei = select.value - 1;
    ej = select.value - 1;
    for (let i = 0; i < 1600; i += 1) {
      switch (Math.round(3 * Math.random())) {
        case 0: if (ei !== 0) swap(numbers, ei, ej, ei -= 1, ej); break; // up
        case 1: if (ej !== select.value - 1) swap(numbers, ei, ej, ei, ej += 1); break; // right
        case 2: if (ei !== select.value - 1) swap(numbers, ei, ej, ei += 1, ej); break; // down
        case 3: if (ej !== 0) swap(numbers, ei, ej, ei, ej -= 1); break; // left
        default: break;
      }
    }
    const nums = JSON.stringify(numbers);
    localStorage.setItem('numbers', nums);
    localStorage.setItem('fieldValue', JSON.stringify(select.value));
  }

  let ind = 0;
  let counter = 0;
  for (let i = 1; i <= select.value; i += 1) {
    for (let j = 1; j <= select.value; j += 1) {
      if (numbers[i - 1][j - 1] === '') {
        counter += 1;
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('emptycell');

        empty = {
          value: '',
          left: (counter - 1) % select.value,
          top: ((counter - 1) - ((counter - 1) % select.value)) / select.value,
          element: emptyCell,
        };

        if (continueGame) {
          empty = JSON.parse(localStorage.getItem('empty'));
          empty.element = emptyCell;
        }

        emptyCell.style.left = `${empty.left * cellSize}px`;
        emptyCell.style.top = `${empty.top * cellSize}px`;
        emptyCell.style.width = `${cellSize}px`;
        emptyCell.style.height = `${cellSize}px`;
        field.append(emptyCell);
        emptyCell.addEventListener('dragover', (event) => {
          event.preventDefault();
        });
        emptyCell.addEventListener('drop', () => {
          const index = document.querySelector('.selected').getAttribute('numId');
          move(index);
          document.querySelector('.selected').classList.remove('selected');
        });
      } else {
        const cell = document.createElement('div');
        cell.draggable = true;
        const value = numbers[i - 1][j - 1] - 1;

        cell.classList.add('cell');
        cell.textContent = value + 1;
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;

        let left = counter % select.value;
        let top = (counter - left) / select.value;

        if (continueGame) {
          left = JSON.parse(localStorage.getItem('cells'))[ind].left;
          top = JSON.parse(localStorage.getItem('cells'))[ind].top;
          ind += 1;
        }

        const id = cells.length - 1;
        const numId = id + 1;

        cell.style.backgroundImage = image;
        cell.style.backgroundRepeat = 'no-repeat';
        cell.style.backgroundSize = `${select.value * cellSize}px ${select.value * cellSize}px`;
        // eslint-disable-next-line no-bitwise
        cell.style.backgroundPosition = `-${(value % select.value) * cellSize}px -${(value / select.value | 0) * cellSize}px`;
        cell.setAttribute('numId', numId);
        cells.push({
          value,
          left,
          top,
          element: cell,
        });
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
        counter += 1;
        field.append(cell);

        let startCursorX;
        let startCursorY;
        let startX;
        let startY;

        cell.addEventListener('click', () => {
          cell.classList.add('selected');
          playSound(document.querySelector('.cellSound'));
          const index = document.querySelector('.selected').getAttribute('numId');
          move(index);
          cell.classList.remove('selected');
        });

        cell.addEventListener('dragstart', (event) => {
          startCursorX = event.pageX; // Начальная позиция курсора по оси X
          startCursorY = event.pageY; // Начальная позиция курсора по оси Y
          startX = cell.style.left.replace('px', '') * 1;
          startY = cell.style.top.replace('px', '') * 1;
          cell.classList.add('selected');
        });

        cell.addEventListener('dragend', (event) => {
          cell.style.left = startX + event.pageX - startCursorX;
          cell.style.top = startY + event.pageY - startCursorY;
          playSound(document.querySelector('.cellSound'));
        });
      }
    }

    gameState = true;
    if (gameState === true) startButton.textContent = 'Restart';
    else {
      startButton.textContent = 'Start';
      moves = 0;
      ClearСlock();
    }
  }
  startTimer();
}

// сброс состояния поля

function clearField() {
  stopTimer();
  const fieldElems = document.querySelectorAll('.cell');
  if (document.querySelector('.emptycell')) document.querySelector('.emptycell').remove();
  moves = 0;
  cells = [];
  fieldElems.forEach((elem) => elem.remove());
  refreshStatusbar();
  startGame();
}

startButton.addEventListener('click', clearField);

function saveGameState() {
  if (gameState) {
    continueGame = true;
    const turns = JSON.stringify(moves);
    localStorage.setItem('turns', turns);
    localStorage.setItem('continue', continueGame.toString());
    localStorage.setItem('gameState', gameState);
    localStorage.setItem('select', JSON.stringify(select.value));
    localStorage.setItem('cells', JSON.stringify(cells));
    localStorage.setItem('empty', JSON.stringify(empty));
  } else {
    localStorage.removeItem('turns');
    localStorage.removeItem('select');
    continueGame = false;
    localStorage.setItem('continue', continueGame.toString());
    localStorage.setItem('gameState', gameState);
  }
}

window.addEventListener('unload', saveGameState);
