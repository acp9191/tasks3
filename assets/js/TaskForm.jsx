import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function TaskForm() {
  let title,
    description,
    user,
    length,
    is_complete = false;

  function update(ev, field) {
    switch (field) {
      case 'TITLE':
        title = ev.target.value;
        break;
      case 'DESCRIPTION':
        description = ev.target.value;
        break;
      case 'USER':
        user = ev.target.value;
        break;
      case 'LENGTH':
        length = parseInt(ev.target.value);
        break;
      case 'IS_COMPLETE':
        is_complete = !is_complete;
        break;
      default:
      // no op
    }
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'TITLE');
            }}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'DESCRIPTION');
            }}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>User</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'USER');
            }}
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Length</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'LENGTH');
            }}
            type="number"
          />
        </div>
        <div className="form-group">
          <label>Complete?</label>
          <input
            className="form-control"
            onChange={ev => {
              update(ev, 'IS_COMPLETE');
            }}
            type="checkbox"
          />
        </div>
      </form>
      <div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={() =>
            api.create_task(title, description, user, length, is_complete)
          }
        >
          Save
        </button>
      </div>
      <br />
      <span>
        <Link to={'/tasks'}>Back</Link>
      </span>
    </div>
  );
}

function state2props(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(state2props)(TaskForm);
