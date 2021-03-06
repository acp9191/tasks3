import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from './api';

function UserList(props) {
  let { users, session, dispatch } = props;
  let rows = _.map(users, user => (
    <User key={user.id} user={user} dispatch={dispatch} session={session} />
  ));

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <span>
          <Link to="/users/new">New User</Link>
        </span>
      </div>
    </div>
  );
}

function User(props) {
  let { user, session, dispatch } = props;

  let showBtn = (
    <Link to={'/users/' + user.id}>
      <button
        className="btn btn-secondary"
        onClick={() => api.fetch_user(user.id)}
      >
        Show
      </button>
    </Link>
  );

  function confirmDelete() {
    let confirmDelete = confirm(
      'Are you sure you want to delete ' + user.email + '?'
    );
    if (confirmDelete) {
      let action = {
        type: 'LOGOUT_SESSION'
      };
      dispatch(action);
      api.delete_user(user.id);
    }
  }

  let buttons =
    session && session.user_id == user.id ? (
      <td>
        {showBtn}
        <Link to={'/users/edit/' + user.id}>
          <button
            className="btn btn-info"
            onClick={() => api.fetch_user(user.id)}
          >
            Edit
          </button>
        </Link>
        <button className="btn btn-danger" onClick={confirmDelete}>
          Delete
        </button>
      </td>
    ) : (
      <td>{showBtn}</td>
    );

  return (
    <tr>
      <td>{user.email}</td>
      {buttons}
    </tr>
  );
}

function state2props(state) {
  return {
    users: state.users,
    session: state.session
  };
}

export default connect(state2props)(UserList);
