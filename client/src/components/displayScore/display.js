import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});


const Display = (props) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tic Tac Toe Games</TableCell>
                        <TableCell align="right">You </TableCell>
                        <TableCell align="right">Computer</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!_.isEmpty(props.score) ? props.score.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                                Game {idx + 1}
                            </TableCell>
                            <TableCell align="right">{row === "You won" ? 1 : row === "You lost" ? 0 : 0}</TableCell>
                            <TableCell align="right">{row === "You won" ? 0 : row === "You lost" ? 1 : 0}</TableCell>

                        </TableRow>
                    )) : <TableRow><TableCell>No Games Played Yet</TableCell></TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default Display;