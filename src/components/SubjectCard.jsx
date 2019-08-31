import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 10,
    width: 100,
    height: 100
  }
}));

const SubjectCard = () => {
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent>
          <Typography>Design of Algorithms</Typography>
        </CardContent>
      </Card>    
    </Grid>
  );
}

export default SubjectCard;