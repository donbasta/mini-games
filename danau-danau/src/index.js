import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';

function Square(props) {
    switch(props.value) {
        case 'W':
            return (
                <button 
                    className="square-water"
                    onClick={props.onClick}
                >
                </button>
            );
        case 'P':
            return (
                <button 
                    className="square-protected"
                    onClick={props.onClick}
                >
                </button>
            );
        default:
            return (
                <button 
                    className="square"
                    onClick={props.onClick}
                >
                    {props.value}
                </button>
            );
    }
}

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square 
                value={this.props.squares[i][j]} 
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        const squares = this.props.squares;
        console.log(squares)
        const rows = squares.length;
        const cols = squares[0].length;
        const expandRow = (indexRow) => {
            let ret = [];
            for (let i = 0; i < cols; i++) {
                ret.push(this.renderSquare(indexRow, i));
            }
            return ret;
        };
        const processRow = () => {
            let ret = [];
            for (let i = 0; i < rows; i++) {
                ret.push(
                    <div key={i} className="board-row">
                        {expandRow(i)}
                    </div>
                );
            }
            return ret;
        }

        return (
            <div>
                {processRow()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: generateBoard(),
            }],
            stepNumber: 0,
            firstPlayerTurn: true,
        };
        console.log("init", this.state.history[0].squares);
    }

    undo() {
        this.setState({
            stepNumber: Math.max(0, this.stepNumber - 1),
            firstPlayerTurn: !this.state.firstPlayerTurn,
        })
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const firstPlayerTurn = this.state.firstPlayerTurn;
        if (noMoreMoves(squares, firstPlayerTurn) || squares[i][j]) {
            return;
        }
        squares[i][j] = this.state.firstPlayerTurn ? 0 : 1;
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            firstPlayerTurn: !this.state.firstPlayerTurn,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const firstPlayerTurn = this.state.firstPlayerTurn;
        const gameEnds = noMoreMoves(current.squares, firstPlayerTurn);

        let status = '';
        if (gameEnds) {
            status = 'Player ' + (firstPlayerTurn ? 'second' : 'first') + ' wins!';
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i, j) => this.handleClick(i, j)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.undo()}>
                        Undo
                    </button>
                </div>
            </div>
        );
    }
}

function noMoreMoves(board, firstPlayer) {
    const rows = board.length;
    const cols = board[0].length;
    const dx = [1, -1, 0, 0];
    const dy = [0, 0, 1, -1];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!board[i][j]) {
                let adaAir = false;
                let adaTetanggaMusuh = false;
                for (let k = 0; k < 4; k++) {
                    const ni = i + dx[k];
                    const nj = j + dy[k];
                    if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
                        adaAir |= (board[ni][nj] === 'W');
                        adaTetanggaMusuh |= (board[ni][nj] === (firstPlayer ? 1 : 0));
                    }
                } 
                if (adaAir && !adaTetanggaMusuh) {
                    return true;
                }
            }
        }
    }
    return false;
}

function generateBoard(rows = 30, cols = 30) {
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

ReactDOM.render(
    <React.StrictMode>
        <Game />
    </React.StrictMode>,
    document.getElementById('root')
);
