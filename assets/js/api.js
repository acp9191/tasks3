import store from './store';

class Server {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: 'get',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: callback
    });
  }

  fetch_tasks() {
    this.fetch_path('/api/v1/tasks', resp => {
      store.dispatch({
        type: 'TASK_LIST',
        data: resp.data
      });
    });
  }

  fetch_users() {
    this.fetch_path('/api/v1/users', resp => {
      store.dispatch({
        type: 'USER_LIST',
        data: resp.data
      });
    });
  }

  fetch_user(id) {
    this.fetch_path('/api/v1/users/' + id, resp => {
      store.dispatch({
        type: 'USER_SHOW',
        data: resp.data
      });
    });
  }

  send_post(path, data, callback, error_callback) {
    var resp = $.ajax(path, {
      method: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: callback,
      error: error_callback
    });
    resp.then(msg => {
      // console.log(msg);
      return msg;
    });
  }

  create_session(email, password) {
    this.send_post(
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
    // TODO error handling
    let resp = this.send_post(
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
        window.location = window.location.href.substring(
          0,
          window.location.href.length - 4
        );
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
    this.send_post(
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
        // TODO fix this
        window.location = window.location.href.substring(
          0,
          window.location.href.length - 4
        );
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
    $.ajax('/api/v1/tasks/' + id, {
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
    $.ajax('/api/v1/users/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: resp => {
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

    $.ajax('/api/v1/users/' + id, {
      method: 'put',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: resp => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data
        });
        this.fetch_tasks();
        window.location = window.location.href.substring(
          0,
          window.location.href.length - 7
        );
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
}

export default new Server();
