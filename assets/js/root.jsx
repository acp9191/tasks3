import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

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

function Header(props) {
  let { root } = props;
  return (
    <div className="row my-2">
      <div className="col-4">
        <h1>
          <Link to={'/'}>Task Tracker</Link>
        </h1>
      </div>
      <div className="col-2">
        <p>
          <Link to={'/users'} onClick={root.fetch_users.bind(root)}>
            Users
          </Link>
        </p>
      </div>
      <div className="col-6">
        <div className="form-inline my-2">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </div>
  );
}

function UserList(props) {
  let rows = _.map(props.users, uu => <User key={uu.id} user={uu} />);
  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

function User(props) {
  let { user } = props;
  return (
    <tr>
      <td>{user.email}</td>
      <td>{user.admin ? 'yes' : 'no'}</td>
    </tr>
  );
}

function TaskList(props) {
  let rows = _.map(props.tasks, task => <Task key={task.id} task={task} />);
  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Length</th>
              <th>Complete?</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

function Task(props) {
  let { task } = props;
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.length}</td>
      <td>{task.is_completed ? 'yes' : 'no'}</td>
    </tr>
  );
}
