const Discord = require('discord.js');

module.exports.eventrun = async (bot, guild, transsv, nickcmds, db) => {
    var principalchannelid = guild.channels.find(channels => channels.permissionsFor(guild.me).has("SEND_MESSAGES")).id
    console.log(principalchannelid)
    var channeltosend = bot.channels.get(principalchannelid)
    var embed = new Discord.RichEmbed()
        .setTitle("Hola")
        .setDescription("Gracias por invitarme a su servidor\n lo primero que recomiendo hacer es usar el comando "+bot.prefix+"ayuda para saber mis funciones")
        .setColor(bot.color)
    channeltosend.send(embed)
}