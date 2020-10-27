"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { status: "online" };
});

Route.post("/sessions", "SessionController.create");
Route.put("/sessions", "SessionController.refreshToken");

Route.resource("users", "UserController")
  .apiOnly()
  .validator(
    new Map([
      [["users.store"], ["User"]],
      [["users.update"], ["User"]],
    ])
  )
  .middleware(["auth:jwt", "is:manager"]);
Route.resource("clients", "ClientController")
  .apiOnly()
  .middleware(["auth:jwt", "is:manager"]);
Route.resource("exercises", "ExerciseController")
  .apiOnly()
  .middleware(["auth:jwt", "can:gerenc_exercises"]);
Route.resource("trainings", "TrainingController")
  .apiOnly()
  .middleware(["auth:jwt", "can:gerenc_exercises"]);

Route.resource("permissions", "PermissionController")
  .apiOnly()
  .middleware(["auth:jwt", "is:manager"]);
Route.resource("roles", "RoleController")
  .apiOnly()
  .middleware(["auth:jwt", "is:manager"]);
