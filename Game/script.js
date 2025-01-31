let board = new Array(10).fill(null).map(() => new Array(10).fill('-'));

let words = [
    ['suratan', 0, 0, 'a'],
    ['tenang', 0, 4, 'd'],
    ['berdiri', 1, 3, 'a']
];

for (let i = 0; i < words.length; i++) {
    if (words[i][3] === 'a') {
        for (let j = 0; j < words[i][0].length; j++) {
            board[words[i][1]][words[i][2]+j] = words[i][0][j];
        }     
    } else {
        for (let j = 0; j < words[i][0].length; j++) {
            board[words[i][1]+j][words[i][2]] = words[i][0][j];
        }
    }
}

for (let row of board) {
    console.log(row.join(''));
}