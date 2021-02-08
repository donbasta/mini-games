import React from 'react';
import '../styles/Board.css';

function Square(props) {
    switch(props.value) {
        case 'W':
            return (
                <button 
                    className="square water"
                    onClick={props.onClick}
                >
                </button>
            );
        case 'P':
            return (
                <button 
                    className="square protected"
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

export default Board;