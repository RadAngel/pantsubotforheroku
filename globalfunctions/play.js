const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var YouTube = require('youtube-node');
var youtube = new YouTube();

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    // clearTimeout(dc).catch(err => console.log(err))
    const table = db.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'musicqueue_${message.guild.id}';`).get();
    if(!table['count(*)']){
        message.channel.send("Cola terminada")
        // var disconnect = setTimeout(function(){message.guild.fetchMember(bot.user).voiceChannel},1000*60*5).catch(err => console.log(err));
    }
    else{
        const row = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).get();
        console.log(row)
        const dispatcher = message.member.voiceChannel.join().then(c => {var stream = c.playStream(ytdl(row.url), {filter:"audioonly"})
            .on('start', () => {
                let embed = new Discord.RichEmbed()
                    .setDescription(`Reproduciendo **${row.songname}** solicitada por <@${row.requesterid}>`)
                    .setThumbnail(row.songthumbnail)
                    .setColor(0xff0000);
                message.channel.send(embed);
            })
            .on('end', () => {
                ytdl.getInfo(row.url.split("=")[1], (err,info) => {
                    if(err) return console.log(err)
                        console.log(`Duracion esperada ${Number(info.length_seconds)*1000}`)
                    if(Number(info.length_seconds)*1000-1000 < stream.time){
                        console.log("terminada")
                        db.prepare(`DELETE FROM musicqueue_${message.guild.id} WHERE rowid = '${row.rowid}';`).run()
                        const rowk = db.prepare(`SELECT * FROM 'musicqueue_${message.guild.id}';`).get();
                        console.log(rowk)
                        if(!rowk){
                            db.prepare(`DROP TABLE 'musicqueue_${message.guild.id}'`).run();
                            let embed = new Discord.RichEmbed()
                                .setDescription(`La lista se ha terminado`)
                                .setColor(0xff0000);
                            message.channel.send(embed);
                        }
                        else{
                            bot.globalfunctions.get("play").run(bot,message,transsv,nickcmds,db);
                        }
                    }
                    else{
                        console.log("inconclusa")
                        console.log(row.rowid)
                    }
                })
                console.log(`Duracion del stream ${stream.time}`)
                console.log('Cancion terminada');
            })
            .on('error', error => {
                console.error(error);
            })
        })
    }
}