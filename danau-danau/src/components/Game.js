import React from 'react';
import Board from './Board.js';
import Notification from './Notification.js';
import generateBoard from '../utils/generateBoard.js';
import noMoreMoves from '../utils/noMoreMoves.js';
import { cannotPickSquareNeighborOpponent, cannotPickSquareNoWaterNeighbor } from '../utils/cannotPickSquare.js';
import '../styles/Game.css';

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
            isGameOver: 0,
            winner: null,
        };
    }

    undo() {
        if (this.state.isGameOver > 0) {
            return;
        }
        if (this.state.stepNumber === 0) {
            return;
        }
        this.setState({
            stepNumber: (this.state.stepNumber - 1),
            firstPlayerTurn: !this.state.firstPlayerTurn,
        })
    }

    toggleNotification(msg) {
        this.setState({
            invalidMove: ((this.state.invalidMove != null) ? null : msg),
        })
    }

    closeGameOverNotification() {
        this.setState({
            isGameOver: 2,
        })
    }

    checkIsGameOver(squares, firstPlayerTurn) {
        if (noMoreMoves(squares, firstPlayerTurn)) {
            this.setState({
                isGameOver: 1,
                winner: (firstPlayerTurn ? 2 : 1),
            })
        }
    }

    handleClick(i, j) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = JSON.parse(JSON.stringify(history[history.length - 1]));
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
        this.checkIsGameOver(squares, !firstPlayerTurn);
        this.setState({
            stepNumber: history.length,
            history: [
                ...history,
                { squares: squares },
            ],
            firstPlayerTurn: !this.state.firstPlayerTurn,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const firstPlayerTurn = this.state.firstPlayerTurn;

        let status = '';
        if (this.state.isGameOver > 0) {
            status = 'Player ' + (this.state.winner === 2 ? 'second' : 'first') + ' wins!';
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
                    {this.state.isGameOver === 0 ?
                        <button onClick={() => {this.undo()}}>
                            Undo
                        </button>
                        : null
                    }
                </div>
                {this.state.invalidMove ?
                    <Notification
                        message={this.state.invalidMove}
                        closeNotification={this.toggleNotification.bind(this)}
                    />
                    : null
                }
                {this.state.isGameOver === 1 ?
                    <Notification
                        message={"Player " + (this.state.winner === 1 ? "first" : "second") + " wins!"}
                        closeNotification={this.closeGameOverNotification.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}

export default Game;