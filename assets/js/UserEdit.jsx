import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import store from './store';

function UserEdit(props) {
  let { user, redirect } = props;

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
    api.update_user(user.id, email, password).then(() => {
      store.dispatch({
        type: 'REDIRECT_UNTRUE'
      });
    });
  }

  if (user == null) {
    return <div>Loading . . .</div>;
  } else if (redirect == true) {
    return <Redirect to="/users" />;
  } else {
    email = user.email;
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
              placeholder={email}
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
}

function state2props(state) {
  return {
    user: state.user,
    redirect: state.redirect
  };
}

export default connect(state2props)(UserEdit);
