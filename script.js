// — Таймер —
const countdown = document.getElementById('countdown');
const target = new Date('2025-09-20T15:00:00');
function update() {
  const diff = target - new Date();
  if (diff <= 0) { countdown.innerText = 'Событие уже началось!'; return; }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff/3600000)%24);
  const m = Math.floor((diff/60000)%60);
  const s = Math.floor((diff/1000)%60);
  countdown.innerText = `${d}д ${h}ч ${m}м ${s}с`;
}
setInterval(update,1000); update();

// — RSVP отправка через Telegram Bot -->
const form = document.getElementById('rsvpForm');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = new FormData(form);
  const text = `Новый RSVP\nИмя: ${data.get('name')}\nГости: ${data.get('guests')}\nКомментарий: ${data.get('message')}`;
  await fetch('https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/sendMessage', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ chat_id: '<ID_ЧАТА>', text })
  });
  form.reset();
  document.getElementById('rsvpStatus').innerText = 'Спасибо! Мы получили вашу информацию.';
});

// — Рассадка из seating.json — 
fetch('assets/seating.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('seating-chart');
    data.tables.forEach(tbl => {
      const div = document.createElement('div');
      div.className = 'table';
      div.innerHTML = `<h3>${tbl.name}</h3><ul>` +
        tbl.guests.map(g => `<li>${g}</li>`).join('') +
        '</ul>';
      container.append(div);
    });
  });
