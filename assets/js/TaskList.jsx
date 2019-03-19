import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from './api';

function TaskList(props) {
  let { tasks, session, dispatch } = props;

  let rows = _.map(tasks, task => (
    <Task key={task.id} task={task} dispatch={dispatch} />
  ));

  let newBtn = session ? (
    <span>
      <Link to="/tasks/new">New Task</Link>
    </span>
  ) : (
    <span />
  );

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned To</th>
              <th>Length</th>
              <th>Complete?</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        {newBtn}
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
      <td>{task.user_id}</td>
      <td>{task.length}</td>
      <td>{task.is_completed ? 'yes' : 'no'}</td>
      <td>
        <Link to={'/tasks/' + task.id}>
          <button
            className="btn btn-secondary"
            onClick={() => api.fetch_task(task.id)}
          >
            Show
          </button>
        </Link>
        <button className="btn btn-info" onClick={() => updateTaskView('EDIT')}>
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            let confirmDelete = confirm(
              'Are you sure you want to delete ' + task.title + '?'
            );
            if (confirmDelete) {
              api.delete_task(task.id);
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
    tasks: state.tasks,
    session: state.session
  };
}

export default connect(state2props)(TaskList);
