const ContextMenuStructure = require("../../structures/ContextMenuStructure");


class MessageInfo extends ContextMenuStructure {
    constructor() {
        super('Message Info', { description: 'Shows the information of message.'})
    }

    async action(client, interaction) {
        interaction.createMessage(`Hi, Target Message ID: ${interaction.data.target_id}`)
    }
}

module.exports = new MessageInfo();