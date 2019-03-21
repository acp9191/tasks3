import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';

function UserShow(props) {
  let { user } = props;

  if (user == null) {
    return <div>Loading . . .</div>;
  } else {
    return (
      <div>
        <ul>
          <li>
            <strong>Email: </strong>
            <span>{user.email}</span>
          </li>
        </ul>
        <br />
        <span>
          <Link
            to={'/users'}
            onClick={() =>
              store.dispatch({
                type: 'USER_UNSHOW'
              })
            }
          >
            Back
          </Link>
        </span>
      </div>
    );
  }
}

function state2props(state) {
  return {
    user: state.user
  };
}

export default connect(state2props)(UserShow);
