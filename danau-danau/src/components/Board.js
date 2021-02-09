import React from 'react';
import Square from './Square.js';
import '../styles/Board.css';

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square 
                key={j}
                firstPlayerTurn={this.props.firstPlayerTurn}
                value={this.props.squares[i][j]} 
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        const squares = this.props.squares;
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

export default Board;