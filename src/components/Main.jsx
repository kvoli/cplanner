import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoursePicker from './CoursePicker';
import Example from './Example';
import SubjectPicker from './SubjectPicker';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path = '/' component={Example} />
        <Route exact path = '/courses' component={CoursePicker} />
        <Route exact path='/subjects' component={SubjectPicker} />
      </Switch>
    </main>
  );
}

export default Main;