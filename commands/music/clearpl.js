const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    db.prepare(`DROP TABLE 'musicqueue_${message.guild.id}';`).run();
    let embed = new Discord.RichEmbed()
        .setDescription("Se ha limpiado la lista de reproducción del servidor")
        .setColor(bot.color)
    message.channel.send(embed)
}

module.exports.data = {
    module: "music",
    name: "clearpl"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.join.help.title)
        .setDescription(transsv.join.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}