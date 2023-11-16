const apiURL = "https://jsonplaceholder.typicode.com/photos";

function pageLoaded() {
	const input1 = document.getElementById("input1");
	const input2 = document.getElementById("input2");
	const output = document.getElementById("output");
	const form = document.getElementById("form");

	form.addEventListener("submit", sendRequest);

	const storage = window.localStorage;
	const request = `${apiURL}?_page=${+input1.value}&_limit=${+input2.value}`;

	async function sendRequest(e) {
		e.preventDefault();

		if (!validateAll()) 
			return;
		
		output.innerHTML = "";
		
		fetch(request)
			.then(async (response) => {
				
				const list = await response.json();

				storage.clear();
				for (let i = 0; i < list.length; i++) {
					const element = list[i];
					const img = new Image();
					img.src = element.thumbnailUrl;
					output.appendChild(img);
					
					storage.setItem(`image_${i}`, element.thumbnailUrl);
				}
			})
			.catch((e) => {
				console.log("Что-то пошло не так...")
				console.log(e)
				
				for (let i = 0; i < storage.length; i++) {
					const src = storage.getItem(`image_${i}`);
					const img = new Image();
					img.src = src;
					output.appendChild(img);
				}

			});
	}

	function validateInput(input) {
		if (input.value === "" || isNaN(+input.value)) {
			return false;
		}
		return true;
	};

	function validateRange(input) {
		return 0 < +input.value && +input.value < 11;
	}

	function validateAll() {
		if (!validateInput(input1) || !validateInput(input2)) {
			output.innerHTML = "Введите число!";
			return false;
		}

		if (!validateRange(input1)) {
			output.innerHTML = "Номер страницы вне диапазона от 1 до 10";
			if (!validateRange(input2)) {
				output.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
				return false;
			}
			return false;
		}
		if (!validateRange(input2)) {
			output.innerHTML = "Лимит вне диапазона от 1 до 10";
			return false;
		}
		return true;
	}
};

document.addEventListener("DOMContentLoaded", pageLoaded);