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

  function handleSubmit(ev) {
    console.log('handle');
    // ev.preventDefault();
    // const form = ev.target;
    // const data =

    let resp = api.create_user(email, password);
    console.log(resp);
    // window.location = window.location.href.substring(
    //   0,
    //   window.location.href.length - 4
    // );
  }

  return (
    <div>
      <form noValidate>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'EMAIL');
            }}
            type="email"
            required
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
            required
          />
        </div>
      </form>
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
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
