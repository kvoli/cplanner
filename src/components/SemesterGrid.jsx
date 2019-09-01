import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubjectCard from './SubjectCard';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  semester: {
    //backgroundColor: '#CC1B1B',
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15, 
    paddingTop: 5,
    paddingBottom: 5
  },
  when: {
    textAlign: 'center',
    paddingTop: 35
  }
}));

const SemesterGrid = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.semester}>
      <Typography>Semester 1</Typography>
      <Grid container direction="row">
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
        <SubjectCard />
      </Grid>
    </Grid>
  );
}

export default SemesterGrid;