function generateBoard(rows = 10, cols = 10) {
    const c1 = 0.3;
    const c2 = 0.1;
    const board = Array(rows);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(cols).fill(null);
    }
    console.log(board);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const rand = Math.random();
            if (rand < c1) {
                board[i][j] = 'W';
            }
        }
    }
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (board[i][j] == null) {
                let flag = false;
                for (let k = 0; k < 4; k++) {
                    const ni = i + dx[k];
                    const nj = j + dy[k];
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                        if (board[ni][nj] === 'W') {
                            flag = true;
                        }
                    }
                }
                if (flag) {
                    const rand = Math.random();
                    if (rand < c2) {
                        board[i][j] = 'P';
                    }
                }
            }
        }
    }
    return board;
}

export default generateBoard;