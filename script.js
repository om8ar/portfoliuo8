// تحديد العناصر الأساسية
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');
const popup = document.querySelector('.popup');
const popupMessage = document.querySelector('.popup-message');
const popupButton = document.querySelector('.popup-button');

let board = Array(9).fill(''); // مصفوفة فارغة تمثل الخلايا
let currentPlayer = 'X'; // اللاعب الحالي
let isGameActive = true; // حالة اللعبة (نشطة أو متوقفة)

// الترتيبات الفائزة
const winConditions = [
  [0, 1, 2], // الصف الأول
  [3, 4, 5], // الصف الثاني
  [6, 7, 8], // الصف الثالث
  [0, 3, 6], // العمود الأول
  [1, 4, 7], // العمود الثاني
  [2, 5, 8], // العمود الثالث
  [0, 4, 8], // القطر الأول
  [2, 4, 6], // القطر الثاني
];

// تحديث محتوى الخلية
function updateCell(index) {
  board[index] = currentPlayer;
  cells[index].setAttribute('data-content', currentPlayer === 'X' ? '❌' : '⭕');
}

// التحقق من الفوز أو التعادل
function checkGameStatus() {
  // التحقق من الفوز
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameActive = false;
      showPopup(`${currentPlayer} Wins! 🎉`);
      return;
    }
  }

  // التحقق من التعادل
  if (!board.includes('')) {
    isGameActive = false;
    showPopup("It's a Draw! 🤝");
    return;
  }
}

// تبديل اللاعب
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// إعادة تعيين اللعبة
function resetGame() {
  board.fill('');
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => cell.setAttribute('data-content', ''));
  popup.classList.add('hidden');
}

// التعامل مع نقرة الخلية
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  // منع اللعب في الخلايا الممتلئة أو إذا كانت اللعبة منتهية
  if (board[index] || !isGameActive) return;

  updateCell(index);
  checkGameStatus();

  if (isGameActive) switchPlayer();
}

// عرض نافذة الإشعار
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove('hidden');
}

// إضافة مستمعات الأحداث
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
popupButton.addEventListener('click', resetGame);
