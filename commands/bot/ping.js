const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setDescription("```js\n"+"Pong "+`${message.member.displayName} `+Math.floor(bot.ping)+"ms"+"! (Entre mi host y el servidor, no es tu ping, tu ping es una basura)```")
        .setImage("https://thumbs.gfycat.com/GoldenScaryBlowfish-size_restricted.gif")
        .setColor(bot.color);
    message.channel.send(embed);
    message.delete()
        .catch(err => {console.log(`Error al borrar mensaje del comando -ping en ${message.guild.name} por: ${err}`.yellow)})
}

module.exports.data = {
    module: "bot",
    name: "ping"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.ping.help.title)
        .setDescription(transsv.ping.help.description)
        .addField(transsv.use,"```"+transsv.ping.help.use+"```",true)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}