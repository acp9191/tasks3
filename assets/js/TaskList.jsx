import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

function TaskList(props) {
  let { tasks, dispatch } = props;
  let rows = _.map(tasks, task => (
    <Task key={task.id} task={task} dispatch={dispatch} />
  ));

  return (
    <div className="row">
      <div className="col-12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Length</th>
              <th>Complete?</th>
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
            New Task
          </button>
        </span>
      </div>
    </div>
  );
}

function Task(props) {
  let { task, dispatch } = props;
  function update(ev) {
    let action = {
      type: 'UPDATE_CREATE_TASK_FORM',
      task_id: task.id
      // TODO: more stuff here probebly
    };
    dispatch(action);
  }
  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.length}</td>
      <td>{task.is_completed ? 'yes' : 'no'}</td>
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
        <button className="btn btn-danger" onClick={() => console.log('TODO3')}>
          Delete
        </button>
      </td>
    </tr>
  );
}

function state2props(state) {
  console.log('rerender', state);
  return {
    tasks: state.tasks
  };
}

export default connect(state2props)(TaskList);
