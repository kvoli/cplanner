import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  requirements: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
    height: '40%',
    //backgroundColor: '#00BBFF'
  }
}));

const Requirements = () => {
  const classes = useStyles();
  return (
    <Container className={classes.requirements}>
      <Grid container direction='row'>
        <Grid item xs={4}>
          <Typography>Course</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Subject</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Major</Typography>
        </Grid>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={4}>
        <Grid item xs={4}>
          <Typography>...</Typography>
        </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography>...</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>...</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Requirements;