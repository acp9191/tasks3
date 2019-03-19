defmodule Tasks3Web.TaskView do
  use Tasks3Web, :view
  alias Tasks3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{
      id: task.id,
      title: task.title,
      description: task.description,
      length: task.length,
      is_complete: task.is_complete,
      user_id: task.user_id
    }
  end
end
