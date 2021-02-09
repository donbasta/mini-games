import React from 'react';
import Board from './Board.js';
import Notification from './Notification.js';
import generateBoard from '../utils/generateBoard.js';
import noMoreMoves from '../utils/noMoreMoves.js';
import cannotPickSquare from '../utils/cannotPickSquare.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: generateBoard(),
            }],
            stepNumber: 0,
            firstPlayerTurn: true,
            invalidMove: false,
        };
        console.log("init", this.state.history[0].squares);
    }

    undo() {
        this.setState({
            stepNumber: Math.max(0, this.stepNumber - 1),
            firstPlayerTurn: !this.state.firstPlayerTurn,
        })
    }

    toggleNotification() {
        this.setState({
            invalidMove: !this.state.invalidMove,
        })
    }

    // showNotification() {
    //     this.setState({
    //         invalidMove: true,
    //     })
    // }

    // closeNotification() {
    //     this.setState({
    //         invalidMove: false,
    //     })
    // }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const firstPlayerTurn = this.state.firstPlayerTurn;
        if (noMoreMoves(squares, firstPlayerTurn) || (squares[i][j] != null)) {
            return;
        }
        if (cannotPickSquare(squares, firstPlayerTurn, i, j)) {
            this.toggleNotification();
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
        console.log(this.state.invalidMove);
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const firstPlayerTurn = this.state.firstPlayerTurn;
        const gameEnds = noMoreMoves(current.squares, firstPlayerTurn);

        let status = '';
        if (gameEnds) {
            status = 'Player ' + (firstPlayerTurn ? 'second' : 'first') + ' wins!';
        } else {
            status = 'Player ' + (firstPlayerTurn ? 'first' : 'second') + ', it\'s your turn!';
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        firstPlayerTurn={firstPlayerTurn}
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
                {this.state.invalidMove ?
                    <Notification
                        closeNotification={this.toggleNotification.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default Game;