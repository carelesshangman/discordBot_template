const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Prijavi se in pridobi dostop do MERCATOR S.P. PIKA kartice'),
    async execute(interaction) {
        await interaction.deferReply();

        let user_id = interaction.user.id;

        fs.readFile('users.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return interaction.editReply({ content: 'An error occurred while reading the file.', ephemeral: true });
            }

            if (data.includes(user_id)) {
                return interaction.editReply({ content: 'You are already registered.', ephemeral: true });
            }
            let points = 500;
            fs.appendFile('users.txt', `${user_id} ${points};\n`, (err) => {
                if (err) {
                    console.error(err);
                    return interaction.editReply({ content: 'An error occurred while appending to the file.', ephemeral: true });
                }

                interaction.editReply({ content: 'You have been successfully registered.', ephemeral: true });
            });
        });
    }
};
