const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.channel.send("https://www.youtube.com/watch?v=jozBCZYf06Y")
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "conga"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription("**CONGA**")
        .setColor(bot.color)
    message.channel.send(embed)
}