import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import store from './store';

function TaskEdit(props) {
  let { task, redirect } = props;

  let title, description, user, length, is_complete;

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

  function handleSubmit(ev) {
    api
      .update_task(task.id, title, description, user, length, is_complete)
      .then(() => {
        store.dispatch({
          type: 'REDIRECT_UNTRUE'
        });
      });
  }

  if (task == null) {
    return <div>Loading . . .</div>;
  } else if (redirect == true) {
    return <Redirect to="/tasks" />;
  } else {
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
              placeholder={task.title}
              required
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
              placeholder={task.description}
              required
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
              placeholder={task.user_id}
              required
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
              placeholder={task.length}
              required
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
              checked={is_complete}
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
          <Link to={'/tasks'}>Back</Link>
        </span>
      </div>
    );
  }
}

function state2props(state) {
  return {
    task: state.task,
    redirect: state.redirect
  };
}

export default connect(state2props)(TaskEdit);
