import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function UserForm() {
  let email, password;

  function update(ev, field) {
    switch (field) {
      case 'EMAIL':
        email = ev.target.value;
        break;
      case 'PASSWORD':
        password = ev.target.value;
        break;
      default:
      // no op
    }
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'EMAIL');
            }}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'PASSWORD');
            }}
            type="password"
          />
        </div>
      </form>
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() => api.create_user(email, password)}
        >
          Save
        </button>
      </div>
      <br />
      <span>
        <Link to={'/users'}>Back</Link>
      </span>
    </div>
  );
}

function state2props(state) {
  return {
    users: state.users
  };
}

export default connect(state2props)(UserForm);
