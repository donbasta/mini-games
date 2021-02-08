function cannotPickSquare(board, firstPlayer, r, c) {
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    const row = board.length;
    const col = board[0].length;
    for (let i = 0; i < 4; i++) {
        const nr = r + dx[i];
        const nc = c + dy[i];
        if (nr >= 0 && nr < row && nc >= 0 && nc < col) {
            if (board[nr][nc] === (firstPlayer ? 1 : 0)) {
                return true;
            }
        }
    }
    return false;
}

export default cannotPickSquare;