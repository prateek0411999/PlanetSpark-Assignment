import React, { Component } from 'react'
import DisplayScore from '../displayScore/display';
import TicTakToe from '../tic/tic';
import Message from '../message/message';
import _ from 'lodash';
import './game.css';
let displayScore = [];

class game extends Component {

    state = {
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        computer: false,
        notChoosen: true,
        flopped: false,
        winnerMessage: null,
        reset: false,
        over: false,
        continue: false,
        score: []
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.winnerMessage && nextState.winnerMessage) return false;
        return true;
    }
    componentDidUpdate() {

        setTimeout(() => {
            const winner = this.findWinner(this.state.board);
            if (winner !== null) {
                const winnerMessage = winner === 1 ? "You Won" : winner === 0 ? "You Lost" : "Tie";

                if (!this.state.over) {
                    displayScore.push(winnerMessage);
                }

                this.setState({ winnerMessage, score: displayScore, over: true });

            }
            if (this.state.computer) {
                let newBoard = this.bestMove(this.state.board);
                this.setState({ board: newBoard, computer: false });
            }
        }, 200);
    }
    bestMove = (board) => {
        return this.miniMax(board, false)[1];
    }
    miniMax = (board, player) => {
        var winner = this.findWinner(board);
        if (winner != null) {
            switch (winner) {
                case 1:
                    return [1, board]
                case 0:
                    return [-1, board]
                case -1:
                    return [0, board];
            }
        } else {
            var nextVal = null;
            var nextBoard = null;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] == null) {
                        board[i][j] = player;
                        var value = this.miniMax(board, !player)[0];
                        if (
                            (player && (nextVal == null || value > nextVal)) ||
                            (!player && (nextVal == null || value < nextVal))
                        ) {
                            nextBoard = board.map(function (arr) {
                                return arr.slice();
                            });
                            nextVal = value;
                        }
                        board[i][j] = null;
                    }
                }
            }
            return [nextVal, nextBoard];
        }
    }
    findWinner = (board) => {
        // if (_.isNull(board) === null) {
        //     return "nothing"
        // }
        let allNotNull = true;
        let val = [true, false];

        for (var k = 0; k < val.length; k++) {
            var value = val[k];

            var diagonal1 = true;
            var diagonal2 = true;
            for (var i = 0; i < 3; i++) {
                if (board[i][i] != value) {
                    diagonal1 = false;
                }
                if (board[2 - i][i] != value) {
                    diagonal2 = false;
                }
                var rowComplete = true;
                var colComplete = true;
                for (var j = 0; j < 3; j++) {
                    if (board[i][j] != value) {
                        rowComplete = false;
                    }
                    if (board[j][i] != value) {
                        colComplete = false;
                    }
                    if (board[i][j] == null) {
                        allNotNull = false;
                    }
                }
                if (rowComplete || colComplete) {
                    return value ? 1 : 0;
                }
            }
            if (diagonal1 || diagonal2) {
                return value ? 1 : 0;
            }
        }
        if (allNotNull) {
            return -1;
        }
        return null;
    }


    handleClick = (e) => {
        if (this.state.notChoosen || this.state.computer) return;

        const row = e.target.innerText.split("-")[0];
        const col = e.target.innerText.split("-")[1];
        let newBoard = this.state.board.slice();
        newBoard[row][col] = true;
        this.setState({ board: newBoard, computer: true });
    }

    selectX = () => {
        this.setState({ notChoosen: false })
    }

    selectO = () => {
        this.setState({ notChoosen: false, computer: true, flopped: true });
    }
    reset = () => {
        displayScore = [];
        this.setState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            computer: false,
            notChoosen: true,
            flopped: false,
            winnerMessage: null,
            score: [],
            over: false

        });
    }
    continue = () => {
        this.setState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            computer: false,
            notChoosen: true,
            flopped: false,
            winnerMessage: null,
            over: false,
            continue: true
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="display">
                    <DisplayScore
                        score={this.state.score}
                    />
                </div>
                <div className="game">
                    <div className="reset">
                        <button className="button" onClick={this.reset}>Reset</button>
                        <button className="button continue" onClick={this.continue}>Continue</button>
                    </div>
                    <TicTakToe
                        squares={this.state.board}
                        handleClick={this.handleClick}
                        flopped={this.state.flopped}
                    />
                    <div className="under">
                        <Message
                            notChoosen={this.state.notChoosen}
                            computer={this.state.computer}
                            winnerMessage={this.state.winnerMessage}
                        />
                        {this.state.notChoosen &&
                            <div>
                                <button className="button x" onClick={this.selectX}>X</button>
                                <button className="button o" onClick={this.selectO}>O</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default game
