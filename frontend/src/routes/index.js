import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import CreateStudent from '../pages/Students/CreateStudent';
import ListStudent from '../pages/Students/ListStudent';
import UpdateStudent from '../pages/Students/UpdateStudent';

import CreateEnrollment from '../pages/Enrollments/CreateEnrollment';
import ListEnrollment from '../pages/Enrollments/ListEnrollment';
import UpdateEnrollment from '../pages/Enrollments/UpdateEnrollment';

import CreatePlan from '../pages/Plans/CreatePlan';
import ListPlan from '../pages/Plans/ListPlan';
import UpdatePlan from '../pages/Plans/UpdatePlan';

import ListHelpOrder from '../pages/HelpOrders/ListHelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={ListStudent} isPrivate />
      <Route
        path="/students/create"
        exact
        component={CreateStudent}
        isPrivate
      />
      <Route
        path="/students/update/:id"
        exact
        component={UpdateStudent}
        isPrivate
      />

      <Route path="/enrollments" exact component={ListEnrollment} isPrivate />
      <Route
        path="/enrollments/create"
        exact
        component={CreateEnrollment}
        isPrivate
      />
      <Route
        path="/enrollments/update/:id"
        exact
        component={UpdateEnrollment}
        isPrivate
      />

      <Route path="/plans" exact component={ListPlan} isPrivate />
      <Route path="/plans/create" exact component={CreatePlan} isPrivate />
      <Route path="/plans/update/:id" exact component={UpdatePlan} isPrivate />

      <Route path="/help-orders" exact component={ListHelpOrder} isPrivate />
    </Switch>
  );
}
