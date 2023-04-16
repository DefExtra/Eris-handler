const Readders = require("./_Readders");
const Client = require("./structures/Client");
const client = new Client();

(async () => {
  await client.connect();
  await Readders(__dirname, client);
})();
