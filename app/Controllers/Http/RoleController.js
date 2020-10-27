"use strict";

const Role = use("Role");

class RoleController {
  async index() {
    return await Role.all();
  }
  async show() {
    const role = await Permission.findOrFail(params.id);
    await role.load("permissions");
    return role;
  }
  async store({ request }) {
    const { permissions, ...data } = request.only([
      "name",
      "slug",
      "description",
      "permissions",
    ]);

    const role = await Role.create(data);

    if (permissions) {
      await role.permissions().attach(permissions);
    }

    await role.load("permissions");
    return role;
  }
  async update() {
    const { permissions, ...data } = request.only([
      "name",
      "slug",
      "description",
      "permissions",
    ]);

    const role = await Permission.findOrFail(params.id);
    role.merge(data);
    await role.save();

    if (permissions) {
      await role.permissions().sync(permissions);
    }

    await role.load("permissions");
    return role;
  }
  async destroy({ params }) {
    const role = await Permission.findOrFail(params.id);
    return role.delete();
  }
}

module.exports = RoleController;
