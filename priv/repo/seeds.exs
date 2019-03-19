# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasks3.Repo.insert!(%Tasks3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Tasks3.Repo
alias Tasks3.Users.User

pwhash = Argon2.hash_pwd_salt("pass1")

Repo.insert!(%User{email: "alice@example.com", password_hash: pwhash})
Repo.insert!(%User{email: "bob@example.com", password_hash: pwhash})

alias Tasks3.Tasks.Task

Repo.insert!(%Task{title: "task1", description: "First Task", length: 15, is_completed: false, user_id: 1})
Repo.insert!(%Task{title: "task2", description: "Second Task", length: 15, is_completed: false, user_id: 2})