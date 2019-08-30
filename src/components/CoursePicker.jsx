import React from 'react';
import Grid from '@material-ui/core/Grid';
import SuggestedTextField from './SuggestedTextField';

const CoursePicker = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <SuggestedTextField />
      </Grid>   
    </Grid> 
  );
};

export default CoursePicker;