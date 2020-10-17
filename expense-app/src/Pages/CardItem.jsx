import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    header: {
        textTransform: "uppercase"
    },
    cardGradient: {
        background:"linear-gradient(135deg, #F7F3E9 0%, #F59ABE 100%)"
        
    }
}));

export default function CardItem({ title, value, footer }) {
    const classes = useStyles();
    return (
        <Card className={classes.cardGradient}>
            <CardContent>
                <Typography
                    gutterBottom
                    className={classes.header}
                    color="textPrimary"
                >
                    {title}
                </Typography>
                <Divider />
                <Typography variant="h3" color="textPrimary">
                    {value}
                </Typography>
                <div>{footer}</div>
            </CardContent>
        </Card>
    );
}