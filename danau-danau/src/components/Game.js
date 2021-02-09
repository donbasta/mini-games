import React from 'react';
import Board from './Board.js';
import Notification from './Notification.js';
import generateBoard from '../utils/generateBoard.js';
import noMoreMoves from '../utils/noMoreMoves.js';
import { cannotPickSquareNeighborOpponent, cannotPickSquareNoWaterNeighbor } from '../utils/cannotPickSquare.js';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: generateBoard(),
            }],
            stepNumber: 0,
            firstPlayerTurn: true,
            invalidMove: null,
        };
        console.log("init", this.state.history[0].squares);
    }

    undo() {
        this.setState({
            stepNumber: Math.max(0, this.stepNumber - 1),
            firstPlayerTurn: !this.state.firstPlayerTurn,
        })
    }

    toggleNotification(msg) {
        this.setState({
            invalidMove: ((this.state.invalidMove != null) ? null : msg),
        })
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const firstPlayerTurn = this.state.firstPlayerTurn;
        if (noMoreMoves(squares, firstPlayerTurn) || (squares[i][j] != null)) {
            return;
        }
        if (cannotPickSquareNeighborOpponent(squares, firstPlayerTurn, i, j)) {
            this.toggleNotification("You cannot choose square adjacent to opponent's one!");
            return;
        }
        if (cannotPickSquareNoWaterNeighbor(squares, i, j)) {
            this.toggleNotification("You cannot choose square with no adjacent water square!");
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
                        message={this.state.invalidMove}
                        closeNotification={this.toggleNotification.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default Game;