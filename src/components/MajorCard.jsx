import React from 'react';
import { Card, CardActionArea, Typography, Icon, Grid, ListItem, ListItemText, List } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from 'react-redux';
import { selectMajor } from "../actions/selectorActions";

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(0.5),
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

const MajorCard = ({ major }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(store => store)


  return (
    <Card className={classes.card}>
      <CardActionArea
      
      onClick={() => {
          dispatch(selectMajor(major));
        }}
        // component={Link}
        // to="/SubjectPicker"
        >
        <CardContent className={classes.cardContent}>
          <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
              <Typography variant="body2" component="body2" align="center" className={classes.bullet} >
                {major}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton  >
                <LocalLibraryIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card >
  )
}

export default MajorCard;