import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { maxHeight } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'cover',
    width: "100%",
    height: "100%",

  }
}));


const Nav = () => {

  const classes = makeStyles()

  return (
    <AppBar position="relative"
    component={Link}
        to="/" >
      <Toolbar>
        <Typography variant="h3" color="inherit" noWrap>
          cplanner
        </Typography>
        <img
          src="https://zippy.gfycat.com/VagueDampCutworm.gif"
          className={classes.image}
        />
        <img
          src="https://zippy.gfycat.com/VagueDampCutworm.gif"
          className={classes.image}
        />
        <img
          src="https://zippy.gfycat.com/VagueDampCutworm.gif"
          className={classes.image}
        />
        <img
          src="https://zippy.gfycat.com/VagueDampCutworm.gif"
          className={classes.image}
        />
        <img
          src="https://zippy.gfycat.com/VagueDampCutworm.gif"
          className={classes.image}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;