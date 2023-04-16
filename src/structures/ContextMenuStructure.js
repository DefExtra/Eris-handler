module.exports = class ContextMenuStructure {
  name;
  description;
  enabled;
  constructor(name, data) {
    this.name = name;
    this.description = data.description;
    this.enabled = data.enabled;
  }
};
