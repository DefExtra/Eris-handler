let { Collection, CommandInteraction } = require("eris");
const cooldowns = new Collection();
const cmdCooldown = new Map();
const ListenerStructure = require("../../Structures/ListenerStructure");

class InteractionListener extends ListenerStructure {
  constructor() {
    super("interactionCreate", { once: false });
  }
  async action(client, interaction) {
    if (interaction instanceof CommandInteraction) {
      if (!interaction.data.type === 1) return;
      const slashCommand = client.commands.get(interaction.data.name);

      if (slashCommand.slashEnabled === false) return;
      if (!slashCommand) return;
      if (
        !interaction.guildID &&
        !interaction.member?.id &&
        slashCommand.guildOnly === true
      )
        return interaction.createMessage({
          content: `This command in only for servers!.`,
          flags: 64,
        });
      if (!cooldowns.has(interaction.data.name)) {
        cooldowns.set(interaction.data.name, new Collection());
      }

      const now = Date.now();
      const cooldownss = cooldowns.get(interaction.data.name);
      const amount = slashCommand.cooldown;

      if (
        cooldownss.has(
          interaction.user ? interaction.user.id : interaction.member.id
        )
      ) {
        const gec =
          cooldownss.get(
            interaction.user ? interaction.user.id : interaction.member.id
          ) + amount;

        if (now < gec) {
          const time = (gec - now) / 1000;
          return interaction.createMessage(
            `${
              interaction.user
                ? interaction.user.mention
                : interaction.member.mention
            }, you should wait **${time.toFixed(
              1
            )}** seconds to use this command.`
          );
        }
      }

      cooldownss.set(
        interaction.user ? interaction.user.id : interaction.member.id,
        now
      );
      setTimeout(
        () =>
          cooldownss.delete(
            interaction.user ? interaction.user.id : interaction.member.id
          ),
        amount
      );

      cooldownss.set(
        interaction.user ? interaction.user.id : interaction.member.id,
        now
      );
      if (
        !cmdCooldown.has(
          interaction.user ? interaction.user.id : interaction.member.id
        )
      )
        cmdCooldown.set(
          interaction.user ? interaction.user.id : interaction.member.id,
          [Date.now()]
        );
      else {
        cmdCooldown.set(
          interaction.user ? interaction.user.id : interaction.member.id,
          cooldownss
        );
      }
      try {
        slashCommand.slashAction(client, interaction);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

module.exports = new InteractionListener();
