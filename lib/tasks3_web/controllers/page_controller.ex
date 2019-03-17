defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    tasks = Tasks3.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :description, :length, :is_completed])))

    users = Tasks3.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :email])))

    render conn, "index.html", tasks: tasks, users: users
  end
end
