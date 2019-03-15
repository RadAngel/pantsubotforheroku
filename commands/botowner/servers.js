const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(message.author.id === bot.ownerid){
        for(var i=0;i<bot.guilds.map(g=>g).length;i++){
        console.log(`${i+1} Guild name: ${bot.guilds.map(g=>g.name)[i]} | Owner: ${bot.guilds.map(g=>g.owner)[i].user.tag} ${bot.guilds.map(g=>g.ownerID)[i]} | ID: ${bot.guilds.map(g=>g.id)[i]}`)
        }
    }
    else{
        message.channel.send(transsv.onlyowner)
            .then(m => {setTimeout(m.delete(),1000*5)})
    }
}

module.exports.data = {
    module: "botowner",
    name: "servers"
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