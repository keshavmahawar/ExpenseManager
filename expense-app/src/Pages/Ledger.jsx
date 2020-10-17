import { Card, CardContent, Typography, Divider, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Pagination from '@material-ui/lab/Pagination';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from "react";

function createData(type, title, time, amount) {
    return { type, title, time, amount };
}

const rows = [
    createData('Credit', 'Bank', "2020-10-11T12:16:07.304Z", 5000),
    createData('Credit', 'Salary', "2020-10-11T12:16:07.304Z", 2000),
    createData('Debit', 'Share', "2020-10-11T12:16:07.304Z", 70000),
    createData('Debit', 'Profit', "2020-10-11T12:16:07.304Z", 6000),
    createData('Credit', 'Share', "2020-10-11T12:16:07.304Z", 3000),
];

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: "90%",
    },
    cardGradient: {
        background: "linear-gradient(135deg, #D5E1DD 0%, #747E80 100%)"
    },
    tabs: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    paper: {
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    header: {
        textTransform: "uppercase"
    },
    page1: {
        width: "100%"
    },
    page2: {
        '& > * + *': {
            marginTop: theme.spacing(2),
            display: "block",
            border: "none",
            outline: "none",
            flexGrow: 1,
        },
    },
}));

export default function Ledger() {
    const [products, setProducts] = React.useState([])
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = (param) => {
        console.log(param)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="row" flexWrap="nowrap"
                justify="space-between"
                alignItems="center">
                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="ALL" onClick={() => handleClick('all')} />
                            <Tab label="CREDIT" onClick={() => handleClick('shipped')} />
                            <Tab label="DEBIT" onClick={() => handleClick('processed')} />
                        </Tabs>
                    </Paper>
                </Grid>

                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.header} color="textPrimary">
                                All Transactions
                            </Typography>
                            <Divider />
                            <Paper className={classes.page1}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Type</TableCell>
                                                <TableCell align="center">Title</TableCell>
                                                <TableCell align="center">Time Stamp</TableCell>
                                                <TableCell align="center">Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.type}
                                                    </TableCell>
                                                    <TableCell align="center">{row.title}</TableCell>
                                                    <TableCell align="center">{row.time}</TableCell>
                                                    <TableCell align="center">{row.amount}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            <div className={classes.page2}>
                                <Typography>Page: {page}</Typography>
                                <Pagination count={10} variant="outlined" color="secondary" page={page} onChange={handlePageChange} />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
