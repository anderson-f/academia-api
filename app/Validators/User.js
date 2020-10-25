"use strict";

class User {
  get rules() {
    return {
      name: "required",
      username: "required",
      email: "required",
      password: "required",
      password: "required",
    };
  }

  get messages() {
    return {
      "name.required": "Informe a propriedade name",
      "username.required": "Informe a propriedade name",
      "email.required": "Informe a propriedade name",
      "password.required": "Informe a propriedade name",
      "password.required": "Informe a propriedade name",
    };
  }
}

module.exports = User;
