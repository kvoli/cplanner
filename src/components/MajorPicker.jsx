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
import MajorCard from "./MajorCard";

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
  const majors = ["Agricultural Science", "Animal Health and Disease", "Animal Science and Management", "Biochemistry and Molecular Biology", "Bioengineering Systems", "Biotechnology", "Cell and Developmental Biology", "Chemical Systems", "Chemistry", "Civil Systems", "Climate and Weather", "Computational Biology", "Computing and Software Systems", "Data Science", "Ecology and Evolutionary Biology", "Ecosystem Science", "Electrical Systems", "Environmental Engineering Systems", "Environmental Science", "Food Science", "Genetics", "Geography", "Geology", "Human Nutrition", "Human Structure and Function", "Immunology", "Marine Biology", "Mathematical Physics", "Mathematics and Statistics", "Mechanical Systems", "Mechatronics Systems", "Microbiology and Immunology", "Neuroscience", "Pathology", "Pharmacology", "Physics", "Physiology", "Plant Science", "Psychology", "Spatial Systems", "Zoology"]
  const course = "Bachelor of Science"
  const classes = useStyles();

  return (
    <React.Fragment>
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Select a Major from {course}
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