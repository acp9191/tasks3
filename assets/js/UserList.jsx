import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from './api';

function UserList(props) {
  let { users, dispatch } = props;
  let rows = _.map(users, user => (
    <User key={user.id} user={user} dispatch={dispatch} />
  ));

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Admin?</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <span>
          <button
            className="btn btn-primary"
            onClick={() => console.log('TOD4')}
          >
            New User
          </button>
        </span>
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
      <td>
        <button
          className="btn btn-secondary"
          onClick={() => console.log('TODO')}
        >
          Show
        </button>
        <button className="btn btn-info" onClick={() => console.log('TODO2')}>
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            let confirmDelete = confirm(
              'Are you sure you want to delete ' + user.email + '?'
            );
            if (confirmDelete) {
              api.delete_user(user.id);
            }
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function state2props(state) {
  return {
    users: state.users
  };
}

export default connect(state2props)(UserList);
