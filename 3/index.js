const wsUri = "wss:/echo-websocket.glitch.me/client/";
const input = document.querySelector('.input');
const btnOpen = document.querySelector('.btn-open');
const btnSend = document.querySelector('.btn-send');
const userMessages = document.querySelector('.user-messages');

function writeToScreen(message) {
	let element = 
  `<p class='messages'>
      ${message}
  </p>`;
	userMessages.innerHTML += element;
  }

let websocket = new WebSocket(wsUri); 
	websocket.onmessage = function(evt) {
		writeToScreen(`${evt.data}`);
	};

btnSend.addEventListener('click', () => {
	const message = input.value;
	websocket.send(message);
	writeToScreen(`message: ${message}`);
	input.value = ''
});

const mapLink = document.querySelector('#map-link');
const btn = document.querySelector('.btn-geo');

const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Гео-локация';
}

btn.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});