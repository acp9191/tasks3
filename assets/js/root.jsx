import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Header from './Header';
import Home from './Home';
import UserList from './UserList';
import UserForm from './UserForm';
import UserShow from './UserShow';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

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
            <Route path="/" exact={true} render={() => <Home />} />
            <Route path="/users" exact={true} render={() => <UserList />} />
            <Route path="/users/:id" component={UserShow} />
            <Route path="/users/new" exact={true} render={() => <UserForm />} />
            <Route path="/tasks" exact={true} render={() => <TaskList />} />
            <Route path="/tasks/new" exact={true} render={() => <TaskForm />} />
          </div>
        </Router>
      </div>
    );
  }
}
