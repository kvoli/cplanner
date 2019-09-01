import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Card, CardContent, Divider, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(0.5, 0.5)
  },
  cardContent: {
    flexGrow: 1,
    marginBottom: 0,
    paddingBottom: 0,
    paddingTop: 10,
    paddingRight: 28,
    paddingLeft: 28,
    "&:last-child": {
      paddingBottom: 6
    }
  },
  cardText: {
    margin: theme.spacing(1, 0),
  },
  cardTags: {
    margin: theme.spacing(.5, 0),
  },
  chip: {
    margin: theme.spacing(0, 0.25)
  },
}));



const Subject = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const { subject, subjectModal, course, major } = useSelector(store => store.selection)

  return (
    <Grid container justify="center" className={classes.contained}>
      {subject ? (
        <Card>
          <CardContent className={classes.cardContent}>
            <div className={classes.cardText}>
              <Grid container justify="space-between">
                <Grid item >
                  <Typography gutterBottom variant='h4'>
                    {subject.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container direction="row-reverse" justify="flex-end">
                    <Grid item>
                      <Typography>
                        {subject.code}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography gutterBottom color="textSecondary" variant='body2' paragraph >
                {subject.desc}
              </Typography>
              <Divider variant='middle' />
              <Typography variant="h6">
                Conditions
            </Typography>
              <List dense={true}>
                <ListItem key={subject.prererequisites} alignItems="flex-start">
                  <ListItemText
                    primary="Pre-Requisites"
                    secondary={subject.prerequisites}
                  />
                </ListItem>
                <ListItem key={subject.corerequisites} alignItems="flex-start">
                  <ListItemText
                    primary="Co-Requisites"
                    secondary={subject.corerequisites}
                  />
                </ListItem>
                <ListItem key={subject.antirequisites} alignItems="flex-start">
                  <ListItemText
                    primary="Anti-Requisites"
                    secondary={subject.antirequisites}
                  />
                </ListItem>
              </List>
            </div>
          </CardContent>
        </Card>
      ) : "error"
      }
    </Grid>
  );
}

export default Subject;