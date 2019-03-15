const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    // console.log(`${message.author.username}#${message.author.discriminator} uso el comando say en ${message.guild.name} en el canal ${message.channel.name} en el servidor ${message.guild.name} a las ${message.createdAt} con el texto ${message.content}`)
    message.channel.send(message.content.split(" ").slice(1).join(" ")).catch(err => {
        if(err.message == 'Cannot send an empty message'){
            message.reply('no puedo enviar un mensaje vacio').then(m => {
                setTimeout(async function(){
                    m.delete().catch();
                },5*1000)
            }).catch()
        }
    });
    message.delete()
        .catch(err => {
            // console.log(`Error al borrar mensaje del comando -say en ${message.guild.name} por: ${err}`.yellow)
        })

}

module.exports.data = {
    module: "other",
    name: "say"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.say.help.title)
        .setDescription(transsv.say.help.description)
        .addField(transsv.use,"```"+transsv.say.help.use+"```",true)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed).catch( err => { } );
}