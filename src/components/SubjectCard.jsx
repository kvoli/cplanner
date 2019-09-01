import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { openSubject } from "../actions/subjectSelector";


const useStyles = makeStyles(theme => ({
  card: {
    margin: 10,
    width: 100,
    height: 100
  }
}));


const SubjectCard = ({props}) => {
  console.log(props)
  const row = props.row
  const col = props.col
  console.log(row, col)

  const dispatch = useDispatch();
  
  const subjectSelector = useSelector(store => store.subjectSelector.subjectList)
  console.log(subjectSelector)
  const subject = subjectSelector[row][col]
  const classes = useStyles();

  return (
    <Grid item>
      <Card className={subject.card}>
        <CardContent>
          <Typography onClick={() => dispatch(openSubject(subject))}
          >{subject.code}</Typography>
          <Typography>{subject.name}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default SubjectCard;