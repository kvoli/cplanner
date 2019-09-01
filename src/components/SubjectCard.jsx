import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 10,
    width: 110,
    height: 110
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center'
  },
  title: {
    paddingTop: 10
  }
}));

const SubjectCard = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent className={classes.text}>
          <Typography>COMP20007</Typography>
          <Typography className={classes.title}>Design of Algorithms</Typography>
        </CardContent>
      </Card>    
    </Grid>
  );
}

export default SubjectCard;