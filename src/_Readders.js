const { readdirSync } = require("fs");

module.exports = (dirname, client) => {
  try {
    readdirSync(dirname + "/commands/").forEach(async (d) => {
      const commands = readdirSync(dirname + `/commands/${d}/`);
      for (let fsile of commands) {
        let file = require(dirname + `/commands/${d}/${fsile}`);
        client.commands.set(file.name, file);
      }
    });
    readdirSync(dirname + "/contextMenus/").forEach(async (d) => {
      const commands = readdirSync(dirname + `/contextMenus/${d}/`);
      for (let fsile of commands) {
        let file = require(dirname + `/contextMenus/${d}/${fsile}`);
        client.menus.set(file.name, file);
      }
    });
    readdirSync(dirname + "/events/").forEach((dir) => {
      const events = readdirSync(dirname + `/events/${dir}/`);
      for (let file of events) {
        const evt = require(dirname + `/events/${dir}/${file}`);

        if (evt.once === true) {
          client.once(evt.name, evt.action.bind(null, client));
        } else {
          client.on(evt.name, evt.action.bind(null, client));
        }
      }
    });
  } catch (e) {
    console.log(e);
  }

  client.on("ready", () => {
    readdirSync(dirname + "/commands/").forEach(async (d) => {
      const commands = readdirSync(dirname + `/commands/${d}/`);
      for (let fsile of commands) {
        let file = require(dirname + `/commands/${d}/${fsile}`);
        if (file.slashData) {
          client.createCommand({
            name: file.slashData.name,
            description: file.description,
            options: file.slashData.options,
            type: 1,
          });
        }
      }
    });
    readdirSync(dirname + "/contextMenus/").forEach(async (d) => {
      const commands = readdirSync(dirname + `/contextMenus/${d}/`);
      for (let fsile of commands) {
        let file = require(dirname + `/contextMenus/${d}/${fsile}`);
        if (d === "User") {
          client.createCommand({ name: file.name, type: 2 });
        } else {
          client.createCommand({ name: file.name, type: 3 });
        }
      }
    });
  });
};
