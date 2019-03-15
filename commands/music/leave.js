const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.guild.fetchMember(bot.user)
    .then(b => {
        // console.log(v.voiceChannel)
        if(!b.voiceChannel)return message.channel.send("No estoy en un canal de voz").then(m => {setTimeout(f=>{m.delete();message.delete().catch(err => console.log(err))},1000*5)});
        b.voiceChannel.leave()
        message.channel.send(`Desconectado de ${message.member.voiceChannel}`)
        .then(m => {
            setTimeout (e => {
                message.delete().catch(err => console.log(err));
                m.delete().catch(console.error);
            }, 1000 * 10,);
        })
    });
    return;
}

module.exports.data = {
    module: "music",
    name: "leave"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.leave.help.title)
        .setDescription(transsv.leave.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}