function noMoreMoves(board, firstPlayer) {
    const rows = board.length;
    const cols = board[0].length;
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if ((board[i][j] == null)) {
                let adaAir = false;
                let adaTetanggaMusuh = false;
                for (let k = 0; k < 4; k++) {
                    const ni = i + dx[k];
                    const nj = j + dy[k];
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                        if (board[ni][nj] === 'W') {
                            adaAir = true;
                        }
                        if (board[ni][nj] === (firstPlayer ? 1 : 0)) {
                            adaTetanggaMusuh = true;
                        }
                    }
                } 
                if (adaAir && !adaTetanggaMusuh) {
                    return false;
                }
            }
        }
    }
    return true;
}

export default noMoreMoves;