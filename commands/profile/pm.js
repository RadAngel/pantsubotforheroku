const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var maxcharacters = 700

    if (!message.content.split(" ").slice(1).join(" ").slice(0, maxcharacters)) {
        return message.reply("Escribe algo, no puedo dejarlo en blanco, tienes un maximo de 700 caracteres").then(m => {
            setTimeout(f => {
                m.delete();
                message.delete().catch(err => console.log(err))
            }, 1000 * 5)
        });
    }
    
    var pmtoset = message.content.split(" ").slice(1).join(" ").slice(0, maxcharacters);
    let user = db.prepare(`SELECT count(*) FROM profiles WHERE id = ${message.author.id};`).get();
    if (!user['count(*)']) {
        bot.globalfunctions.get("registeruser").run(bot, message, db, false);
    }
    let userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
    var newobject = JSON.parse(userrow.customdata)
    newobject.pm = pmtoset
    db.prepare(`UPDATE profiles SET customdata = '${JSON.stringify(newobject).replace(/'/g,"''")}' WHERE id = ${message.author.id};`).run();
    userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
    let embed = new Discord.RichEmbed()
        .setDescription(`**${message.member.displayName}** tu mensaje personal se ha definido como **${JSON.parse(userrow.customdata).pm}**`)
        .setColor(JSON.parse(userrow.customdata).color);
    message.channel.send(embed).then(m => setTimeout(f => {
        m.delete();
        message.delete().catch(err => console.log(err));
    }, 1000 * 20))
}

module.exports.data = {
    module: "profile",
    name: "pm"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}