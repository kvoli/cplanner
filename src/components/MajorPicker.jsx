import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardActionArea, Typography, Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MajorCard from "./MajorCard";
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const MajorPicker = () => {

  const dispatch = useDispatch();
  const courses = useSelector(store => store.courses)
  const course = useSelector(store => store.selection.course)
  const classes = useStyles();
  console.log(courses)
  console.log(course)
  const majors = course ? courses[course]['data'] : []

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  return (
    <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Select a major from Bachelor of {course.capitalize()}
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="flex-start"
            style={{ minHeight: '100vh' }}
          >
            <Grid container spacing={2}>
              {majors.map(major => (
                <Grid item key={major} xs={3}>
                  <MajorCard major={major} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
    </React.Fragment>
  )
};

export default MajorPicker;