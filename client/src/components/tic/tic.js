import React, { Component } from 'react';
import './tic.css';
const Tic = ({ squares, handleClick, flopped }) => {
    let X = "X", O = "O";
    if (flopped) {
        X = "O";
        O = "X";
    }
    let board = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (squares[i][j] === null) {
                board.push(
                    <div key={`${i}${j}`} className={`square`} onClick={handleClick}>{i}-{j}</div>
                );
            } else if (squares[i][j]) {
                board.push(
                    <div key={`${i}-${j}`} className={`square ${X}`}>{i}-{j}</div>
                );
            } else if (!squares[i][j]) {
                board.push(
                    <div key={`${i}-${j}`} className={`square ${O}`}>{i}-{j}</div>
                );
            }

        }
    }
    return (
        <div className="gameBoard">
            {board}
        </div>
    );
}
export default Tic;
