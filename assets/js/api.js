import store from './store';

class Server {
  fetch_path(path, callback) {
    return $.ajax(path, {
      method: 'get',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: callback
    });
  }

  fetch_tasks() {
    return this.fetch_path('/api/v1/tasks', resp => {
      store.dispatch({
        type: 'TASK_LIST',
        data: resp.data
      });
    });
  }

  fetch_task(id) {
    return this.fetch_path('/api/v1/tasks/' + id, resp => {
      store.dispatch({
        type: 'TASK_SHOW',
        data: resp.data
      });
    });
  }

  fetch_users() {
    return this.fetch_path('/api/v1/users', resp => {
      store.dispatch({
        type: 'USER_LIST',
        data: resp.data
      });
    });
  }

  fetch_user(id) {
    return this.fetch_path('/api/v1/users/' + id, resp => {
      store.dispatch({
        type: 'USER_SHOW',
        data: resp.data
      });
    });
  }

  send_post(path, data, callback, error_callback) {
    return $.ajax(path, {
      method: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: callback,
      error: error_callback
    });
  }

  create_session(email, password) {
    return this.send_post(
      '/api/v1/auth',
      {
        email,
        password
      },
      resp => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data
        });
      },
      (request, _status, _error) => {
        if (request) {
          alert('Invalid Email or Password');
        }
      }
    );
  }

  create_task(title, description, user, length, is_complete) {
    return this.send_post(
      '/api/v1/tasks',
      {
        task: {
          title,
          description,
          user,
          length,
          is_complete
        }
      },
      resp => {
        store.dispatch({
          type: 'TASK_CREATE',
          data: resp.data
        });
        store.dispatch({
          type: 'REDIRECT_TRUE'
        });
        return resp.data;
      },
      (request, _status, _error) => {
        if (request.responseJSON) {
          let errors = request.responseJSON.errors;
          for (var key in errors)
            if (errors.hasOwnProperty(key)) {
              let displayKey = key == 'user_id' ? 'User' : key;
              alert('Error in field ' + displayKey + ': ' + errors[key]);
            }
        }
      }
    );
  }

  create_user(email, password) {
    return this.send_post(
      '/api/v1/users',
      {
        user: {
          email,
          password
        }
      },
      resp => {
        store.dispatch({
          type: 'USER_CREATE',
          data: resp.data
        });

        this.create_session(email, password);
        store.dispatch({
          type: 'REDIRECT_TRUE'
        });

        return resp.data;
      },
      (request, _status, _error) => {
        if (request.responseJSON) {
          let errors = request.responseJSON.errors;
          for (var key in errors)
            if (errors.hasOwnProperty(key)) {
              let displayKey = key == 'password_hash' ? 'Password' : 'Email';
              alert('Error in field ' + displayKey + ': ' + errors[key]);
            }
        }
      }
    );
  }

  delete_task(id) {
    return $.ajax('/api/v1/tasks/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: _resp => {
        store.dispatch({
          type: 'TASK_DELETE',
          task_id: id
        });
      }
    });
  }

  delete_user(id) {
    return $.ajax('/api/v1/users/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: _resp => {
        store.dispatch({
          type: 'USER_DELETE',
          user_id: id
        });
        this.fetch_tasks();
      }
    });
  }

  update_user(id, email, password) {
    let data = {
      user: {
        id,
        email,
        password
      }
    };

    return $.ajax('/api/v1/users/' + id, {
      method: 'put',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: resp => {
        this.fetch_users();
        this.fetch_tasks();
        store.dispatch({
          type: 'REDIRECT_TRUE'
        });

        return resp.data;
      },
      error: (request, _status, _error) => {
        if (request.responseJSON) {
          let errors = request.responseJSON.errors;
          for (var key in errors)
            if (errors.hasOwnProperty(key)) {
              let displayKey = key == 'password_hash' ? 'Password' : 'Email';
              alert('Error in field ' + displayKey + ': ' + errors[key]);
            }
        }
      }
    });
  }

  update_task(id, title, description, user, length, is_complete) {
    let data = {
      task: {
        title,
        description,
        user,
        length,
        is_complete
      }
    };

    return $.ajax('/api/v1/tasks/' + id, {
      method: 'put',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: resp => {
        this.fetch_tasks();
        store.dispatch({
          type: 'REDIRECT_TRUE'
        });

        return resp.data;
      },
      error: (request, _status, _error) => {
        if (request.responseJSON) {
          let errors = request.responseJSON.errors;
          for (var key in errors)
            if (errors.hasOwnProperty(key)) {
              let displayKey = key == 'user_id' ? 'User' : key;
              alert('Error in field ' + displayKey + ': ' + errors[key]);
            }
        }
      }
    });
  }
}

export default new Server();
