import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from './store';

function TaskShow(props) {
  let { task } = props;

  if (task == null) {
    return <div>Loading . . .</div>;
  } else {
    return (
      <div>
        <ul>
          <li>
            <strong>Title: </strong>
            <span>{task.title}</span>
          </li>
          <li>
            <strong>Description: </strong>
            <span>{task.description}</span>
          </li>
          <li>
            <strong>Assigned to: </strong>
            <span>{task.user_id}</span>
          </li>
          <li>
            <strong>Length: </strong>
            <span>{task.length}</span>
          </li>
          <li>
            <strong>Is Completed?: </strong>
            <span>{task.is_completed ? 'yes' : 'no'}</span>
          </li>
        </ul>
        <br />
        <span>
          <Link
            to={'/tasks'}
            onClick={() =>
              store.dispatch({
                type: 'TASK_UNSHOW'
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
    task: state.task
  };
}

export default connect(state2props)(TaskShow);
