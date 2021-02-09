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
        case 0:
            return (
                <button
                    className="square player-1"
                    onClick={props.onClick}
                >
                </button>
            )
        case 1:
            return (
                <button
                    className="square player-2"
                    onClick={props.onClick}
                >
                </button>
            )
        default:
            return (
                <button 
                    className={"square " + (props.firstPlayerTurn ? "player-1-turn" : "player-2-turn")} 
                    onClick={props.onClick}
                >
                    {props.value}
                </button>
            );
    }
}

export default Square;