document.addEventListener('DOMContentLoaded', () => {
	const slot1 = document.getElementById('slot1');
	const slot2 = document.getElementById('slot2');
	const slot3 = document.getElementById('slot3');
	const playButton = document.getElementById('play-button');
	const resultDisplay = document.getElementById('result');

	const fruits = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉'];

	let isSpinning = false;
	let isWon = false;
	let spinInterval;
	let confettiInterval;

	playButton.addEventListener('click', () => {
		if (isWon) {
			// Fungsi Reset
			clearInterval(confettiInterval);
			removeConfetti();
			resultDisplay.textContent = '';
			playButton.textContent = 'Acak';
			playButton.style.backgroundColor = 'red';
			isWon = false;
			return;
		}

		if (isSpinning) {
			// Hentikan putaran
			clearInterval(spinInterval);
			isSpinning = false;
			checkWin();
		} else {
			// Mulai putaran baru
			isSpinning = true;
			resultDisplay.textContent = '';

			let spins = 0;
			const maxSpins = 30;

			spinInterval = setInterval(() => {
				spins++;

				const randomFruit1 = fruits[Math.floor(Math.random() * fruits.length)];
				const randomFruit2 = fruits[Math.floor(Math.random() * fruits.length)];
				const randomFruit3 = fruits[Math.floor(Math.random() * fruits.length)];

				slot1.textContent = randomFruit1;
				slot2.textContent = randomFruit2;
				slot3.textContent = randomFruit3;

				if (spins >= maxSpins) {
					clearInterval(spinInterval);
					isSpinning = false;
					checkWin();
				}
			}, 100);
		}
	});

	function checkWin() {
		const finalFruit1 = slot1.textContent;
		const finalFruit2 = slot2.textContent;
		const finalFruit3 = slot3.textContent;

		if (finalFruit1 === finalFruit2 && finalFruit2 === finalFruit3) {
			resultDisplay.textContent = 'ANDA MENANG!';
			isWon = true;
			playButton.textContent = 'Ulang';
			playButton.style.backgroundColor = 'orange';
			confettiInterval = setInterval(showConfetti, 400);
		}
	}

	function showConfetti() {
		const confettiContainer = document.body;
		const confettiCount = 20; // Buat 20 keping setiap kali dipanggil
		for (let i = 0; i < confettiCount; i++) {
			const confetti = document.createElement('div');
			confetti.classList.add('confetti');
			confetti.style.left = Math.random() * 100 + 'vw';
			confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
			confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
			confettiContainer.appendChild(confetti);

			// Hapus keping konfeti setelah animasinya selesai
			setTimeout(() => {
				confetti.remove();
			}, 5000);
		}
	}

	function removeConfetti() {
		const existingConfetti = document.querySelectorAll('.confetti');
		existingConfetti.forEach(c => c.remove());
	}
});
