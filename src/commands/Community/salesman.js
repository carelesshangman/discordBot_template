const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('Sends a DM to the user who issued the command'),
    async execute(interaction) {
        await interaction.deferReply();

        await interaction.user.send('ubou te bom');

        await interaction.followUp({ content: 'pazi se, miško', ephemeral: true });
    }
};
