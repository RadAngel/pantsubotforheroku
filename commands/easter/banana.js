const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(message.content.split(" ")[1] == "time"){
        message.channel.send("https://img-9gag-fun.9cache.com/photo/aExK10N_460sv.mp4")
    }
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "banana"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription(transsv.banana.help.description)
        .setColor(bot.color)
    message.channel.send(embed)
}