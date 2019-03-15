const Discord = require('discord.js');
const ytdl = require('ytdl-core');
var YouTube = require('youtube-node');
var youtube = new YouTube();
var youtubesearch = require('youtube-search');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {

    if(!message.member.voiceChannel) return message.channel.send("Tienes que estar en un canal de voz").then(m => {setTimeout(f=>{m.delete();message.delete().catch(err => console.log(err))},1000*5)});
    var permission = message.member.voiceChannel.permissionsFor(bot.user)
    if(!permission.has("CONNECT")) return message.channel.send("No tengo permisos para conectarme a este canal, modifica los permisos o habla con un administrador del servidor").then(m => {setTimeout(f=>{m.delete();message.delete().catch(err => console.log(err))},1000*5)});
    if(!permission.has("SPEAK")) return message.channel.send("No tengo permisos para hablar en este canal, modifica los permisos o habla con un administrador del servidor").then(m => {setTimeout(f=>{m.delete();message.delete().catch(err => console.log(err))},1000*5)});
    
    message.delete().catch(err => console.log(err))

    var youtubeurl = "https://www.youtube.com/watch?v=";
    youtube.setKey(bot.ytkey);

    if(message.content.split(" ")[1].includes("http")){
        console.log("http detected")
        if(message.author.id != bot.ownerid)return message.reply("todavia no estoy preparado para utilizar URLs, prueba usando palabras calves de lo que quieras buscar")
        else{
            ytdl.getInfo(message.content.split(" ")[1].split("=")[1], (err, info) => {
                if (err) throw err;
                var segundos = Math.floor(info.length_seconds)
                var minutos = Math.floor(segundos/60)
                var horas = Math.floor(minutos/60)
                var time = [minutos-(horas*60),segundos-(minutos*60)]
                  console.log(`${horas}:${time[0]}:${time[1]}`);
            });              
        }
    }
    else{
            youtube.search(message.content.split(" ").slice(1).join(" "),5,function(error,result){
            if(error)return console.error(error);
            else{
                console.log(result)
                console.log(result.items[1].snippet)
                console.log(result.items[1].snippet.title.replace(/"/g,'\"'))
                console.log(typeof result.items[1].snippet.title)
            // console.log(result.items[0].snippet.title);
            // console.log(result.items[0].snippet.channelTitle);
            let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username,message.author.avatarURL)
                .setTitle("Estos son los resultados de tu busqueda, escribe un numero para seleccionar una canción")
                .addField(`1.- ${result.items[0].snippet.title}`,`${result.items[0].snippet.channelTitle}`)
                .addField(`2.- ${result.items[1].snippet.title}`,`${result.items[1].snippet.channelTitle}`)
                .addField(`3.- ${result.items[2].snippet.title}`,`${result.items[2].snippet.channelTitle}`)
                .addField(`4.- ${result.items[3].snippet.title}`,`${result.items[3].snippet.channelTitle}`)
                .addField(`5.- ${result.items[4].snippet.title}`,`${result.items[4].snippet.channelTitle}`)
                .setFooter(`Escribe c para cancelar`)
                .setColor(0xff0000);
            message.channel.send(embed)
                .then(embed => {
                    const filter = m => ((Number.isInteger(Number(m.content)) && (Number(m.content) < 6 && Number(m.content) > 0)) || m.content == "c") && m.author.id == message.author.id;
                    message.channel.awaitMessages(filter,{max:1,time:60000,errors:['time']})
                        .then(collected => {
                        // console.log(collected); 
                        // console.log(Number(collected.map(mf => mf.content).toString())-1);
                        if(Number.isInteger(Number(collected.map(mf => mf.content)))){
                            // console.log(result.items[Number(collected.map(mf => mf.content).toString())-1].id.videoId)
                            embed.delete().catch(err => {})
                            // console.log(collected.map(ch => ch.channel));
                            // console.log(embedyt);
                            // console.log(message.channel)                            
                            // collected.map(ch => ch.channel.send(embedyt))
                            const table = db.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'musicqueue_${message.guild.id}';`).get();
                                // console.log(table['count(*)'])
                                // console.log(!table['count(*)'])
                            if(!table['count(*)']){
                                db.prepare(`CREATE TABLE IF NOT EXISTS musicqueue_${message.guild.id} (requesterid VARCHAR, url VARCHAR, songname VARCHAR, songthumbnail VARCHAR);`).run();
                                db.prepare(`INSERT INTO musicqueue_${message.guild.id} (requesterid, url, songthumbnail, songname) VALUES ('${message.author.id}', '${youtubeurl}${result.items[Number(collected.map(mf => mf.content))-1].id.videoId}', '${result.items[Number(collected.map(mf => mf.content))-1].snippet.thumbnails.high.url}', '${result.items[Number(collected.map(mf => mf.content))-1].snippet.title.replace(/'/g,"''")}')`).run();
                                let embedaddqueue = new Discord.RichEmbed()
                                    .setTitle("Canción añadida a la cola")
                                    .setDescription(`**${result.items[Number(collected.map(mf => mf.content))-1].snippet.title}** se ha añadido a la cola a petición de <@${message.author.id}>`)
                                    .setColor(0xff0000)
                                    .setThumbnail(result.items[Number(collected.map(mf => mf.content))-1].snippet.thumbnails.high.url)
                                message.channel.send(embedaddqueue)
                                bot.globalfunctions.get("play").run(bot,message,transsv,nickcmds,db);
                            }
                            else{
                                console.log(result.items[Number(collected.map(mf => mf.content))-1].snippet.title)
                                db.prepare(`INSERT INTO musicqueue_${message.guild.id} (requesterid, url, songthumbnail, songname) VALUES ('${message.author.id}', '${youtubeurl}${result.items[Number(collected.map(mf => mf.content))-1].id.videoId}', '${result.items[Number(collected.map(mf => mf.content))-1].snippet.thumbnails.high.url}', '${result.items[Number(collected.map(mf => mf.content))-1].snippet.title.replace(/'/g,"''")}')`).run();
                                let embedaddqueue = new Discord.RichEmbed()
                                    .setTitle("Canción añadida a la cola")
                                    .setDescription(`**${result.items[Number(collected.map(mf => mf.content))-1].snippet.title}** se ha añadido a la cola a petición de <@${message.author.id}>`)
                                    .setColor(0xff0000)
                                    .setThumbnail(result.items[Number(collected.map(mf => mf.content))-1].snippet.thumbnails.high.url)
                                message.channel.send(embedaddqueue)
                                message.guild.fetchMember(bot.user)
                                    .then(b => {
                                        // console.log(b.voiceChannel)
                                        // console.log(!b.voiceChannel)
                                        if(!b.voiceChannel){
                                            bot.globalfunctions.get("play").run(bot,message,transsv,nickcmds,db);
                                        }
                                    })
                            }
                            collected.map(mf => mf.delete());
                            // // playmusic (message);
                        }
                            if(collected.map(mf => mf.content) == "c"){
                                embed.delete()
                                let embedyt = new Discord.RichEmbed()
                                    .setDescription(`Seleccion cancelada`)
                                    .setColor(0xff0000);                          
                                collected.map(ch => ch.channel.send(embedyt)
                                    .then(e => {setTimeout(() => {e.delete()},1000 * 5)})
                                    .catch(e => console.log(e)));
                                collected.map(mf => mf.delete());
                            }
                        })
                        .catch(error => console.log(error));
                })
            }
        })
    }
}  

module.exports.data = {
    module:"music",
    name: "play"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    
}