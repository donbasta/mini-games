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
                    {this.props.message}
                </div>
            </div>
        );
    }
}


export default Notification;