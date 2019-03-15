const Discord = require('discord.js');
var wait = ms => new Promise((r, j) => setTimeout(r, ms))

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var memberstoremove = [];
    if (!message.member.permissions.has('MANAGE_ROLES')) return message.reply('no puedes usar este comando, necesitas el permiso de administrar roles')
        .then(m => {
            setTimeout(async () => {
                m.delete().catch();
            }, 5 * 1000);
        }).catch();
    function removerolelist(membarr, message, counter) {
        if (membarr.length > 0) {
            membarr[0].removeRole(message.mentions.roles.array()[0], 'Remove mass role').then(memrem => {
                membarr.shift()
                counter += 1;
                removerolelist(membarr, message, counter);
            })
        } else {
            message.channel.send(`Se ha removido el rol **${message.mentions.roles.array()[0].name}** a ${counter} miembros`)
        }
        // membarr[0]
    }
    // if(message.channel.content.split(' ')[1].includes('['))
    // if(message.mentions.roles.size){
    //     for(i=0;i<message.mentions.roles.size;i++){
    //         if(message.guild.roles.find(r => r.name, message.mentions.roles.array()[i].name)){

    //         }
    //         else {

    //         }
    //     }
    // }

    // console.log(message.guild.roles.size)
    // message.guild.roles.array().forEach(role => {
    //     console.log(`${role.name} | ${role.position}`)
    // });
    // console.log(message.guild.roles.map(r => r.name))
    // console.log(message.guild.members.array())
    if (message.mentions.roles.size) {
        console.log(message.mentions.roles.array()[0])
        // message.channel.send(`<@&${message.mentions.roles.array()[0].id}>`).catch()
        // message.mentions.roles.array().forEach(role => {
        //     if(role.mentionable){
        //         roleadd = role
        //     }
        //     else{
        //         roleadd = "**" + role.name + "**"
        //     }
        // });
        if (message.mentions.roles.size == 1) {
            // console.log('1rol')
            if (message.mentions.roles.array()[0].position > message.guild.me.roles.array()[1].position) return message.reply(`el rol **${message.mentions.roles.array()[0].name}** es mas alto que mi mayor rol`);
            // console.log('no es mayor')
            // console.log(message.member.roles.find(r => r.id === message.mentions.roles.array()[0].id))
            totalremove = 0;
            message.guild.fetchMembers()
                .then(gm => {
                    gm.members.array().forEach(member => {
                        // console.log(member.roles.find(r => r.id === message.mentions.roles.array()[0].id))
                        if (member.roles.find(r => r.id === message.mentions.roles.array()[0].id)) {
                            memberstoremove.push(member)
                            // await member.removeRole(message.mentions.roles.array()[0], 'Remove mass role')
                            // totalremove += 1;
                            // console.log(member.user.username);
                        }
                    });
                    message.reply(`¿estas seguro de que deseas remover ${message.mentions.roles.array()[0].name} de todos los usuarios que lo tengan (${memberstoremove.length})? **si/no**`)
                        .then(me => {
                            const filter = m => (m.content.toLowerCase().startsWith('no') || m.content.toLowerCase().startsWith('si')) && m.author.id == message.author.id;
                            message.channel.awaitMessages(filter, { max: 1, time: 60 * 1000, errors: ['time'] })
                                .then(coll => {
                                    if (coll.array()[0].content.toLowerCase().startsWith('si')) {
                                        coll.array()[0].react('✅')
                                        removerolelist(memberstoremove, message, counter = 0)
                                    }
                                    else if (coll.array()[0].content.toLowerCase().startsWith('no')) {
                                        coll.array()[0].react('❎');
                                    }
                                })
                                .catch(coll => {
                                    message.channel.send('Se acabo el tiempo')
                                })
                        }).catch(err => console.log(err))

                    // message.channel.send(`Se ha removido ${message.mentions.roles.array()[0].name} a ${totalremove} miembros`)
                })

        }
        // message.channel.send()
    }
    // message.guild.members.array().forEach(member => {

    //     console.log(`${member.nickname} | ${member.roles.map(r => r.name)}`)
    // });
    // console.log(message.guild.members.map(m => m.nickname))
    // console.log(message.guild.members.map(m => m.roles))
}

module.exports.data = {
    module: "moderation",
    name: "removemassrole"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Remover masivamente roles")
        .setDescription('Este comando permite remover 1 o mas roles a todos/varios usuarios de un servidor\nPara usar este comando necesitas el permiso **Administrar Roles**')
        .addField('Uso con menciones de roles', "```" + bot.prefix + "removemassrole <@Rol1> <@Rol2> <@Rol3> <@Rol...>" + "```")
        .addField('Uso con nombres de roles', "```" + bot.prefix + "removemassrole <nombre de rol1>,<nombre de rol2>,<nombre de rol...>" + "```")
        .addField('Opccionales', "```" + 'ignoreBots\nonlyBots\nignoreRole\nignoreUsers(@user1,@user2,@user3)\no\nignoreUsers(id1,id2,id3)' + "```")
        .addField('Uso de Opccionales', "```" + bot.prefix + "removemassrole [ignoreBots,ignoreUsers(@user1,@user2)] <@Rol1> <@Rol2>" + "```")
        .setFooter(transsv.helpfooter, message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}