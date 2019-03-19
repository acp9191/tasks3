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

  send_post(path, data, callback, error_callback) {
    $.ajax(path, {
      method: 'post',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(data),
      success: callback,
      error: error_callback
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
      (request, status, error) => {
        console.log(request, status, error);
      }
    );
  }

  create_task(title, description, user, length, is_complete) {
    // TODO error handling
    this.send_post(
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
      },
      (request, status, error) => {
        console.log(request, status, error);
      }
    );
  }

  create_user(email, password) {
    // TODO error handling
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
      },
      (request, status, error) => {
        console.log(request, status, error);
      }
    );
  }

  delete_task(id) {
    $.ajax('/api/v1/tasks/' + id, {
      method: 'delete',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: '',
      success: resp => {
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
      }
    });
  }
}

export default new Server();
