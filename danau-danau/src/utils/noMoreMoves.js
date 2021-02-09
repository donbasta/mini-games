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

// const B = [[null, null, null, 0, "W"],[1, null, 0, "W", 1],["W", 0, "W", "P", "P"],[0, null, 1, "W", "W"],["W", 1, "W", null, 0]];
// console.log(noMoreMoves(B, false));


// const A = [{state: 2}]
// console.log(A.concat([{state: 3}]));
export default noMoreMoves;