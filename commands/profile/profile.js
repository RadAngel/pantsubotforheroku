const Discord = require('discord.js');
module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var expbase = 500
    var lvlmult = 2.45

    if (!message.content.split(" ")[1] && !message.mentions.users.first()) {
        let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
        if (!user['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, false, message.author.id);
        }
        let userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
        if (JSON.parse(userrow.progress).lvl <= 0) {
            lvlmult = 1
        }
        if (JSON.parse(userrow.progress).lvl > 0) {
            lvlmult = 2.45 * JSON.parse(userrow.progress).lvl
        }
        let embed = new Discord.RichEmbed()
            .setTitle(`Perfil`)
            .setThumbnail(message.author.avatarURL)
            .setDescription(`<@${message.author.id}>`)
            .addField("Experiencia", JSON.parse(userrow.progress).xp, true)
            .addField("Nivel", JSON.parse(userrow.progress).lvl, true)
            .addField("Experiencia para el siguiente nivel", expbase * lvlmult, true)
            .addField("PantsuCoins", JSON.parse(userrow.economy).pantsucoins, true)
            .addField("Genero/Especie/Objeto", JSON.parse(userrow.customdata).gender, true)
            .addField("Mensaje Personal", JSON.parse(userrow.customdata).pm, true)
            .setColor(JSON.parse(userrow.customdata).color);
        message.channel.send(embed)
        return;
    }
    if (Number.isInteger(Number(message.content.split(" ")[1])) && message.content.split(" ")[1].length == 18 && !message.mentions.users.first()) {
        let askerregistered = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
        if (!askerregistered['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, false, message.author.id);
        }
        bot.fetchUser(message.content.split(" ")[1])
            .then(u => {
                let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${u.id};`).get();
                if (!user['count(*)']) {
                    bot.globalfunctions.get("registeruser").run(bot, message, db, u.bot, u.id);
                }
                let userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${u.id};`).get();
                if (JSON.parse(userrow.progress).lvl <= 0) {
                    lvlmult = 1
                }
                if (JSON.parse(userrow.progress).lvl > 0) {
                    lvlmult = 2.45
                }
                let embed = new Discord.RichEmbed()
                    .setTitle(`Perfil`)
                    .setThumbnail(u.avatarURL)
                    .setDescription(`<@${u.id}>`)
                    .addField("Experiencia", JSON.parse(userrow.progress).xp, true)
                    .addField("Nivel", JSON.parse(userrow.progress).lvl, true)
                    .addField("Experiencia para el siguiente nivel", expbase * lvlmult, true)
                    .addField("PantsuCoins", JSON.parse(userrow.economy).pantsucoins, true)
                    .addField("Genero/Especie/Objeto", JSON.parse(userrow.customdata).gender, true)
                    .addField("Mensaje Personal", JSON.parse(userrow.customdata).pm, true)
                    .setColor(JSON.parse(userrow.customdata).color);
                message.channel.send(embed)
                return;
            })
            .catch(err => {
                let embed = new Discord.RichEmbed()
                    .setDescription("¿Estas seguro de que este es un usuario?, ¿al menos un bot?, podria ser un canal o un servidor")
                    .setColor(0xFF0000);
                message.channel.send(embed)
            })
    }
    if (message.mentions.users.first() && !Number.isInteger(Number(message.content.split(" ")[1]))) {
        let askerregistered = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
        if (!askerregistered['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, false, message.author.id);
        }
        let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.mentions.users.first().id};`).get();
        if (!user['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, message.mentions.users.first().bot, message.mentions.users.first().id);
        }
        let userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.mentions.users.first().id};`).get();
        if (JSON.parse(userrow.progress).lvl <= 0) {
            lvlmult = 1
        }
        if (JSON.parse(userrow.progress).lvl > 0) {
            lvlmult = 2.45
        }
        let embed = new Discord.RichEmbed()
            .setTitle(`Perfil`)
            .setThumbnail(message.mentions.users.first().avatarURL)
            .setDescription(`<@${message.mentions.users.first().id}>`)
            .addField("Experiencia", JSON.parse(userrow.progress).xp, true)
            .addField("Nivel", JSON.parse(userrow.progress).lvl, true)
            .addField("Experiencia para el siguiente nivel", expbase * lvlmult, true)
            .addField("PantsuCoins", JSON.parse(userrow.economy).pantsucoins, true)
            .addField("Genero/Especie/Objeto", JSON.parse(userrow.customdata).gender, true)
            .addField("Mensaje Personal", JSON.parse(userrow.customdata).pm, true)
            .setColor(JSON.parse(userrow.customdata).color);
        message.channel.send(embed)
        return;
    }
    if (message.mentions.users.first() && Number.isInteger(Number(message.content.split(" ")[1]))) {
        let embed = new Discord.RichEmbed()
            .setDescription("Espera... decide a quien busco primero")
    }
}

module.exports.data = {
    module: "profile",
    name: "profile"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Comando Perfil")
        .setDescription("Te permite ver tu perfil o el de alguien mas")
        .addField("Uso para ver el perfil de uno mismo", "```" + "-perfil" + "```", false)
        .addField("Uso para ver el perfil de alguien mas", "```" + "-perfil @usuario\no\n-perfil <id>" + "```", false)
        .setFooter("Recuerda quitar las <> al usar el comando", message.author.avatarURL)
        .setColor(0xff68f9);
    message.channel.send(embed)
}