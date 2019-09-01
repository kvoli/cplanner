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
        <SemesterGrid props={{row: 0}}/>
        <SemesterGrid props={{row: 1}}/>
        <SemesterGrid props={{row: 2}}/>
        <SemesterGrid props={{row: 3}}/>
        <SemesterGrid props={{row: 4}}/>
        <SemesterGrid props={{row: 5}}/>
      </List>
    </Container>
  );
}

export default CourseList;