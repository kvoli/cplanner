import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoursePicker from './CoursePicker';
import Example from './Example';
import MajorPicker from "./MajorPicker";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path = '/' component={CoursePicker} />
        <Route exact path = '/majors' component={MajorPicker} />
        {/* <Route exact path = '/subjects' component={SubjectPicker} /> */}
      </Switch>
    </main>
  );
}

export default Main;