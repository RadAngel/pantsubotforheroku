const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    message.delete().catch(err => { })
    try {
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return message.react('🙊').catch(err => {})
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply('no tienes permiso para banear miembros');
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) return message.reply('no tengo permiso para banear miembros');
    } catch (err) { console.log(err) }
    if (message.content.split(" ")[1] == "ban") {
        // console.log('easter ban')
        if (message.mentions.users.array()[0]) {
            bot.fetchUser(message.mentions.users.array()[0].id)
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    if (message.mentions.channels.array()[0]) {
                        if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
                        if (!message.mentions.channels.array()[0].permissionsFor(bot.user.id).has('SEND_MESSAGES')) return message.reply('no puedo escribir en este canal')
                        message.mentions.channels.array()[0].send(`<@${u.id}>\nhttps://img-9gag-fun.9cache.com/photo/awAgN9W_460sv.mp4`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 60 * 1)
                            })
                    } else {
                        message.channel.send(`<@${message.mentions.members.array()[0].user.id}>\nhttps://img-9gag-fun.9cache.com/photo/awAgN9W_460sv.mp4`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { console.log(err) })
                                }, 1000 * 60 * 1)
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        } else {
            if(!message.content.split(" ")[2]) return message.reply('no puedes dejar en blanco el comando')
            bot.fetchUser(message.content.split(" ")[2])
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    if (message.mentions.channels.array()[0]) {
                        if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
                        if (!message.mentions.channels.array()[0].permissionsFor(bot.user.id).has('SEND_MESSAGES')) return message.reply('no puedo escribir en este canal')
                        message.mentions.channels.array()[0].send(`<@${u.id}>\nhttps://img-9gag-fun.9cache.com/photo/awAgN9W_460sv.mp4`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 60 * 1)
                            })
                    } else {
                        message.channel.send(`<@${message.guild.member(message.content.split(" ")[2]).user.id}>\nhttps://img-9gag-fun.9cache.com/photo/awAgN9W_460sv.mp4`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 60 * 1)
                            })
                    }
                })
                .catch(err => {
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        }
    } else if (message.content.split(" ")[1] == "exciting") {
        // console.log('easter ban')
        if (message.mentions.users.array()[0]) {
            bot.fetchUser(message.mentions.users.array()[0].id)
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    if (message.mentions.channels.array()[0]) {
                        if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
                        if (!message.mentions.channels.array()[0].permissionsFor(bot.user.id).has('SEND_MESSAGES')) return message.reply('no puedo escribir en este canal')
                        message.mentions.channels.array()[0].send(`<@${u.id}>\nhttps://img-9gag-fun.9cache.com/photo/abYAAKX_460svvp9.webm`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 20)
                            })
                    } else {
                        message.channel.send(`<@${message.mentions.members.array()[0].user.id}>\nhttps://img-9gag-fun.9cache.com/photo/abYAAKX_460svvp9.webm`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 20)
                            })
                    }
                })
                .catch(err => {
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        } else {
            if(!message.content.split(" ")[2]) return message.reply('no puedes dejar en blanco el comando')
            bot.fetchUser(message.content.split(" ")[2])
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    if (message.mentions.channels.array()[0]) {
                        if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
                        if (!message.mentions.channels.array()[0].permissionsFor(bot.user.id).has('SEND_MESSAGES')) return message.reply('no puedo escribir en este canal')
                        message.mentions.channels.array()[0].send(`<@${u.id}>\nhttps://img-9gag-fun.9cache.com/photo/abYAAKX_460svvp9.webm`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => {})
                                }, 1000 * 20)
                            })
                    } else {
                        message.channel.send(`<@${u.id}>\nhttps://img-9gag-fun.9cache.com/photo/abYAAKX_460svvp9.webm`)
                            .then(ms => {
                                setTimeout(function () {
                                    message.guild.ban(u)
                                        .then(m => {
                                            let embed = new Discord.RichEmbed()
                                                .setTitle('🚫 Usuario Baneado')
                                                .addField('Usuario', `<@${m.id}>`, true)
                                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                                .addField('ID', m.id, true)
                                                .setColor('#FF0000')
                                            message.channel.send(embed).catch(err => { })
                                        })
                                        .catch(err => { })
                                }, 1000 * 20)
                            })
                    }
                })
                .catch(err => {
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        }
    } else {
        if (message.mentions.members.array()[0]) {
            bot.fetchUser(message.mentions.users.array()[0].id)
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    message.guild.ban(u)
                        .then(m => {
                            let embed = new Discord.RichEmbed()
                                .setTitle('🚫 Usuario Baneado')
                                .addField('Usuario', `<@${m.id}>`, true)
                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                .addField('ID', m.id, true)
                                .setColor('#FF0000')
                            message.channel.send(embed).catch(err => { })
                        })
                        .catch(err => { })
                })
                .catch(err => {
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        } else {
            if(!message.content.split(" ")[1]) return message.reply('no puedes dejar en blanco el comando')
            bot.fetchUser(message.content.split(" ")[1])
                .then(u => {
                    if (message.guild.member(u)) {
                        if (!message.guild.member(u).bannable) return message.reply('no puedo banear a este miembro')
                    }
                    message.guild.member(message.content.split(" ")[1]).ban()
                        .then(m => {
                            let embed = new Discord.RichEmbed()
                                .setTitle('🚫 Usuario Baneado')
                                .addField('Usuario', `<@${m.id}>`, true)
                                .addField('Nombre', `${m.username}#${m.discriminator}`)
                                .addField('ID', m.id, true)
                                .setColor('#FF0000')
                            message.channel.send(embed).catch(err => { })
                        })
                        .catch(err => { })
                })
                .catch(err => {
                    message.reply('no he podido encontrar a este usuario, revisa que no sea la ID de un canal o un servidor')
                })
        }
    }
}

module.exports.data = {
    module: "moderation",
    name: "ban"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle('Comando pa banear')
    message.channel.send(embed)
}