const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.guild.fetchMember(bot.user)
    .then(b => {
        // console.log(v.voiceChannel)
        if(!b.voiceChannel)return message.channel.send("No estoy en un canal de voz").then(m => {setTimeout(f=>{m.delete();message.delete().catch(err => console.log(err))},1000*5)});
            if(!message.content.split(" ")[1]){
                bot.voiceConnections.get(message.guild.id).dispatcher.end();
                var row = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).get();
                db.prepare(`DELETE FROM musicqueue_${message.guild.id} WHERE rowid = '${row.rowid}';`).run()
                row = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).get();
                if(row){
                    bot.globalfunctions.get("play").run(bot,message,transsv,nickcmds,db);
                }
                else{
                    db.prepare(`DROP TABLE 'musicqueue_${message.guild.id}'`).run();
                    let embed = new Discord.RichEmbed()
                        .setDescription(`La lista se ha terminado`)
                        .setColor(0xff0000);
                    message.channel.send(embed);
                }
            }
            else if(Number.isInteger(Number(message.content.split(" ")[1]))){
                var row = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).get();

            }
            else{

            }
    });
    return;
}

module.exports.data = {
    module: "music",
    name: "skip"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.leave.help.title)
        .setDescription(transsv.leave.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}