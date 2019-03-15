const Discord = require('discord.js');
var inicio = new Date();
module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(!message.author.id == bot.ownerid || !message.author.id == '360530056793292811')return message.reply("solo el dueño del bot puede utilizar este comando");
    if (message.content.split(" ")[0] == `${bot.prefix}eval`) {
        console.log(message.content.split(" ").slice(1).join(" "))
        try {
            console.log(eval(message.content.split(" ").slice(1).join(" ")))
            message.channel.send("'"+eval(message.content.split(" ").slice(1).join(" "))+"'").catch()
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports.data = {
    module: "botowner",
    name: "eval"
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