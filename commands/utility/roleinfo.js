const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var tosearch = message.content.split(" ").slice(1).join(" ")
    // roles = message.guild.roles.array()
    // console.log(message.guild.roles.size)
    // console.log(message.guild.roles.map(r => r.position))
    try {
        if (message.mentions.roles.size) {
            var role = message.mentions.roles.array()[0]
            message.guild.fetchMembers()
                .then(g => {
                    let embed = new Discord.RichEmbed()
                        .setTitle(role.name)
                        .addField('ID', role.id, true)
                        .addField('Mencionable', role.mentionable ? "Si" : "No", true)
                        .addField('Mostrar separado de otros roles', role.hoist ? "Si" : "No", true)
                        .addField('Color', role.hexColor, true)
                        .addField('Miembros', role.members.size, true)
                        .addField('Administrado por tercero', role.managed ? "Si" : "No", true)
                        .setColor(role.hexColor)
                        .setFooter(`Puedes mencionar este rol escribiendo <@&${role.id}>`)
                    message.channel.send(embed).catch(err => { });
                }).catch(err => { })
        }
        else {
            if (!message.guild.roles.find(r => r.name == tosearch)) return message.reply('no he encontrado ese rol')
            role = message.guild.roles.find(r => r.name == tosearch)
            message.guild.fetchMembers()
                .then(g => {
                    let embed = new Discord.RichEmbed()
                        .setTitle(role.name)
                        .addField('ID', role.id, true)
                        .addField('Mencionable', role.mentionable ? "Si" : "No", true)
                        .addField('Mostrar separado de otros roles', role.hoist ? "Si" : "No", true)
                        .addField('Color', role.hexColor, true)
                        .addField('Miembros', role.members.size, true)
                        .addField('Administrado por tercero', role.managed ? "Si" : "No", true)
                        .setColor(role.hexColor)
                        .setFooter(`Puedes mencionar este rol escribiendo <@&${role.id}>`)
                    message.channel.send(embed).catch(err => { });
                }).catch(err => { })
        }
    } catch (err) { console.log(err) }
}

module.exports.data = {
    module: "utility",
    name: "roleinfo"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {

}