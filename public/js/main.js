window.onload=function(){
	function draw(event) {
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		var text = document.getElementById('item').value;
		var color = document.getElementById('item_color').value;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = color;
		ctx.font = "75px Arial";
		var img = document.getElementById("image");
		ctx.drawImage(img, 0, 0);
		ctx.fillText(text, 50, 455);
		console.log(color);
	}
	window.addEventListener("keyup", draw, true);
	window.addEventListener("mousedown", draw, true);
}

function onSubmit(e) {
	e.preventDefault();

	document.querySelector('.msg').textContent = '';
	document.querySelector('#image').src = '';

	const prompt = document.querySelector('#promptInput').value;

	if (prompt === '') {
		alert('Please add some text');
		return;
	}

	generateImageRequest(prompt);
}

async function generateImageRequest(prompt) {
	try {
		showSpinner();

		const response = await fetch('/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt
			}),
		});

		if (!response.ok) {
			removeSpinner();
			throw new Error('That image could not be generated');
		}

		const image = await response.json();

		const imageUrl = image.data;

		document.querySelector('#image').src = imageUrl;

		removeSpinner();
	} catch (error) {
		//print error to front end
		document.querySelector('.msg').textContent = error;
	}
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
	document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#imagePrompt').addEventListener('submit', onSubmit);