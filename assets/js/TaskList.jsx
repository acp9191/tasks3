import React from 'react';
import _ from 'lodash';

export default function TaskList(props) {
  let rows = _.map(props.tasks, task => <Task key={task.id} task={task} />);
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
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
      <td>{task.length}</td>
      <td>{task.is_completed ? 'yes' : 'no'}</td>
    </tr>
  );
}
