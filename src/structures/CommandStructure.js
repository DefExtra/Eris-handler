module.exports = class CommandStructure {
  name;
  description;
  aliases;
  enabled;
  slashData;
  cooldown;
  guildOnly;

  constructor(name, data) {
    this.name = name;
    this.description = data.description;
    this.slashData = data.slashData;
    this.aliases = data.aliases;
    this.cooldown = data.cooldown;
    this.guildOnly = data.guildOnly;
    this.enabled = data.enabled;
    this.slashEnabled = data.slashData.enabled;
  }
};
