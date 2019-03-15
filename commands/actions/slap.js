const Discord = require('discord.js');
const nekoslife = require("nekos.life");
const neko = new nekoslife();

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.delete()
        .catch(err => {
            console.log(err)
        });
    var nekoimg = await neko.sfw.slap()
    if(!message.content.split(" ")[1]){
        let embed = new Discord.RichEmbed()
            .setDescription(`${transsv.slap.iduno1} <@${message.author.id}>, ${transsv.slap.iduno2}`)
            .setImage(nekoimg.url)
            .setColor(bot.color);
        message.channel.send(embed);
    }
    else{
        if(message.mentions.users.first()){
            if(message.author.id != message.mentions.users.first().id){
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.slap.slapedto} <@${message.mentions.users.first().id}>`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
            else{
                let embed = new Discord.RichEmbed()
                    .setDescription(`${transsv.slap.automen} <@${message.author.id}>`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
        else{
            if(Number.isInteger(Number(message.content.split(" ")[1])) && message.content.split(" ")[1].length == 18){
                if(message.content.split(" ")[1] != message.author.id){
                    bot.fetchUser(message.content.split(" ")[1])
                        .then(u => {
                            let embed = new Discord.RichEmbed()
                                .setDescription(`<@${message.author.id}> ${transsv.slap.slapedto} <@${u.id}>`)
                                .setImage(nekoimg.url)
                                .setColor(bot.color);
                            message.channel.send(embed);
                        })
                        .catch(e => {
                            console.log("Usuario no encontrado")
                           let embed = new Discord.RichEmbed()
                                .setDescription(transsv.nani)
                                .setColor(bot.color);
                            message.channel.send(embed)
                        })
                }
                else{
                    let embed = new Discord.RichEmbed()
                            .setDescription(`${transsv.slap.autoid} <@${message.author.id}>`)
                            .setImage(nekoimg.url)
                            .setColor(bot.color);
                        message.channel.send(embed);
                }
            }
            else{
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.slap.slap} **${message.content.split(" ").slice(1).join(" ")}**`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
    }
}

module.exports.data = {
    module:"actions",
    name: "slap"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    var avatarurlmod;
    if(message.author.avatarURL.includes("gif")){
        avatarurlmod = message.author.avatarURL.replace("gif","png")
    }
    else{
        avatarurlmod = message.author.avatarURL
    }
    let embed = new Discord.RichEmbed ()
        .setTitle(transsv.slap.help.title)
        .setDescription(transsv.slap.help.description)
        .addField(transsv.use,"```"+ transsv.slap.help.use +"```")
        .setFooter(transsv.helpfooter,avatarurlmod)
        .setColor(bot.color);
    message.channel.send(embed)
}