# Tasks3

To start your Phoenix server:

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: http://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix

## Design Choices

  * Anyone can create a new user
  * Once a user is logged in they can edit their own username (email) or password
  * Once a new user is created, they are automatically logged in with that user's credentials
  * Only a user can delete their own profile
  * Once their profile is deleted they are logged out
  * Anyone can view users or tasks
  * Only logged in users can create a new task
  * Once a user is logged in they can edit or delete any task, in addition to viewing them
  * Validation for logging in, creating a new user, editing a user, createing a new task, and editing a task are done by alerting the user through the browser
  * A user is automatically logged out on page refresh 
