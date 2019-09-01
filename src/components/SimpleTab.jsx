import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SubjectCard from './SubjectCard';
import { GridContextProvider, GridDropZone, GridItem, swap, move } from 'react-grid-dnd';
import Subject from './Subject';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#2b2e3e',
  },
  filter: {
    padding: 0,
    color: '#FFF',
    paddingLeft: 10,
  },
  input: {
    color: '#FFF'
  }
}));

export default function SimpleTab({course,major,breadth}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [items, setItems] = React.useState({ 
    available: [
      { title: 'Design of Algorithms', code: 'COMP20007' },
      { title: 'Declarative Programming', code: 'COMP30019' },
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
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>

        <Tabs centered value={value} indicatorColor='secondary' onChange={handleChange} aria-label="simple tabs example">
          <Tab xs={4} label="Course" {...a11yProps(0)} />
          <Tab xs={4} label="Major" {...a11yProps(1)} />
          <Tab xs={4} label="Breadth" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
  
      {console.log(items)}

      <TabPanel value={value} index={0}>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id='available course'
            boxesPerRow={4}
            rowHeight={125}
            rowWidth={100}
            style={{height:'500px', width: '500px'}}
          >
            <GridItem key={0}>
              <SubjectCard props={{row:0,col:0}}/>
            </GridItem>
            <GridItem key={1}>
              <SubjectCard props={{row:0,col:1}}/>
            </GridItem>
            <GridItem key={2}>
              <SubjectCard props={{row:0,col:2}}/>
            </GridItem>
            <GridItem key={3}>
              <SubjectCard props={{row:0,col:3}}/>
            </GridItem>
            <GridItem key={4}>
              <SubjectCard props={{row:1,col:0}}/>
            </GridItem>
          </GridDropZone>
        </GridContextProvider>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id='available major'
            boxesPerRow={4}
            rowHeight={125}
            rowWidth={100}
            style={{height:'500px', width: '500px'}}
          >
            <GridItem key={0}>
              <SubjectCard props={{row:1,col:2}}/>
            </GridItem>
            <GridItem key={1}>
              <SubjectCard props={{row:1,col:3}}/>
            </GridItem>
            <GridItem key={2}>
              <SubjectCard props={{row:1,col:4}}/>
            </GridItem>
            <GridItem key={3}>
              <SubjectCard props={{row:2,col:0}}/>
            </GridItem>
          </GridDropZone>
        </GridContextProvider>
      </TabPanel> 
      <TabPanel value={value} index={2}>
        <GridContextProvider onChange={onChange}>
          <GridDropZone
            id='available breadth'
            boxesPerRow={4}
            rowHeight={125}
            rowWidth={110}
            style={{height:'500px', width: '500px'}}
          >
            <GridItem key={0}>
              <SubjectCard props={{row:2,col:1}}/>
            </GridItem>
            <GridItem key={1}>
              <SubjectCard props={{row:2,col:2}}/>
            </GridItem>
          </GridDropZone>
        </GridContextProvider>
      </TabPanel>
    </div>
  );
}