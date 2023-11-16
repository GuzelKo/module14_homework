const form = document.getElementById('form');
const output = document.getElementById('output');
form.addEventListener('submit', onSubmit);

function sendRequest() {
	if (!validateInput()) return;
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `https://jsonplaceholder.typicode.com/photos?_limit=${input.value}`);
	xhr.send();

	xhr.onload = function () {
		if (xhr.status !== 200) {
			console.error("error: запрос не отправлен!!")
		}
		const data = JSON.parse(xhr.response);

		output.innerHTML = '';
		data.forEach(element => {
			const img = output.appendChild(document.createElement('img'));
			img.setAttribute('src', element.thumbnailUrl);
		});
	}
}

function validateInput() {
	// конвертирует input.value в number или NaN
	const n = Number.parseInt(input.value);

	if (isNaN(n)) {
		output.innerHTML = "введите число!";
		return false;
	}
	if (n < 1 || n > 10) {
		output.innerHTML = "число вне диапазона от 1 до 10";
		return false;
	}
	return true;
}


function onSubmit(e) {
	e.preventDefault();
	sendRequest();
}





