require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
bot.login(TOKEN);
const CommandManager = require("./commands/manager");

const manager = CommandManager.Instance;
manager.load();


bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});


bot.on('message', msg => {
    try{
        manager.handle(msg);
    }catch(e){        
    }
});

