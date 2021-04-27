import React, { Component } from 'react';
import './message.css';

class Message extends Component {
    render() {
        if (this.props.winnerMessage) {
            return (<div className="message">{this.props.winnerMessage}</div>);
        }
        return (
            <div className="message">
                {this.props.notChoosen && <span>X or O? (X plays first)</span>}
                {(this.props.computer && !this.props.notChoosen) && <span>Computer turn...</span>}
                {(!this.props.computer && !this.props.notChoosen) && <span>Your turn...</span>}
            </div>
        );
    }
}



export default Message
