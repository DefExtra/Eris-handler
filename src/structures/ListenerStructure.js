module.exports = class ListenerStructure {
  name;
  once;
  constructor(name, data) {
    this.name = name;
    this.once = data.once;
  }
};
