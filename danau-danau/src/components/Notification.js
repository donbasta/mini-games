import React from 'react';
import '../styles/Notification.css';

class Notification extends React.Component {
    render() {
        return (
            <div 
                className="popup-holder"
                onClick={this.props.closeNotification}
            >
                <div
                    className="popup-container"
                >
                    You cannot choose square adjacent to opponent's one!
                </div>
            </div>
        );
    }
}


export default Notification;