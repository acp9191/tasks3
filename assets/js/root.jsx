import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Header from './Header';
import Home from './Home';

import UserList from './UserList';
import UserForm from './UserForm';
import UserShow from './UserShow';
import UserEdit from './UserEdit';

import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskShow from './TaskShow';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    node
  );
}

class Root extends Component {
  constructor(props) {
    super(props);
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact={true} render={() => <Home />} />
              <Route path="/users" exact={true} render={() => <UserList />} />
              <Route
                path="/users/edit/:id"
                exact={true}
                render={() => <UserEdit />}
              />
              <Route
                path="/users/new"
                exact={true}
                render={() => <UserForm />}
              />
              <Route path="/users/:id" exact={true} component={UserShow} />
              <Route path="/tasks" exact={true} render={() => <TaskList />} />
              <Route
                path="/tasks/new"
                exact={true}
                render={() => <TaskForm />}
              />
              <Route path="/tasks/:id" exact={true} component={TaskShow} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
