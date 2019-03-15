const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (message.content.split(" ")[1]) {
        var colortoset = message.content.split(" ")[1].toUpperCase();
        let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
        if (!user['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, false);
        }
        var userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
        var newobject = JSON.parse(userrow.customdata)
        newobject.color = colortoset
        db.prepare(`UPDATE profiles SET customdata = '${JSON.stringify(newobject).replace(/'/g,"''")}' WHERE id = ${message.author.id};`).run();
        userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
        let embed = new Discord.RichEmbed()
            .setDescription(`${JSON.parse(userrow.customdata).color} ha sido establecido como color de tu perfil, a la izquierda de este mensaje tienes un ejemplo`)
            .setColor(JSON.parse(userrow.customdata).color);
        message.channel.send(embed).then(m => setTimeout(f => {
            m.delete();
            message.delete().catch(err => console.log(err));
        }, 1000 * 60))
    } else {
        let embed = new Discord.RichEmbed()
            .setTitle("Color de perfil")
            .setDescription(`Para elegir el color de tu perfil solo tienes que poner este comando con un color de la lista de abajo o con un numero hexadecimal (con o sin #)`)
            .addField("Colores", `'DEFAULT', 'AQUA', 'GREEN', 'BLUE', 'PURPLE', 'GOLD', 'ORANGE', 'RED', 'GREY', 'DARKER_GREY', 'NAVY', 'DARK_AQUA', 'DARK_GREEN', 'DARK_BLUE', 'DARK_PURPLE', 'DARK_GOLD', 'DARK_ORANGE', 'DARK_RED', 'DARK_GREY', 'LIGHT_GREY', 'DARK_NAVY', 'RANDOM' (RANDOM cambia cada vez que escribes **-perfil**)`, true)
            .addField("Ejemplo Color Hexadecimal", "0xff68f9, #ff68f9 o ff68f9 es el color que vez a la izquierda de este mensaje")
            .setColor(bot.color);
        message.channel.send(embed).then(m => setTimeout(f => {
            m.delete();
            message.delete().catch(err => console.log(err));
        }, 1000 * 60))
    }
}

module.exports.data = {
    module: "profile",
    name: "color"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}