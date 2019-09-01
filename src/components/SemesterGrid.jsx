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
    backgroundColor: '#CC1B1B',
    padding: 0,
    margin: 0
  },
  when: {
    textAlign: 'center',
    paddingTop: 35
  }
}));

const SemesterGrid = ({props}) => {
  console.log(props)
  const classes = useStyles();
  return (
    <ListItem className={classes.semester}>
      <Grid container direction="row">
        <Grid className={classes.when} item>
          <Typography>2019</Typography>
          <Typography>Semester 1</Typography>
        </Grid>
        <SubjectCard props={{ row: props.row, col: 0 }} />
        <SubjectCard props={{ row: props.row, col: 1 }} />
        <SubjectCard props={{ row: props.row, col: 2 }} />
        <SubjectCard props={{ row: props.row, col: 3 }} />
      </Grid>
    </ListItem>
  );
}

export default SemesterGrid;