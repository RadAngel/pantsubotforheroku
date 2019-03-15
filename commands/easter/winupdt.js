const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.channel.send("https://img-9gag-fun.9cache.com/photo/ayXZ2QY_460svvp9.webm")
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "winupdt"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription(transsv.winupdt.help.description)
        .setColor(0x000000)
    message.channel.send(embed)
    message.channel.send("https://img-9gag-fun.9cache.com/photo/ayXZ2QY_460svvp9.webm")
}