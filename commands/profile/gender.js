const Discord = require('discord.js');
var inicio = new Date();
module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var maxcharacter = 40;

    if (!message.content.split(" ").slice(1).join(" ").slice(0, maxcharacter)) {
        return message.reply("Escribe algo, no puedo dejarlo en blanco, el maximo de caracteres es 40").then(m => {
            setTimeout(f => {
                m.delete();
                message.delete().catch(err => console.log(err))
            }, 1000 * 5)
        });
    }
    if (message.mentions.users.map(u => u.username) != "") {
        return message.reply("No puedes poner a alguien en tu genero").then(m => {
            setTimeout(f => {
                m.delete();
                message.delete().catch(err => console.log(err))
            }, 1000 * 5)
        });
    }

    var gendertoset = message.content.split(" ").slice(1).join(" ").slice(0, maxcharacter);
    let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
    if (!user['count(*)']) {
        bot.globalfunctions.get("registeruser").run(bot, message, db, false);
    }
    let userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
    var newobject = JSON.parse(userrow.customdata)
    newobject.gender = gendertoset
    db.prepare(`UPDATE profiles SET customdata = '${JSON.stringify(newobject).replace(/'/g,"''")}' WHERE id = ${message.author.id};`).run();
    userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
    let embed = new Discord.RichEmbed()
        .setDescription(`**${message.member.displayName}** tu genero se ha definido como **${JSON.parse(userrow.customdata).gender}**`)
        .setColor(JSON.parse(userrow.customdata).color);
    message.channel.send(embed).then(m => setTimeout(f => {
        m.delete();
        message.delete().catch(err => console.log(err));
    }, 1000 * 20))
}

module.exports.data = {
    module: "profile",
    name: "gender"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}