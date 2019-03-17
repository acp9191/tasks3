defmodule Tasks3Web.SessionController do
  use Tasks3Web, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- get_and_auth_user(email, pass) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(Tasks3Web.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end