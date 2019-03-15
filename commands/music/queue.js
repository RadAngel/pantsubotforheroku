const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    async function addrows (acnum,embedtoadd,rows,message) {
        var actual = acnum;
        var limitac = actual+5;
        // console.log(rows.length)
        for(var i=actual;i<limitac; i++){
            if(rows[i]){
                embedtoadd.addField(`${i+1}.-${rows[i].songname}`,`Solicitado por <@${rows[i].requesterid}>`)
            }
            else{
                break;
            }
        }
    }
    async function awaitreact (basenum,pagnum,rows,message,m){
        const filter = (reaction, user) => (reaction.emoji.name === "⏮" || reaction.emoji.name === "⬅" || reaction.emoji.name === "➡" || reaction.emoji.name === "⏭") && user.id === message.author.id
        m.awaitReactions(filter, {max:1,time:30000,errors:['time']})
            .then(coll => {
                // console.log(coll)
                // coll.map(r => r.remove(message.author.id));
                // console.log(coll.map(r => r._emoji.name)[0])
                // console.log(m.embeds[0].description)
                switch (coll.map(r => r._emoji.name)[0]){
                    case "⏮":
                        if(basenum == 0){
                            coll.map(r => r.remove(message.author.id));
                            awaitreact(basenum,pagnum,rows,message,m);
                        }
                        else{
                            coll.map(r => r.remove(message.author.id));
                            let embed = new Discord.RichEmbed()
                                .setDescription(m.embeds[0].description)
                                .setColor(bot.color)
                                .setFooter(`Pagina 1 de ${Math.ceil(rows.length/5)} | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
                            addrows(0,embed,rows,message)
                            m.edit(embed)
                            awaitreact(0,1,rows,message,m);
                        }
                    break;
                    case "⬅":
                        if(basenum == 0){
                            coll.map(r => r.remove(message.author.id));
                            awaitreact(basenum,pagnum,rows,message,m);
                        }
                        else{
                            coll.map(r => r.remove(message.author.id));
                            let embed = new Discord.RichEmbed()
                                .setDescription(m.embeds[0].description)
                                .setColor(bot.color)
                                .setFooter(`Pagina ${pagnum-1} de ${Math.ceil(rows.length/5)} | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
                            addrows(basenum-5,embed,rows,message)
                            m.edit(embed)
                            awaitreact(basenum-5,pagnum-1,rows,message,m);
                        }
                    break;
                    case "➡":
                        if(basenum + 5 > rows.length){
                            coll.map(r => r.remove(message.author.id));
                            awaitreact(basenum,pagnum,rows,message,m);
                        }
                        else{
                            coll.map(r => r.remove(message.author.id));
                            let embed = new Discord.RichEmbed()
                                .setDescription(m.embeds[0].description)
                                .setColor(bot.color)
                                .setFooter(`Pagina ${pagnum+1} de ${Math.ceil(rows.length/5)} | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
                            addrows(basenum+5,embed,rows,message)
                            m.edit(embed)
                            awaitreact(basenum+5,pagnum+1,rows,message,m);
                        }
                    break;
                    case "⏭":
                        if(basenum + 5 > rows.length){
                            coll.map(r => r.remove(message.author.id));
                            awaitreact(basenum,pagnum,rows,message,m);
                        }
                        else{
                            coll.map(r => r.remove(message.author.id));
                            let embed = new Discord.RichEmbed()
                                .setDescription(m.embeds[0].description)
                                .setColor(bot.color)
                                .setFooter(`Pagina ${Math.ceil(rows.length/5)} de ${Math.ceil(rows.length/5)} | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
                            addrows(Math.floor(rows.length/5)*5,embed,rows,message)
                            m.edit(embed)
                            awaitreact(Math.floor(rows.length/5)*5,Math.floor(rows.length/5),rows,message,m);
                        }
                    break;
                }
            })
            .catch(err => {
                console.log(err);
                m.clearReactions()
            })
    }
    const table = db.prepare(`SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'musicqueue_${message.guild.id}';`).get();
    // console.log(table)
    if(table['count(*)']){
        let rows = db.prepare(`SELECT rowid, * FROM 'musicqueue_${message.guild.id}';`).all()
        // console.log(rows)
        let embed = new Discord.RichEmbed()
            .setDescription(`Lista de ${message.guild.name}\n`)
            .setColor(bot.color)    
        if(rows.length < 5){
            embed.setFooter(`Pagina 1 de 1 | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
        }
        else{
            embed.setFooter(`Pagina 1 de ${Math.ceil(rows.length/5)} | Solicitado por ${message.member.displayName}`,message.author.avatarURL);
        }
        addrows(0,embed,rows,message);
        if(rows.length > 5){
            message.channel.send(embed)
            .then(m => {
                m.react("⏮")
                    .then(setTimeout(e1 => {m.react("⬅")
                        .then(setTimeout(e2 => {m.react("➡")
                            .then(setTimeout(e3 => {m.react("⏭")
                                .then(
                                    awaitreact(0,1,rows,message,m)
                                )
                        },500))},500))},500))
            })
            .catch(err => {})
        }
        else{
            message.channel.send(embed)
        }
    }
    else{
        let embed = new Discord.RichEmbed()
            .setDescription(`Al parecer no hay una lista de reproducción en este servidor`)
            .setColor(bot.color)   
        message.channel.send(embed)
    }
}

module.exports.data = {
    module: "music",
    name: "queue"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.leave.help.title)
        .setDescription(transsv.leave.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}