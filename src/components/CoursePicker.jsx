import React from 'react';
import Grid from '@material-ui/core/Grid';
import SuggestedTextField from './SuggestedTextField';
import { Card, CardActionArea, Typography, Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import CourseCard from "./CourseCard";
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
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
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const CoursePicker = () => {
  const dispatch = useDispatch();
  const courses = useSelector(store => store.courses)
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Choose a course ...
        </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justify="flex-start"
          style={{ minHeight: '100vh' }}
        >
          <Grid container spacing={4}>
            {Object.keys(courses).map((key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <CourseCard course={key} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
};

export default CoursePicker;