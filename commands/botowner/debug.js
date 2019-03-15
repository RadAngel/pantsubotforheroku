const Discord = require('discord.js');
var inicio = new Date();
module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(!message.author.id == bot.ownerid)return message.reply("solo el dueño del bot puede utilizar este comando");
    if(bot.debug == 0){
        bot.debug = 1;
        console.log("debug activado".rainbow)
    }
    else{
        bot.debug = 0;
        console.log("debug desactivado".rainbow)
    }
}

module.exports.data = {
    module: "botowner",
    name: "debug"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    var botowner = bot.users.get(bot.ownerid)
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.servers.help.title)
        .setDescription(`${transsv.servers.help.description} ${botowner.username}#${botowner.discriminator} <@${botowner.id}>`)
        .addField(transsv.forwhat,transsv.servers.help.fieldd)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color)
    message.channel.send(embed)
}