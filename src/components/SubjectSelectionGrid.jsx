// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import { Card, CardActionArea, Typography, Icon } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
// import MajorCard from "./MajorCard";
// import { useSelector, useDispatch } from 'react-redux';
// import { getFilteredSubjects } from "../selectors/subject"
// import SubjectSelectCard from "./SubjectSelectCard"
// import SearchBar from "./SearchBar";

// const useStyles = makeStyles(theme => ({
//   container: {
//     flex: 1,
//     height: 450,
//     padding: 0,
//     'overflow-y': 'auto',
//     'overflow-x': 'hidden'
//   },
// }));


// const SubjectSelectionGrid = () => {

//   const state = useSelector(store => store)
//   const subjects = getFilteredSubjects(state)
//   const classes = useStyles();

//   String.prototype.capitalize = function () {
//     return this.charAt(0).toUpperCase() + this.slice(1);
//   }

//   return (
//     <React.Fragment>
//       <SearchBar />
//       <GridContextProvider onChange={onChange}>
//         <GridDropZone
//           id="a"
//           boxesPerRow={4}
//           rowHeight={125}
//           rowWidth={100}
//           style={{ height: '500px', width: '500px' }}
//         >
//           {subjects.map(subject => (
//             <GridItem key={subject.code} xs={3}>
//               <SubjectSelectCard subject={subject} />
//             </GridItem>
//           ))}
//         </GridDropZone>
//     </React.Fragment>
//       )
//     };
    
// export default SubjectSelectionGrid;