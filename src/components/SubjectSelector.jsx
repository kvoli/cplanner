import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SimpleTab from './SimpleTab';

const useStyles = makeStyles(theme => ({
  container: {
    height: '60%',
    //backgroundColor: '#FFBBFF',
    padding: 0
  },
  searchBox: {
    padding: 10
  }
}));

const SubjectSelector = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}> 
      <SimpleTab />
    </Container>
  );
}

export default SubjectSelector;