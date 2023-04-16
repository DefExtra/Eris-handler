const { Client } = require("eris");
const ListenerStructure = require("../../Structures/ListenerStructure");

class Ready extends ListenerStructure {
  constructor() {
    super("ready", { once: false });
  }
  /**
   *
   * @param {Client} client
   */
  action(client) {
    console.log(
      `'${client.user.username}#${client.user.discriminator}' - is ready!`
    );
  }
}

module.exports = new Ready();
