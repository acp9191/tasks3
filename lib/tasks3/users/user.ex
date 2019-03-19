defmodule Tasks3.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :admin, :boolean, default: false
    field :email, :string
    field :password_hash, :string
    has_many :tasks, Tasks3.Tasks.Task, on_delete: :delete_all

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :admin])
    |> validate_required([:email, :password_hash, :admin])
    |> unique_constraint(:email)
  end
end
