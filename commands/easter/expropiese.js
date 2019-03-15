const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.channel.send("https://www.youtube.com/watch?v=jOjvJAfIMSI")
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "expropiese"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription("**EXPROPIESE**")
        .setColor(bot.color)
    message.channel.send(embed)
}