const Eris = require("eris");
const cooldowns = new Eris.Collection();
const cmdCooldown = new Map();
const ListenerStructure = require("../../Structures/ListenerStructure");

class MessageCreate extends ListenerStructure {
  constructor() {
    super("messageCreate", { once: false });
  }
  /**
   *
   * @param {Eris.Client} client
   * @param {Eris.Message} message
   * @returns
   */
  async action(client, message) {
    let prefix = require("../../config.json").prefix;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content) || message.author.bot) return;
    const [, mp] = message.content.match(prefixRegex);
    const args = message.content.slice(mp.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      );
    if (!command) return;
    if (command.enabled === false) return;
    if (command.guildOnly === true) {
      if (!message.channel.guild) return;
    }
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Eris.Collection());
    }

    const now = Date.now();
    const cooldownss = cooldowns.get(command.name);
    const amount = command.cooldown;

    if (cooldownss.has(message.author.id)) {
      const gec = cooldownss.get(message.author.id) + amount;

      if (now < gec) {
        const time = (gec - now) / 1000;
        return message.channel.createMessage(
          `${message.member.mention}, wait **${time.toFixed(
            1
          )}** seconds to use this command.`
        );
      }
    }

    cooldownss.set(message.author.id, now);
    setTimeout(() => cooldownss.delete(message.author.id), amount);

    cooldownss.set(message.author.id, now);
    if (!cmdCooldown.has(message.author.id))
      cmdCooldown.set(message.author.id, [Date.now()]);
    else {
      cmdCooldown.set(message.author.id, cooldownss);
    }

    try {
      command.action(client, message, args);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new MessageCreate();
