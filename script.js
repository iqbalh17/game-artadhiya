// the crossword's words
let words = [
    ['karat', 0, 0, 'a', 'question 1'],
    ['tenang', 0, 4, 'd', 'question 2'],
    ['berdiri', 1, 3, 'a', 'question 3'],
    ['mahad', 3, 1, 'a', 'question 4'],
    ['silang', 0, 7, 'd', 'question 5'],
];

let max_height = 0;
let max_width = 0;

// find max height and max width
for (let i = 0; i < words.length; i++) {
    if (words[i][3] === 'a') max_width = Math.max(max_width, words[i][2] + words[i][0].length); 
    else max_height = Math.max(max_height, words[i][1] + words[i][0].length);
}

// create the parent board
let crosswordBoard = document.getElementById('crossword-board');
crosswordBoard.style.width = `${max_width * 6.5}vi`;
crosswordBoard.style.height = `${max_height * 10}vi`;

// generate arrays
let board = new Array(max_height).fill(null).map(() => new Array(max_width).fill('-'));
let isShown = new Array(max_height).fill(null).map(() => new Array(max_width).fill(0));
let isRevealed = new Array(words.length).fill(0);

// map the words to the board
for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i][0].length; j++) {
        let x = words[i][3] === 'a' ? words[i][1] : words[i][1] + j;
        let y = words[i][3] === 'a' ? words[i][2] + j : words[i][2];
        board[x][y] = words[i][0][j];
    }
}

// append child element to the main board
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        
        let id = ['item', i + 1, '-', j + 1].join('');
        let char = board[i][j];
        
        if (char === '-') {
            let span = document.createElement('span');
            span.id = id;
            span.className = 'crossword-board__item--blank';
            var crossword_rows = document.getElementById('crossword-board');
            crossword_rows.appendChild(span);
        } 
        else {
            let box = document.createElement('div');
            box.id = id;
            box.className = 'crossword-board__item';
            box.setAttribute('role', 'presentation');

            var crossword_rows = document.getElementById('crossword-board');
            crossword_rows.appendChild(box);

            for (let k = 0; k < words.length; k++) {
                let curx = words[k][1];
                let cury = words[k][2];

                if (i === curx && j === cury) {
                    let num = document.createElement('div');
                    num.className = 'crossword-board-num';
                    num.textContent = k+1;
                    box.appendChild(num);
                }
            }
        }
    }
}

// generate question page
for (let i = 0; i < words.length; i++) {
    let div = document.createElement('div');
    let text = document.createElement('p');
    div.className = ['question', i].join('');
    text.textContent = words[i][4];
    div.appendChild(text);
    div.style.opacity = `0%`;
}

let onQuestion = false;

// event on keydown
document.addEventListener('keydown', function(event) {
    let num = parseInt(event.key, 10) - 1;

    // reveal answer
    if (event.ctrlKey && Number.isInteger(num) && num < words.length && isRevealed[num] === 0) {
        for (let j = 0; j < words[num][0].length; j++) {
            let delay = j * 200;

            setTimeout(() => {
                let id = words[num][3] === 'a' 
                        ? ['item', words[num][1] + 1, '-', words[num][2] + j + 1].join('')
                        : ['item', words[num][1] + j + 1, '-', words[num][2] + 1].join('');

                let box = document.getElementById(id);
                let text = document.createTextNode(words[num][0][j]);
                let element = document.createElement('div');

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

        // do correct bells and green overlay

        isRevealed[num] = 1;
    }

    // wrong answer
    if (event.altKey && event.key === 'w') {
        
    }

    // show question
    if (event.altKey && Number.isInteger(num) && num < words.length) {        
        const curtain = document.getElementById('curtain-video');
        curtain.play();

        let cur_id = ['question', num].join('');
        let cur_div = document.getElementById(cur_id);
        
        if (onQuestion) {
            cur_div.style.opacity = `0%`;
            onQuestion = false;
        }
        else {
            cur_div.style.opacity = `100%`;
            onQuestion = true;
        }
    }
});
