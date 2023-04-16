const { Client, Message, Interaction, CommandInteraction } = require("eris");
const CommandStructure = require("../../structures/CommandStructure");

class PingCommand extends CommandStructure {
  constructor() {
    super("ping", {
      description: "Responds with pong",
      aliases: ["pong"],
      cooldown: 5000,
      guildOnly: true,
      enabled: true,
      slashData: {
        name: "ping",
        options: [],
        enabled: true,
      },
    });
  }
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  async action(client, message, args) {
    console.log(args)
    message.channel.createMessage("pong!");
  }

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  async slashAction(client, interaction) {
    interaction.createMessage("pong!");
  }
}

module.exports = new PingCommand();
