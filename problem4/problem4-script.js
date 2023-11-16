const apiURL = "https://dummyimage.com";

function pageLoaded() {
	const input1 = document.getElementById("input1");
	const input2 = document.getElementById("input2");
	const output = document.getElementById("output");
	const form = document.getElementById('form')


	form.addEventListener("submit", sendRequest);

	function sendRequest(e) {
		e.preventDefault();

		output.innerHTML = "";
		
		if (!validateInput(input1) || !validateInput(input2)) return;

		const request = apiURL + `/${input1.value}x${input2.value}`;

		fetch(request)
			.then(() => {
				const image = new Image();
				image.src = request;
				output.appendChild(image);
			})
			.catch((e) => {
				console.log(e);
			});

	}

	function validateInput(input) {
		let validated = true;
		if (input.value === "" || isNaN(+input.value)) {
			validated = false;
		}
		else if (+input.value < 100 || +input.value > 300) {
			output.innerHTML = "одно из чисел вне диапазона от 100 до 300";
			validated = false;
		}
		return validated;
	};

};

document.addEventListener("DOMContentLoaded", pageLoaded);