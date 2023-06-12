// module.exports = {
//     name: 'test',
//     //aliases: ['list', 'of', 'command', 'aliases'],
//     description: 'Command description',
 
//     // Whether the command requires arguments
//     reqArgs: true,
//     // Arguments usage
//     usage: '{ @user }',
//     // Example usage of the command
//     exampleUsage: 'test @Giuliopime',
 
//     category: 'command category',
 
//     // Command cooldown in milliseconds
//     cooldown: 300,
 
//     // eslint-disable-next-line no-unused-vars
//     async run(ctx) {
//        // Code for the command goes here
//        await ctx.reply('test');
//     },
//  };

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Command description')
        .addUserOption(option => option.setName('user').setDescription('User to test').setRequired(true))
        ,
    async execute(interaction) {
        await interaction.reply(`test ${interaction.options.getUser('user')}`);
    },
    data: new SlashCommandBuilder()
        .setName('greet')
        .setDescription('Greet a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user to greet')
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        await interaction.reply(`Hello, ${user.username}!`);
    }
};
