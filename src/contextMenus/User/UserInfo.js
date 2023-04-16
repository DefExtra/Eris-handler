const ContextMenuStructure = require("../../structures/ContextMenuStructure");


class UserInfoMenu extends ContextMenuStructure {
    constructor() {
        super('User Info', { description: 'Shows the information of user.'})
    }

    async action(client, interaction) {
        let u = client.users.get(interaction.data.target_id)
        interaction.createMessage(`Hi, Target: ${u.username}`)
    }
}

module.exports = new UserInfoMenu();