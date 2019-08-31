import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  requirements: {
    padding: 0,
    margin: 0,
    textAlign: 'center'
  }
}));

const Requirements = () => {
  const classes = useStyles();
  return (
    <Container className={classes.requirements}>
      <Grid container style={{backgroundColor: '#FF1b1b'}} direction='row'>
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
      <Grid container style={{backgroundColor: '#1bFF1b'}} direction='row'>
        <Grid item xs={4}>
          <Typography>...</Typography>
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