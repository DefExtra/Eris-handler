const ListenerStructure = require("../../Structures/ListenerStructure");

class ContextMenuStructure extends ListenerStructure {
  constructor() {
    super("interactionCreate", { once: false });
  }

  action(client, interaction) {
    if (interaction.data.type === 1) return;

    const cmd = client.menus.get(interaction.data.name);

    if (cmd.enabled === false) return;
    try {
      cmd.action(client, interaction);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ContextMenuStructure();
