import React from 'react';
import Requirements from './Requirements';
import SubjectSelector from './SubjectSelector';
import Container  from '@material-ui/core/Container';
import CourseList from './CourseList';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import Typography from '@material-ui/core/Typography';

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
  const classes = useStyles();
  return (
    <Container className={classes.root} >
      <Grid className={classes.grid} container direction='row'>
        <Grid item xs={8}>
          <Typography className={classes.course} variant='h2'>Course</Typography>
          <Typography className={classes.major} variant='h4'>Bachelor of Agriculture</Typography>
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