import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import api from './api';
import Header from './Header';
import TaskList from './TaskList';
import UserList from './UserList';

export default function root_init(node, store) {
  let tasks = window.tasks;
  let users = window.tasks;

  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} users={users} />
    </Provider>,
    node
  );
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      tasks: props.tasks
    };

    api.create_session('bob@example.com', 'pass1');
    api.fetch_tasks();
    api.fetch_users();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route path="/" exact={true} render={() => <TaskList />} />
            <Route path="/users" exact={true} render={() => <UserList />} />
          </div>
        </Router>
      </div>
    );
  }
}
