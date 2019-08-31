import React from 'react';
import Requirements from './Requirements';
import SubjectSelector from './SubjectSelector';
import Container  from '@material-ui/core/Container';
import CourseList from './CourseList';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: '#FB1BFB',
    maxWidth: 1920,
    padding: 0
  },
  course: {
    paddingLeft: 20,
  },
  major: {
    paddingLeft: 65,
  },
  courseStuff: {
    paddingLeft: 100
  },
}));

const SubjectPicker = () => {
  const dispatch = useDispatch();
  const subjects = useSelector(store => store.subjects)
  const selection = useSelector(store => store.selection)
  const classes = useStyles();

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }


  return (
    <Container className={classes.root} >
      <Grid className={classes.grid} container direction='row'>
        <Grid item xs={8}>
          <Typography className={classes.course} variant='h2'>{selection.major}</Typography>
          <Typography className={classes.major} variant='h4'>Bachelor of {selection.course}</Typography>
          <Container className={classes.courseStuff}>
            <CourseList />
          </Container>
        </Grid>
        <Grid item xs={4}>
          <Requirements />
          <Container>
            <SubjectSelector/>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubjectPicker;