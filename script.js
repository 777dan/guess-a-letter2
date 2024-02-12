var words = ["программа", "фреймворк", "матрица"];
var word = ""; // слово
var remain = 0; // сколько осталось угадать букв
var answer = []; // массив, в который будет записано слово игрока
var guess = ""; // переменная для буквы игрока
var counter = 0; // Сколько было всего сделано ходов

// Настройка элемента холста canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Получаем ширину и высоту элемента canvas
var width = canvas.width; // ширина холста
var height = canvas.height; // высота холста
var figure; // фигура, которую будем рисовать




// Функция для рисования рамки
var drawCanvasBorder = function () {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = "red";
    ctx.stroke();
};

// Выводим оставшееся количество ходов
var drawRemain = function () {
    ctx.clearRect(0, 0, width, height); // очистка холста
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(
        "Осталось угадать: " +
        remain +
        " Всего было сделано шагов " +
        counter,
        10,
        height - 20
    );
};

// Выводим результат игры
var drawResult = function (res) {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Red";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Игра окончена! " + res, 10, height - 40);
};

// Выводим слово
var drawWord = function () {
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(answer.join(" "), width / 2, 30);
};

// Задаем конструктор Figure (фигура)
var Figure = function () {
    this.n = 0;
};

// Рисуем фигуру в зависимости от номера проигрышного кода
Figure.prototype.drawPart = function () {
    ctx.fillStyle = "Red";
    ctx.beginPath();
    switch (this.n) {
        case 1:
            ctx.arc(100, 50, 30, 0, Math.PI * 2, false);
            break;
        case 2:
            ctx.arc(100, 50, 30, 0, Math.PI * 2, false);
            ctx.moveTo(100, 80);
            ctx.lineTo(100, 150);
            break;
        case 3:
            ctx.arc(100, 50, 30, 0, Math.PI * 2, false);
            ctx.moveTo(100, 80);
            ctx.lineTo(100, 150);
            ctx.moveTo(100, 90);
            ctx.lineTo(50, 120);
            ctx.moveTo(100, 90);
            ctx.lineTo(150, 120);
            break;
        case 4:
            ctx.arc(100, 50, 30, 0, Math.PI * 2, false);
            ctx.moveTo(100, 80);
            ctx.lineTo(100, 150);
            ctx.moveTo(100, 90);
            ctx.lineTo(50, 120);
            ctx.moveTo(100, 90);
            ctx.lineTo(150, 120);
            ctx.moveTo(100, 150);
            ctx.lineTo(50, 200);
            ctx.moveTo(100, 150);
            ctx.lineTo(150, 200);
            break;
    }
    ctx.stroke();
};

function play() {
    var randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex]; // слово
    remain = word.length - 2; // сколько осталось угадать букв

    answer[0] = word[0];

    // Массив для слова - начальный вид
    answer[word.length - 1] = word[word.length - 1];
    for (var i = 1; i < word.length - 1; i++) {
        answer[i] = "_";
    }

    drawRemain();
    drawWord();
    drawCanvasBorder();

    figure = new Figure();
}

// ход игрока и проверка
function check() {
    guess = prompt("");
    counter++;
    var guessOK = false; // угадал или не угадал букву
    for (var i = 1; i < word.length - 1; i++) {
        if (word[i] === guess) {
            answer[i] = guess;
            guessOK = true;
            remain--;
        }
    }
    if (remain < 0) remain = 0;
    drawRemain();
    drawWord();
    drawCanvasBorder();
    if (!guessOK) {
        figure.n++;
    }
    figure.drawPart();
    if (remain == 0) {
        var res = "Вы выиграли!";
        drawResult(res, counter);
    }
}