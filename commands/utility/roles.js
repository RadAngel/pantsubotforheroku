const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var megadescription = "";
    var lastsendnumb = 0;
    // roles = message.guild.roles.array()
    // console.log(message.guild.roles.size)
    // console.log(message.guild.roles.map(r => r.position))
    try{
    for (let i = 1; i < message.guild.roles.size; i++) {
        var roletofetch = message.guild.roles.find(r => r.calculatedPosition == i)
        if (roletofetch) {
            megadescription += `${i}.- ${roletofetch.name} | ${roletofetch.members.size} miembros\n`
        }
        if (i == 20 + lastsendnumb) {
            let embed = new Discord.RichEmbed()
                .setColor(bot.color)
                .setDescription(megadescription)
                .setTitle(`Roles del servidor (${message.guild.roles.size - 1})`)
            message.channel.send(embed).catch(err => console.log(err))
            megadescription = ""
            lastsendnumb = 30 + lastsendnumb;
        }
    }
    let embed = new Discord.RichEmbed()
        .setColor(bot.color)
        .setDescription(megadescription)
        .setTitle(`Roles del servidor (${message.guild.roles.size - 1})`)
    message.channel.send(embed).catch(err => console.log(err))
    } catch (err) {console.log(err)}
}

module.exports.data = {
    module: "utility",
    name: "roles"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {

}