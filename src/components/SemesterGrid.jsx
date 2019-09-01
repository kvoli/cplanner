import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubjectCard from './SubjectCard';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move
} from "react-grid-dnd";

const useStyles = makeStyles(theme => ({
  semester: {
    //backgroundColor: '#CC1B1B',
    margin: 0,
    paddingLeft: 15,
    paddingRight: 15, 
    paddingTop: 5,
    paddingBottom: 5
  },
  when: {
    textAlign: 'center',
    paddingTop: 35
  }
}));



const SemesterGrid = ({props}) => {
  console.log(props)
  const classes = useStyles();

  const [items, setItems] = React.useState({
    current: [
      { title: 'Models of Computation', code: 'COMP30022', row: 5, col: 0 },
      { title: 'Foundations of Computing', code: 'COMP10001', row: 0, col: 0}
    ]
  });

  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    // if (targetId) {
    //   const result = move(
    //     items[sourceId],
    //     items[targetId],
    //     sourceIndex,
    //     targetIndex
    //   );
    //   return setItems({
    //     ...items,
    //     [sourceId]: result[0],
    //     [targetId]: result[1]
    //   });
    // }

    // const result = swap(items[sourceId], sourceIndex, targetIndex);
    // return setItems({
    //   ...items,
    //   [sourceId]: result
    // });
  };

  return (
    <GridContextProvider onChange={onChange} className={classes.semester}>
      <Typography>Semester {props.row + 1}</Typography>
      <GridDropZone
        className='dropzone current'
        id='current'
        boxesPerRow={4}
        rowHeight={400}
        style={{height:'150px',width:'500px'}}
      >
        <GridItem key={0}>

        </GridItem>
        <GridItem key={1}>
        </GridItem>
        <GridItem key={2}>
        </GridItem>
        <GridItem key={3}>
        </GridItem>
      </GridDropZone>
    </GridContextProvider>
  );
}

export default SemesterGrid;