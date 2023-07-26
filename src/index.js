import './css/style.css';

const gameName = 'LeaderBoard';
const apiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const main = document.querySelector('.main');
const message = document.querySelector('.message');

let gameId = [];

const showMessage = (message, classToRemove, classToAdd, innerHTML) => {
  message.classList.remove(classToRemove);
  message.classList.add(classToAdd);
  message.innerHTML = innerHTML;
  setTimeout(() => {
    message.classList.remove(classToAdd);
    message.innerHTML = '';
  }, 3000);
};

const createGame = async (name, message) => {
  const response = await fetch(`${apiUrl}/games`, {
    method: 'POST',
    body: JSON.stringify({
      name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await response.json();
  const newId = {
    ID: json.result,
  };
  localStorage.setItem('gameResult', JSON.stringify(newId));
  showMessage(message, 'error', 'success', json.result);
};

const getId = () => {
  if (gameId.ID === undefined) {
    createGame(gameName, message);
  }
  if ((gameId.ID !== undefined) && (gameId.ID.split(' ').length !== 1)) {
    const tab = gameId.ID.split(' ');
    [, , , gameId.ID] = tab;
    localStorage.setItem('gameResult', JSON.stringify(gameId));
    return gameId.ID;
  }
  return gameId.ID;
};

const getScores = async () => {
  const response = await fetch(`${apiUrl}/games/${gameId.ID}/scores/`);
  const json = await response.json();
  const stortedScores = json.result.sort((a, b) => b.score - a.score);
  const table = document.querySelector('table');
  table.innerHTML = '';
  stortedScores.forEach((element) => {
    if (json.result.length > 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      const td1 = document.createElement('td');
      td.textContent = `${element.user}`;
      td1.textContent = `${element.score}`;
      tr.appendChild(td);
      tr.appendChild(td1);
      table.appendChild(tr);
    } else {
      table.innerHTML = 'No scores yet';
    }
  });
};

const addScore = async (user, score) => {
  if (user === '' || score === '') {
    showMessage(message, 'success', 'error', 'Please fill in all fields');
  } else {
    const response = await fetch(`${apiUrl}/games/${gameId.ID}/scores/`, {
      method: 'POST',
      body: JSON.stringify({
        user,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response.ok) {
      getScores();
    } else {
      showMessage(message, 'success', 'error', 'Something went wrong');
    }

    const json = await response.json();
    showMessage(message, 'error', 'success', json.result);
  }
};
const launcher = () => {
  const header = document.createElement('div');
  header.classList.add('header');
  const h1 = document.createElement('h1');
  h1.textContent = 'Leaderboard';
  header.appendChild(h1);

  const left = document.createElement('div');
  left.classList.add('left');

  const div1 = document.createElement('div');
  div1.classList.add('title');
  const lh2 = document.createElement('h2');
  lh2.textContent = 'Recent scores';
  div1.appendChild(lh2);
  const btnRefresh = document.createElement('button');
  btnRefresh.textContent = 'Refresh';
  btnRefresh.addEventListener('click', () => {
    getScores();
  });
  div1.appendChild(btnRefresh);
  const table = document.createElement('table');
  left.appendChild(div1);
  left.appendChild(table);

  const right = document.createElement('div');
  right.classList.add('right');
  const div2 = document.createElement('div');
  div1.classList.add('title');
  const rh2 = document.createElement('h2');
  rh2.textContent = 'Add your score';
  div2.appendChild(rh2);
  const form = document.createElement('form');
  const input1 = document.createElement('input');
  input1.type = 'text';
  input1.name = 'user';
  input1.placeholder = 'Add a name';
  const input2 = document.createElement('input');
  input2.type = 'number';
  input2.name = 'score';
  input2.placeholder = 'Add a score';
  const btnSubmit = document.createElement('input');
  btnSubmit.type = 'submit';
  btnSubmit.value = 'Submit';
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const user = input1.value;
    const score = input2.value;
    addScore(user, score);
  });
  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(btnSubmit);
  right.appendChild(div2);
  right.appendChild(form);

  main.appendChild(header);
  main.appendChild(left);
  main.appendChild(right);
};

window.addEventListener('DOMContentLoaded', () => {
  gameId = JSON.parse(localStorage.getItem('gameResult')) ?? [];
  getId();
  main.innerHTML = '';
  launcher();
});