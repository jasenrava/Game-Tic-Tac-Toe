// script.js

// Menyimpan elemen-elemen yang diperlukan
const boxes = document.querySelectorAll('.box');
const turnText = document.getElementById('turn');
const restartButton = document.getElementById('restart');

// Menyimpan status permainan
let currentPlayer = 'X';  // Pemain yang sedang giliran (X atau O)
let gameBoard = ['', '', '', '', '', '', '', '', ''];  // Status kotak permainan
let gameOver = false;  // Status permainan (apakah game sudah selesai)

// Fungsi untuk mengganti giliran
function changeTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnText.textContent = `Turn for ${currentPlayer}`;
}

// Fungsi untuk mengecek apakah ada pemenang
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameOver = true;
            turnText.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    // Cek seri
    if (!gameBoard.includes('')) {
        gameOver = true;
        turnText.textContent = 'It\'s a Draw!';
    }
}

// Fungsi untuk memulai ulang permainan
function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    turnText.textContent = `Turn for ${currentPlayer}`;
    boxes.forEach(box => {
        box.textContent = '';
        box.style.pointerEvents = 'auto';  // Mengaktifkan klik lagi
    });
}

// Event listener untuk setiap kotak permainan
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (gameOver || gameBoard[index]) return;  // Tidak lakukan apa-apa jika game sudah selesai atau kotak sudah terisi

        gameBoard[index] = currentPlayer;
        box.textContent = currentPlayer;
        box.style.pointerEvents = 'none';  // Menonaktifkan klik setelah pemain mengisi kotak

        checkWinner();  // Cek apakah ada pemenang
        if (!gameOver) {
            changeTurn();  // Ganti giliran pemain
        }
    });
});

// Event listener untuk tombol restart
restartButton.addEventListener('click', restartGame);
