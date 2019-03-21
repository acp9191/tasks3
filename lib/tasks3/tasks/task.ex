defmodule Tasks3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string
    field :is_complete, :boolean, default: false
    field :length, :integer
    field :title, :string
    belongs_to :user, Tasks3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :description, :length, :is_complete, :user_id])
    |> foreign_key_constraint(:user_id)
    |> validate_required([:title, :description, :length, :is_complete, :user_id])
    |> validate_div_by_15(:length)
  end

  def validate_div_by_15(changeset, field, _options \\ []) do
    validate_change(changeset, field, fn _, length ->
      if (rem(length, 15) != 0) do
        [length: "Must be in 15 minute increments"]
      else
        []
      end
    end)
  end
end
