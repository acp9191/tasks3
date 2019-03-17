import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

export default function Header(props) {
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
