import React from 'react';
import { Card, CardActionArea, Typography, Icon, Grid, ListItem, ListItemText, List } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  largeButton: {
    paddingRight: theme.spacing(8),
    paddingLeft: theme.spacing(8),

  },
  largeIcon: {
    fontSize: "3em"
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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const CourseCard = ({ course }) => {

  const classes = useStyles();
  const years = "3 years full time or 6 years part time"
  const points = "300 Points"
  const type = "Bachelor's Degree"
  const year = "2019"

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <Grid container direction="column" alignItems="center" justify="stretch">
            <Grid item>
              <Typography gutterBottom variant="h4" component="h2">
                {course}
              </Typography>
            </Grid>
            <Grid item>
            <ListItemText primary={type}/>
            </Grid>
            <Grid item>
              <ListItemText secondary={points} />
            </Grid>
            <Grid item>
                <IconButton className={classes.largeButton} >
                  <LocalLibraryIcon className={classes.largeIcon} />
                </IconButton>

            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}

export default CourseCard;