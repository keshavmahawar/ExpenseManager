import {
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ledger } from "../Redux/Transactions/action";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: "90%",
    },
    cardGradient: {
        background: "linear-gradient(135deg, #D5E1DD 0%, #747E80 100%)",
    },
    tabs: {
        flexGrow: 1,
    },
    table: {
        minWidth: 650,
    },
    paper: {
        textAlign: "left",
        color: theme.palette.text.secondary,
    },
    header: {
        textTransform: "uppercase",
    },
    page1: {
        width: "100%",
    },
    page2: {
        "& > * + *": {
            marginTop: theme.spacing(2),
            display: "block",
            border: "none",
            outline: "none",
            flexGrow: 1,
        },
    },
}));

export default function Ledger() {
    const transactions = useSelector(
        (state) => state.transactions.ledgerTransactions
    );
    const dispatch = useDispatch();
    const totalPage = useSelector((state) => state.transactions.totalPage);
    const pageState = useSelector((state) => state.transactions.page);
    const type = useSelector((state) => state.transactions.type);

    const classes = useStyles();
    const typeArray = ["all", "credit", "debit"];
    const [value, setValue] = React.useState(
        typeArray.findIndex((item) => item === type)
    );
    const [page, setPage] = React.useState(pageState);
    const handlePageChange = (event, pageValue) => {
        setPage(pageValue);
        dispatch(ledger({ page: pageValue, type: typeArray[value] }));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (type) => {
        dispatch(ledger({ page: 1, type }));
    };
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                flexWrap="nowrap"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Paper className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab
                                label="ALL"
                                onClick={() => handleClick("all")}
                            />
                            <Tab
                                label="CREDIT"
                                onClick={() => handleClick("credit")}
                            />
                            <Tab
                                label="DEBIT"
                                onClick={() => handleClick("debit")}
                            />
                        </Tabs>
                    </Paper>
                </Grid>

                <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                className={classes.header}
                                color="textPrimary"
                            >
                                All Transactions
                            </Typography>
                            <Divider />
                            <Paper className={classes.page1}>
                                <TableContainer component={Paper}>
                                    <Table
                                        className={classes.table}
                                        aria-label="simple table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Type</TableCell>
                                                <TableCell align="center">
                                                    Title
                                                </TableCell>
                                                <TableCell align="center">
                                                    Time Stamp
                                                </TableCell>
                                                <TableCell align="center">
                                                    Amount
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {transactions.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {row.type}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.timestamp}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {row.amount}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            <div className={classes.page2}>
                                <Typography>Page: {page}</Typography>
                                <Pagination
                                    count={totalPage}
                                    variant="outlined"
                                    color="secondary"
                                    page={page}
                                    onChange={handlePageChange}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
