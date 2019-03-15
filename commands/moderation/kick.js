const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    message.delete().catch(err => { })
    if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply('no tienes permiso para expulsar miembros');
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) return message.reply('no tengo permiso para expulsar miembros');
    if (message.mentions.members.array()[0]) {
        bot.fetchUser(message.mentions.users.array()[0].id)
            .then(u => {
                if (message.guild.member(u)) {
                    if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    message.guild.ban(u)
                        .then(m => {
                            let embed = new Discord.RichEmbed()
                                .setTitle('🥾 Usuario Expulsado')
                                .addField('Usuario', `<@${m.id}>`, true)
                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                .addField('ID', m.id, true)
                                .setColor('#ffa500')
                                .setImage("https://pa1.narvii.com/6374/3f7082829735834d3e991e1934db5c14299c4872_hq.gif")

                            message.channel.send(embed).catch(err => { })
                        })
                        .catch(err => { })
                }
            })
            .catch(err => {
                message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
            })
    } else if (message.content.split(" ")[1]) {
        if (!message.content.split(" ")[1]) return message.reply('no puedes dejar en blanco el comando')
        if (!message.content.split(" ")[1].match(new Discord.MessageMentions.USERS_PATTERN)) return message.reply('esto no parece ser una ID');
        bot.fetchUser(message.content.split(" ")[1])
            .then(u => {
                if (message.guild.member(u)) {
                    if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    message.guild.member(message.content.split(" ")[1]).ban()
                        .then(m => {
                            let embed = new Discord.RichEmbed()
                                .setTitle('🥾 Usuario Expulsado')
                                .addField('Usuario', `<@${m.id}>`, true)
                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                .addField('ID', m.id, true)
                                .setColor('#ffa500')
                                .setImage("https://pa1.narvii.com/6374/3f7082829735834d3e991e1934db5c14299c4872_hq.gif")

                            message.channel.send(embed).catch(err => { })
                        })
                        .catch(err => { })
                }
            })
            .catch(err => {
                message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
            })
    }
    else {
        message.reply(`no he podido encontrar al usuario ${message.content.split(" ")[1]}, revisa que no sea la ID de un canal o un servidor`)
    }
}

module.exports.data = {
    module: "moderation",
    name: "kick"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {

}