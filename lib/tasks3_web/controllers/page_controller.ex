defmodule Tasks3Web.PageController do
  use Tasks3Web, :controller

  def index(conn, _params) do
    products = Tasks3.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :description])))

    users = Tasks3.Users.list_users()
    |> Enum.map(&(Map.take(&1, [:id, :email])))

    render conn, "index.html", products: products, users: users
  end
end
