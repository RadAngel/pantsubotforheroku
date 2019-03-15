const Discord = require('discord.js');
var inicio = new Date();
module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    let linkadm = await bot.generateInvite(["ADMINISTRATOR"]);
    let linkbas = await bot.generateInvite(2138434806)
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.invite.title)
        .setDescription(`${transsv.invite.description} <@${message.author.id}>`)
        .setImage(bot.user.avatarURL)
        .addField(transsv.invite.admlink,linkadm)
        .addField(transsv.invite.baslink,linkbas)
        .setColor(bot.color);
    message.author.send(embed)
        .catch(err => console.log(err));
}

module.exports.data = {
    module: "bot",
    name: "invite"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.invite.help.title)
        .setDescription(transsv.invite.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color)
    message.channel.send(embed)
}