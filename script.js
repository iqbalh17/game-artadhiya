let words = [
    ['karat', 0, 0, 'a'],
    ['tenang', 0, 4, 'd'],
    ['berdiri', 1, 3, 'a'],
    ['mahad', 3, 1, 'a'],
    ['silang', 0, 7, 'd'],
];

let words_num = words.length;
let max_height = 0;
let max_width = 0;

for (let i = 0; i < words_num; i++) {
    if (words[i][3] === 'a') max_width = Math.max(max_width, words[i][2] + words[i][0].length); 
    else max_height = Math.max(max_height, words[i][1] + words[i][0].length);
}

let crosswordBoard = document.getElementById('crossword-board');
crosswordBoard.style.width = `${max_width * 7}vi`;
crosswordBoard.style.height = `${max_height * 10}vi`;

let board = new Array(max_height).fill(null).map(() => new Array(max_width).fill('-'));
let isShown = new Array(max_height).fill(null).map(() => new Array(max_width).fill(0));
let isRevealed = new Array(words_num).fill(0);

for (let i = 0; i < words_num; i++) {
    for (let j = 0; j < words[i][0].length; j++) {
        let x = words[i][3] === 'a' ? words[i][1] : words[i][1] + j;
        let y = words[i][3] === 'a' ? words[i][2] + j : words[i][2];
        board[x][y] = words[i][0][j];
    }
}

var crossword_rows = document.getElementById('crossword-board');

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {

        let id = ["item", i + 1, "-", j + 1].join('');
        let char = board[i][j];

        if (char == '-') {
            let span = document.createElement("span");
            span.id = id;
            span.className = "crossword-board__item--blank";
            crossword_rows.appendChild(span);
        } 
        else {
            let box = document.createElement("div");
            box.id = id;
            box.className = "crossword-board__item";
            box.setAttribute("role", "presentation");

            crossword_rows.appendChild(box);

            for (let k = 0; k < words_num; k++) {
                let curx = words[k][1];
                let cury = words[k][2];

                if (i === curx && j === cury) {
                    let num = document.createElement("div");
                    num.className = 'crossword-board-num';
                    num.textContent = k+1;
                    box.appendChild(num);
                }
            }
        }
    }
}

let onQuestion = false;
document.addEventListener("keydown", function(event) {
    let num = parseInt(event.key, 10) - 1;

    // reveal answer
    if (event.ctrlKey && Number.isInteger(num) && num < words_num && isRevealed[num] === 0) {
        event.preventDefault();

        for (let j = 0; j < words[num][0].length; j++) {
            let delay = j * 250;

            setTimeout(() => {
                let id = words[num][3] === 'a' 
                        ? ["item", words[num][1] + 1, "-", words[num][2] + j + 1].join('')
                        : ["item", words[num][1] + j + 1, "-", words[num][2] + 1].join('');

                let box = document.getElementById(id);
                let text = document.createTextNode(words[num][0][j]);
                let element = document.createElement("div");

                element.appendChild(text);

                let x = words[num][3] === 'a' 
                ? words[num][1]
                : words[num][1] + j;
                let y = words[num][3] === 'a'
                ? words[num][2] + j
                : words[num][2];
                
                if (isShown[x][y] === 0) {
                    element.classList.add('animate-entrance'); 
                    box.appendChild(element);
                    isShown[x][y] = 1;
                } else {
                    let removeIndex = box.children.length === 2 ? 1 : 0;
                    box.removeChild(box.children[removeIndex]);
                    element.classList.add('animate-entrance'); 
                    box.appendChild(element);
                }
            }, delay);
        }

        isRevealed[num] = 1;
    }

    // wrong answer
    if (event.altKey && event.key === "w") {
        event.preventDefault();
        
    }

    // reveal question

    if (event.altKey && Number.isInteger(num) && num < words_num) {
        event.preventDefault();
        
    }
});
