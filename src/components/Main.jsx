import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoursePicker from './CoursePicker';
import Example from './Example';

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path = '/' component={Example} />
        <Route exact path = '/courses' component={CoursePicker} />
      </Switch>
    </main>
  );
}

export default Main;