const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, ActivityType } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
            // console.log( "\u001b[1;31m Red message" );
            // console.log( "\u001b[1;32m Green message" );
            // console.log( "\u001b[1;33m Yellow message" );
            // console.log( "\u001b[1;34m Blue message" );
            // console.log( "\u001b[1;35m Purple message" );
            // console.log( "\u001b[1;36m Cyan message" );

            // console.log( "\u001b[1;41m Red background" );
            // console.log( "\u001b[1;42m Green background" );
            // console.log( "\u001b[1;43m Yellow background" );
            // console.log( "\u001b[1;44m Blue background" );
            // console.log( "\u001b[1;45m Purple background" );
            // console.log( "\u001b[1;46m Cyan background" );

            //console.log( "\u001b[0m Reset text and background color/style to default" );

beerCounter = [];
alcoholicCounter = [];

function act(num, testCase = false){
    if (testCase == true) {
        console.log('\u001b[1;33mtest case \u001b[0m');
    }
    client.user.setPresence({
        activities: [{ name: "my female coworkers (sexually)", type: ActivityType.Watching }],
        status: 'idle',
    });
}

//runtime in seconds
let runTime = 0;
client.on('ready', () => {
    runTime = performance.now();
    //test consolelog
    for(i=1;i<10;i++){
        try{
            act(i, true);
        }
        catch{
            console.log('test case not there');
        }
    }
    console.log(`I'm online, my name is ${client.user.username}`);
    setInterval(() => {
        act(Math.floor(Math.random() * 4) + 1);
    }, 15000);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes('pivo') || message.content.toLowerCase().includes('beer') || message.content.toLowerCase().includes('pir')) {
        if (beerCounter.includes(message.author.id)) {
            message.reply('You already got a beer!')
        } else {
            setTimeout(function () {
                beerCounter.splice(beerCounter.indexOf(message.author.id), 1);
            }, 5000);
            message.reply('🍺');
            beerCounter.push(message.author.id);
            if (alcoholicCounter.length == 0) {
                alcoholicCounter.push([message.author.username, 1]);
            } else {
                for (i = 0; i < alcoholicCounter.length; i++) {
                    if (alcoholicCounter[i][0] == message.author.username) {
                        alcoholicCounter[i][1]++;
                        break;
                    } else {
                        alcoholicCounter.push([message.author.username, 1]);
                        break;
                    }
                }
            }
        }
        console.log(beerCounter);
        console.log(alcoholicCounter);
    }
    if (message.content.toLowerCase() === 'i think i\'m an alcoholic') {
        for (i = 0; i < alcoholicCounter.length; i++) {
            if (alcoholicCounter[i][0] == message.author.username && alcoholicCounter[i][1] > 0) {
                message.reply(`You drank ${alcoholicCounter[i][1]} beer` + (alcoholicCounter[i][1] > 1 ? 's' : '') + `!`);
                break;
            } else {
                message.reply(`You didn't drink any beers!`);
                break;
            }
        }
    }
    if (message.content.toLowerCase().includes('set status to')) {
        id = message.content.toLowerCase().replace('set status to ', '');
        act(parseInt(id));
    }
    if (message.content === '🤮') {
        for (i = 0; i < alcoholicCounter.length; i++) {
            if (alcoholicCounter[i][0] == message.author.username && alcoholicCounter[i][1] > 0) {
                message.reply(`Should I call a doctor?`);
                alcoholicCounter[i][1] = 0;
                break;
            } else {
                message.reply(`Had too much modly bread?`);
                break;
            }
        }
    }
    if (message.content === 'runtime') {
        if (Math.floor((performance.now() - runTime) / 1000) < 60)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000)} seconds`);
        else if (Math.floor((performance.now() - runTime) / 1000 / 60) < 60)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60)} minutes`);
        else if (Math.floor((performance.now() - runTime) / 1000 / 60 / 60) < 24)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60 / 60)} hours`);
        else
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60 / 60 / 24)} days`);
    }
    if (message.content.toLowerCase().includes('mleto meso')) {
        message.reply('<:mletomesano:1115367883883692264>')
    }
});



(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
    //client.on("ready", () => {});
    //make the bots status to listening to /help
})();

