import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { openSubject } from "../actions/subjectSelector";
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  card: {
    margin: 10,
    width: 110,
    height: 110
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center'
  },
  title: {
    paddingTop: 10
  }
}));


const SubjectSelectCard = ({ subject }) => {

  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <Grid item>
      <Card className={classes.card}>
        <CardContent className={classes.text}>
          {subject ? (
            <Grid>
            <Typography onClick={() => dispatch(openSubject(subject))}>
              <Box fontWeight="fontWeightBold" >
              {subject.code}
              </Box>
              <Box fontWeight="fontWeightLight" fontSize={14} >
              {subject.name}
              </Box>
            </Typography>
            </Grid>
          ) : (
              <Icon>
                <AddIcon />
              </Icon>
            )
          }
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SubjectSelectCard;