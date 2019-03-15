const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(message.member.voiceChannel){
        message.member.voiceChannel.join()
            .then(connection => {
                message.channel.send(`${transsv.join.joinedto} ${message.member.voiceChannel}`)
                .then(m => {
                    var autodelete = setTimeout (function () {
                        message.delete().catch(err => console.log(err));
                            m.delete()
                        .catch(console.error);
                    }, 1000 * 10);
                    var lastqueue = db.prepare(`SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'musicqueue_${message.guild.id}';`).get();
                    console.log(lastqueue)
                    if(lastqueue['count(*)']){
                        var queue = db.prepare(`SELECT * FROM musicqueue_${message.guild.id};`).get();
                        console.log(queue)
                        bot.globalfunctions.get("play").run(bot,message,transsv,nickcmds,db)
                    }
                    else{
                        message.channel.send(transsv.join.noqueue)
                    }
                })
            })
        }
        else{
            message.channel.send(transsv.join.notch)
            .then(m => {
                var autodelete = setTimeout (function () {
                    message.delete().catch(err => console.log(err));
                        m.delete()
                    .catch(console.error);
                }, 1000 * 10);
            })
        }
}

module.exports.data = {
    module: "music",
    name: "join"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.join.help.title)
        .setDescription(transsv.join.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}