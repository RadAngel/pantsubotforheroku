const Discord = require('discord.js');
var weather = require('weather-js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    var afkch = "";
    var humans = 0;
    var bots = 0;
    var online = 0;
    var idle = 0;
    var dnd = 0;
    var offline = 0;
        // emotesln = message.guild.emojis.map(e => e.name).select;
        // console.log(emotesln)
        // emotesarr = message.guild.emojis.map(e => e.name)
        // console.log(emotesarr)
        // emotesid = message.guild.emojis.map(e => e.id)
        // console.log(emotesid)
        // emotesout = [];
        // for(i = 0; i < emotesln; i++){emotesout.push(`${message.guild.emojis.map(e => e.name)[i]}:> <:`)}
        // console.log(emotesout)
        if(!message.guild.afkChannel){
            afkch = "No existe";
        }
        else{
            afkch = message.guild.afkChannel.name
        }
        // console.log(message.guild.members.map(p => p))
        message.guild.members.array().forEach(guildmember => {
            if(guildmember.presence.status == "online"){
                online = online + 1;
            }
            if(guildmember.presence.status == "idle"){
                idle = idle + 1;
            }
            if(guildmember.presence.status == "dnd"){
                dnd = dnd + 1;
            }
            if(guildmember.user.bot){
                bots = bots + 1;
            }
            // console.log(guildmember.presence.status)
        });
        
        offline = message.guild.memberCount-(online+idle+dnd);
        humans = message.guild.memberCount-bots;
        // message.channel.send(`online: ${online}, idle: ${idle}, dnd: ${dnd}, offline: ${offline}, humans: ${humans}, bots: ${bots}`)
        // message.channel.send(message.guild.members.array().length)
        // message.channel.send(message.guild.memberCount)
        // console.log(message.guild.members.size)
        // console.log(message.guild.presences.size)
        if (message.guild.emojis.map(e=>e.name) != ""){
        // console.log(!message.guild.afkChannel)
        let embed = new Discord.RichEmbed()
            .setTitle(`${message.guild.name}`)
            .setThumbnail(message.guild.splashURL)
            .setDescription(`Esta es la información de ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL)
            .addField(`**Dueño(a)**`,`<@${message.guild.ownerID}>`)
            .addField(`**ID del servidor**`,`${message.guild.id}`)
            .addField(`**Region**`,`${message.guild.region}`)
            .addField(`**Creado**`,`${message.guild.createdAt.getDay()}/${message.guild.createdAt.getMonth()+1}/${message.guild.createdAt.getFullYear()}`)
            .addField(`**Usuarios**`,`**Activos:** ${online} | **Ausentes:** ${idle} | **No Molestar:** ${dnd} | **Desconectados:** ${offline} \n**Humanos:** ${humans} | **Bots:** ${bots} \n**Total:** ${message.guild.memberCount}`)
            .addField(`**Canal AFK**`,`${afkch}`)
            .addField(`**Tiempo hasta estar AFK**`,`${message.guild.afkTimeout/60} Minutos`)
            .addField(`**Canales**`,`**Texto:** ${message.guild.channels.map(c => c.type).filter(c => c.search("voice")).filter(c => c.search("category")).length} | **Voz:** ${message.guild.channels.map(c => c.type).filter(c => c.search("text")).filter(c => c.search("category")).length} | **Categorias:** ${message.guild.channels.map(c => c.type).filter(c => c.search("voice")).filter(c => c.search("text")).length} | **Total:** ${message.guild.channels.map(c => c.type).filter(c => c.search("category")).length} `)
            .addField(`**Roles**`,`${message.guild.roles.map(r => r.name).length}`)
            .addField(`**Emotes**`,`Se muestran debajo debido a limitaciones tecnicas`)
            .setColor(bot.color);
            // console.log(message.guild.emojis)
            // console.log(message.guild.members.map(p => p.presence.status).filter(f => f.search("offline")).filter(f => f.search("dnd")).filter(f => f.search("idle")).length)
            // console.log(message.guild.channels.map(c => c.type))
            // .addField(`**Canal predeterminado:**`,`<#${message.guild.defaultChannel}>`)
        message.channel.send(embed)
        message.channel.send(message.guild.emojis.map(e=>e.toString()).join(" "))
        // console.log(message.guild.emojis.map(e=>e.toString()))
        }
        else{
            // console.log(!message.guild.afkChannel)
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name}`)
        .setThumbnail(message.guild.splashURL)
        .setDescription(`Esta es la información de ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL)
        .addField(`**Dueño(a)**`,`<@${message.guild.ownerID}>`)
        .addField(`**ID del servidor**`,`${message.guild.id}`)
        .addField(`**Region**`,`${message.guild.region}`)
        .addField(`**Creado**`,`${message.guild.createdAt.getDay()}/${message.guild.createdAt.getMonth()+1}/${message.guild.createdAt.getFullYear()}`)
        .addField(`**Usuarios**`,`**Activos:** ${online} | **Ausentes:** ${idle} | **No Molestar:** ${dnd} | **Desconectados:** ${offline} \n**Humanos:** ${humans} | **Bots:** ${bots} \n**Total:** ${message.guild.memberCount}`)
        .addField(`**Canal AFK**`,`${afkch}`)
        .addField(`**Tiempo hasta estar AFK**`,`${message.guild.afkTimeout/60} Minutos`)
        .addField(`**Canales**`,`**Texto:** ${message.guild.channels.map(c => c.type).filter(c => c.search("voice")).filter(c => c.search("category")).length} | **Voz:** ${message.guild.channels.map(c => c.type).filter(c => c.search("text")).filter(c => c.search("category")).length} | **Categorias:** ${message.guild.channels.map(c => c.type).filter(c => c.search("voice")).filter(c => c.search("text")).length} | **Total:** ${message.guild.channels.map(c => c.type).filter(c => c.search("category")).length} `)
        .addField(`**Roles**`,`${message.guild.roles.map(r => r.name).length}`)
        .addField(`**Emotes**`,`Al parecer no hay emotes en este servidor`)
        .setColor(bot.color);
        // console.log(message.guild.emojis)
        // console.log(message.guild.members.map(p => p.presence.status).filter(f => f.search("offline")).filter(f => f.search("dnd")).filter(f => f.search("idle")).length)
        // console.log(message.guild.channels.map(c => c.type))
        // .addField(`**Canal predeterminado:**`,`<#${message.guild.defaultChannel}>`)
        message.channel.send(embed).catch(err => {});
        }
}

module.exports.data = {
    module: "utility",
    name: "server"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}