import {
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormLabel from "@material-ui/core/FormLabel";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import React from "react";
import CardItem from "./CardItem";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction } from "../Redux/Transactions/action";

const Label = styled.div`
    text-align: left;
    display: block;
`;
const FieldWrap = styled.div`
    border-bottom: 0.5px solid black;
    padding: 3px;
`;
const Button = styled.button`
    outline: 0px;
    width: 260px;
    height: 50px;
    border: 0px;
    color: white;
    background: #f65636;
    border-radius: 25px;
`;
const ErrWrap = styled.div`
    min-height: 25px;
    font-style: italic;
    color: red;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: "90%",
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
}));

export default function Dashboard() {
    const classes = useStyles();
    const [type, setType] = React.useState("credit");
    const dispatch = useDispatch();
    const transactions = useSelector(
        (state) => state.trans.recentTransactions
    );
    const credit = useSelector((state) => state.trans.credit);
    const debit = useSelector((state) => state.trans.debit);

    const addTransactionHandler = (values) => {
        dispatch(addTransaction({ ...values, type }));
    };
    console.log("dashboard", credit, debit, transactions)
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={2}
                direction="row"
                // flexWrap="nowrap"
                justify="space-between"
                alignItems="center"
            >
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <CardItem
                            title="Total Income"
                            value={credit}
                            footer={<div>Sum of all Credits</div>}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <CardItem
                            title="Total Expenses"
                            value={debit}
                            footer={<div>Sum of all Debits</div>}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <CardItem
                            title="Balance"
                            value={credit - debit}
                            footer={<div>Credit-Debit</div>}
                        />
                    </Paper>
                </Grid>

                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Formik
                        initialValues={{ title: "", amount: "" }}
                        validationSchema={Yup.object({
                            title: Yup.string()
                                .min(3, "Must be 3 characters or more")
                                .required("Required"),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            addTransactionHandler(values);
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        <Form
                            style={{
                                boxShadow: "5px 10px 18px #888888",
                                maxWidth: "400px",
                                zIndex: 3,
                                borderRadius: "20px",
                            }}
                            type="submit"
                        >
                            <div style={{ padding: "10px" }}>
                                <Typography>Enter Transaction</Typography>
                                <Label htmlFor="title">Title</Label>
                                <FieldWrap>
                                    <Field
                                        style={{
                                            outline: "none",
                                            border: "0px",
                                            width: "260px",
                                            borderRadius: "10px",
                                        }}
                                        name="title"
                                        type="text"
                                    />
                                </FieldWrap>
                                <ErrWrap>
                                    <ErrorMessage name="title" />
                                </ErrWrap>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Type
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="position"
                                        name="position"
                                        defaultValue="top"
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                        value={type}
                                    >
                                        <FormControlLabel
                                            value="credit"
                                            control={<Radio color="primary" />}
                                            label="Credit"
                                        />
                                        <FormControlLabel
                                            value="debit"
                                            control={<Radio color="primary" />}
                                            label="Debit"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Label htmlFor="amount">Amount</Label>
                                <FieldWrap>
                                    <Field
                                        style={{
                                            outline: "none",
                                            border: "0px",
                                            width: "260px",
                                            borderRadius: "10px",
                                        }}
                                        name="amount"
                                        type="text"
                                    />
                                </FieldWrap>
                                <br />
                                <Button type="submit">Submit</Button>
                                <br />
                            </div>
                        </Form>
                    </Formik>
                </Grid>

                <Grid item xl={6} lg={8} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography
                                className={classes.header}
                                color="textPrimary"
                            >
                                Transactions-(List of last 5 recent
                                transactions)
                            </Typography>
                            <Divider />
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
