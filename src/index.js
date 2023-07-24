import './css/style.css';

const body = document.querySelector('body');

const launcher = () => {
  const main = document.createElement('main');
  main.classList.add('main');

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
  div1.appendChild(btnRefresh);
  const table = document.createElement('table');
  const tr = document.createElement('tr');
  const tr1 = document.createElement('tr');
  const tr2 = document.createElement('tr');
  const td = document.createElement('th');
  const td1 = document.createElement('th');
  const td2 = document.createElement('th');
  td.textContent = 'Libellé: 100';
  td1.textContent = 'Libellé: 50';
  td2.textContent = 'Libellé: 20';
  tr.appendChild(td);
  tr1.appendChild(td1);
  tr2.appendChild(td2);
  table.appendChild(tr);
  table.appendChild(tr1);
  table.appendChild(tr2);
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
  input1.name = 'name';
  const input2 = document.createElement('input');
  input2.type = 'text';
  input2.name = 'score';
  const btnSubmit = document.createElement('input');
  btnSubmit.type = 'submit';
  btnSubmit.value = 'Submit';
  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(btnSubmit);
  right.appendChild(div2);
  right.appendChild(form);

  main.appendChild(header);
  main.appendChild(left);
  main.appendChild(right);

  body.appendChild(main);
};

window.addEventListener('DOMContentLoaded', () => {
  launcher();
});