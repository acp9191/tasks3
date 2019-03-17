import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import TaskList from './TaskList';
import UserList from './UserList';

export default function root_init(node) {
  let tasks = window.tasks;
  let users = window.tasks;

  ReactDOM.render(<Root tasks={tasks} users={users} />, node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      tasks: props.tasks
    };

    this.create_session('bob@example.com', 'pass1');
  }

  send_post(path, req, on_success) {
    $.ajax(path, {
      method: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(req),
      success: on_success
    });
  }

  create_session(email, password) {
    $.ajax('/api/v1/sessions', {
      method: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify({ email, password }),
      success: resp => {
        this.setState(_.assign({}, this.state, { session: resp.data }));
      }
    });
  }

  fetch_tasks() {
    $.ajax('/api/v1/tasks', {
      method: 'get',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: resp => {
        this.setState(_.assign({}, this.state, { tasks: resp.data }));
      }
    });
  }

  fetch_users() {
    $.ajax('/api/v1/users', {
      method: 'get',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: resp => {
        this.setState(_.assign({}, this.state, { users: resp.data }));
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header root={this} />
            <Route
              path="/"
              exact={true}
              render={() => <TaskList tasks={this.state.tasks} />}
            />
            <Route
              path="/users"
              exact={true}
              render={() => <UserList users={this.state.users} />}
            />
          </div>
        </Router>
      </div>
    );
  }
}
