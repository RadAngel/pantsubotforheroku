const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    // db.prepare(`DROP TABLE 'musicqueue_${message.guild.id}';`).run();
    // embed = new Discord.RichEmbed()
    //     .setDescription("Se ha limpiado la lista de reproducción del servidor")
    //     .setColor(bot.color)
    // message.channel.send(embed)
    const table = db.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'musicqueue_${message.guild.id}';`).get();
    if (!table['count(*)']) {
        if (message.content.split(" ")[1]) {
            if (!message.content.split(" ")[1].includes("-")) {
                if (Number.isInteger(Number(message.content.split(" ")[1]))) {
                    let serverqueue = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).all();
                    var todelete = serverqueue[Number(message.content.split(" ")[1]) - 1];
                    console.log(serverqueue);
                    console.log(todelete);
                    db.prepare(`DELETE FROM musicqueue_${message.guild.id} WHERE rowid = ${todelete.rowid}`).run();
                    let embed = new Discord.RichEmbed()
                        .setDescription(`Se ha removido la canción ${todelete.songname} pedida por <@${todelete.requesterid}>`)
                        .setColor(0xff0000);
                    message.channel.send(embed);
                }
                else {
                    message.channel.send("Intenta que sea un numero");
                }
            }
            else {
                if (Number.isInteger(Number(message.content.split(" ")[1].split("-")[0])) && Number.isInteger(Number(message.content.split(" ")[1].split("-")[1]))) {
                    let serverqueue = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).all();
                    var numeroa = Number(message.content.split(" ")[1].split("-")[0]);
                    var numerob = Number(message.content.split(" ")[1].split("-")[1]);
                    console.log(numeroa);
                    console.log(numerob);
                    if (numeroa > numerob) {
                        message.channel.send("No entiendo por que has puesto los numeros al reves");
                        
                    }
                    else if (numeroa == numerob) {
                        var randomnumb = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
                        switch (randomnumb) {
                            case 1:
                                var pharase = "Por que haces esto?";
                                break;
                            case 2:
                                var pharase = "En verdad has puesto el mismo numero?";
                                break;
                            case 3:
                                var pharase = "Esto es ridiculo";
                                break;
                        }
                        message.channel.send(pharase);
                        todelete = serverqueue[Number(message.content.split(" ")[1].split("-")[0]) - 1];
                        db.prepare(`DELETE FROM musicqueue_${message.guild.id} WHERE rowid = ${todelete.rowid}`).run();
                        let embed = new Discord.RichEmbed()
                            .setDescription(`Se ha removido la canción ${todelete.songname} pedida por <@${todelete.requesterid}>`)
                            .setColor(0xff0000);
                        message.channel.send(embed);
                    }
                    else {

                    }
                }
                else {
                    message.channel.send("Intenta que sean numeros");
                }
            }
        }
        else {

        }
    }
    else {
        let embed = new Discord.RichEmbed()
            .setDescription(`No hay canciones para remover de la lista`)
            .setColor(0xff0000);
        message.channel.send(embed);
    }
}

module.exports.data = {
    module: "music",
    name: "remove"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.join.help.title)
        .setDescription(transsv.join.help.description)
        .setFooter(transsv.helpfooter, message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}