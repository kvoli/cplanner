import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SemesterGrid from './SemesterGrid';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const CourseList = () => {
  return (
    <Container>
      <List>

        <Grid container direction='row'>
          <Grid item>
            <SemesterGrid props={{row:0}} />
          </Grid>
          <Grid item>
            <SemesterGrid props={{row:1}} />
          </Grid>
        </Grid>

        <Grid container direction='row'>
          <Grid item>
            <SemesterGrid props={{row:2}} />
          </Grid>
          <Grid item>
            <SemesterGrid props={{row:3}} />
          </Grid>
        </Grid>

        <Grid container direction='row'>
          <Grid item>
            <SemesterGrid props={{row:0}} />
          </Grid>
          <Grid item>
            <SemesterGrid props={{row:0}} />
          </Grid>
        </Grid>
          
      </List>
    </Container>
  );
}

export default CourseList;