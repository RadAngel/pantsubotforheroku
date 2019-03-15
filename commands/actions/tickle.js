const Discord = require('discord.js');
const nekoslife = require("nekos.life");
const neko = new nekoslife();

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.delete()
        .catch(err => {
            console.log(err)
        });
    var nekoimg = await neko.sfw.tickle()
    if(!message.content.split(" ")[1]){
        let embed = new Discord.RichEmbed()
            .setDescription(`${transsv.tickle.tickleyou} <@${message.author.id}>`)
            .setImage(nekoimg.url)
            .setColor(bot.color);
        message.channel.send(embed);
    }
    else{
        if(message.mentions.users.first()){
            if(message.author.id != message.mentions.users.first().id){
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.tickle.tickleedto} <@${message.mentions.users.first().id}>`)
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
                                .setDescription(`<@${message.author.id}> ${transsv.tickle.tickleedto} <@${u.id}>`)
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
                            .setDescription(`${transsv.tickle.autoid} <@${message.author.id}>`)
                            .setImage(nekoimg.url)
                            .setColor(bot.color);
                        message.channel.send(embed);
                }
            }
            else{
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.tickle.tickle} **${message.content.split(" ").slice(1).join(" ")}**`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
    }
}

module.exports.data = {
    module:"actions",
    name: "tickle"
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
        .setTitle(transsv.tickle.help.title)
        .setDescription(transsv.slap.help.description)
        .addField(transsv.use,"```"+ transsv.tickle.help.use +"```")
        .setFooter(transsv.helpfooter,message.avatarurlmod)
        .setColor(bot.color);
    message.channel.send(embed)
}