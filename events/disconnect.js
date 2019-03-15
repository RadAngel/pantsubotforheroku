const Discord = require('discord.js');

module.exports.eventrun = async (bot,closeEvent) => {
    console.log("disconnected")
    console.log(closeEvent)
    // bot.destroy();
    // bot = new Discord.Client({disableEveryone: true});
}