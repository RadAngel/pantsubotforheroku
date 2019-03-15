const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.channel.send("https://www.youtube.com/watch?v=s5RfbQbMeeg")
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "heheboi"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription("**HEHE BOI**")
        .setColor(bot.color)
    message.channel.send(embed)
}