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
        <SemesterGrid />
        <SemesterGrid />
        <SemesterGrid />
        <SemesterGrid />
        <SemesterGrid />
        <SemesterGrid />
      </List>
    </Container>
  );
}

export default CourseList;