import { Card, CardContent, Typography, Divider, Grid } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormLabel from '@material-ui/core/FormLabel';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import React from "react";
import CardItem from './CardItem'
const Label = styled.div`
text-align:left;
display:block;
`
const FieldWrap = styled.div`
border-bottom: 0.5px solid black;
padding:3px;
`
const Button = styled.button`
outline:0px;
width:260px;
height:50px;
border:0px;
color:white;
background:#F65636;
border-radius:25px
`
const ErrWrap = styled.div`
min-height:25px;
font-style:italic;
color:red
`

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
        background:"linear-gradient(135deg, #D5E1DD 0%, #747E80 100%)"        
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
    }
}));

export default function Dashboard() {
    const [products, setProducts] = React.useState([])
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="row" flexWrap="nowrap"
                justify="space-between"
                alignItems="center">
                <Grid item xs={3} >
                    <Paper className={classes.paper} >
                        <CardItem
                            title="Total Income"
                            value="10000"
                            footer={<div>Sum of all Credits</div>}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3} >
                    <Paper className={classes.paper}>
                        <CardItem
                            title="Total Expenses"
                            value="10000"
                            footer={<div>Sum of all Debits</div>}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={3} >
                    <Paper className={classes.paper}>
                        <CardItem
                            title="Balance"
                            value="10000"
                            footer={<div>Credit-Debit</div>}
                        />
                    </Paper>
                </Grid>
               
                <Grid item xl={6} lg={4} md={12} sm={12} xs={12}>
                    <Card className={classes.cardGradient}>
                        <CardContent>
                            <Formik
                                initialValues={{ title: "" }}
                                validationSchema={Yup.object({
                                    title: Yup.string()
                                        .min(3, 'Must be 3 characters or more')
                                        .required('Required'),
                                })}
                                onSubmit={(values, { setSubmitting }) => {
                                    this.handleSubmit(values)
                                    setTimeout(() => {
                                        setSubmitting(false);
                                    }, 400);
                                }}
                            >
                                <Form className={classes.cardGradient} style={{ boxShadow: "5px 10px 18px #888888", maxWidth: "400px", zIndex: 3, borderRadius: "20px" }}>
                                    <div style={{ padding: "10px" }}>
                                        <Typography>Enter Transaction</Typography>
                                        <Label htmlFor="title">Title</Label>
                                        <FieldWrap>
                                            <Field style={{
                                                outline: "none",
                                                border: "0px",
                                                width: "260px",
                                                borderRadius:"10px",
                                                background:"linear-gradient(135deg, #D5E1DD 0%, #747E80 100%)" 
                                            }} name="title" type="text" />
                                        </FieldWrap>
                                        <ErrWrap><ErrorMessage name="title" /></ErrWrap>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Type</FormLabel>
                                            <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                                <FormControlLabel value="credit" control={<Radio color="primary" />} label="Credit" />
                                                <FormControlLabel value="debit" control={<Radio color="primary" />} label="Debit" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Label htmlFor="amount">Amount</Label>
                                        <FieldWrap>
                                            <Field style={{
                                                outline: "none",
                                                border: "0px",
                                                width: "260px",
                                                borderRadius:"10px",
                                                background:"linear-gradient(135deg, #D5E1DD 0%, #747E80 100%)" 
                                            }} name="amount" type="text" />
                                        </FieldWrap><br />
                                        <Button>Submit</Button><br />
                                    </div>
                                </Form>
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xl={6} lg={8} md={12} sm={12} xs={12}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.header} color="textPrimary">
                                Transactions-(List of last 5 recent transactions)
                            </Typography>
                            <Divider />
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Type</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Time Stamp</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    {row.type}
                                                </TableCell>
                                                <TableCell align="right">{row.title}</TableCell>
                                                <TableCell align="right">{row.time}</TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
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
