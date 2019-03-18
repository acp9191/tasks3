import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function Header(props) {
  let { session, dispatch } = props;
  let session_info, email, password;

  function updateEmail(ev) {
    email = ev.target.value;
  }

  function updatePassword(ev) {
    password = ev.target.value;
  }

  function logout() {
    let action = {
      type: 'LOGOUT_SESSION'
    };
    dispatch(action);
  }

  if (session == null) {
    session_info = (
      <div className="form-inline my-2">
        <input type="email" placeholder="email" onChange={updateEmail} />
        <input
          type="password"
          placeholder="password"
          onChange={updatePassword}
        />
        <button
          className="btn btn-secondary"
          onClick={() => api.create_session(email, password)}
        >
          Login
        </button>
      </div>
    );
  } else {
    session_info = (
      <div className="my-2">
        <span>Logged in as {session.email}</span> &nbsp;
        <button className="btn btn-secondary" onClick={() => logout()}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="row my-2">
      <div className="col-3">
        <h1>Task Tracker</h1>
      </div>
      <div className="col-3">
        <p>
          <Link to={'/'}>Tasks</Link> &nbsp; | &nbsp;
          <Link to={'/users'}>Users</Link>
        </p>
      </div>
      <div className="col-6">{session_info}</div>
    </div>
  );
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);
