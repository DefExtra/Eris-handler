const Eris = require("eris");
const c = require("../config.json");

module.exports = class MyClient extends Eris.Client {
  commands = new Eris.Collection();
  menus = new Eris.Collection();
  constructor() {
    super(c.token, {
      restMode: true,
      getAllUsers: true,
      intents: ["all"],
      defaultImageFormat: "png",
    });
  }
};
