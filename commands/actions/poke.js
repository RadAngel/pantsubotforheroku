const Discord = require('discord.js');
const nekoslife = require("nekos.life");
const neko = new nekoslife();

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.delete()
        .catch(err => {
            console.log(err)
        });
    var nekoimg = await neko.sfw.poke()
    if(!message.content.split(" ")[1]){
        let embed = new Discord.RichEmbed()
            .setDescription(`${transsv.poke.pokeyou} <@${message.author.id}>`)
            .setImage(nekoimg.url)
            .setColor(bot.color);
        message.channel.send(embed);
    }
    else{
        if(message.mentions.users.first()){
            if(message.author.id != message.mentions.users.first().id){
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.poke.pokedto} <@${message.mentions.users.first().id}>`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
            else{
                let embed = new Discord.RichEmbed()
                    .setDescription(`${transsv.poke.automen} <@${message.author.id}>`)
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
                                .setDescription(`<@${message.author.id}> ${transsv.poke.pokeedto} <@${u.id}>`)
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
                            .setDescription(`${transsv.poke.autoid} <@${message.author.id}>`)
                            .setImage(nekoimg.url)
                            .setColor(bot.color);
                        message.channel.send(embed);
                }
            }
            else{
                let embed = new Discord.RichEmbed()
                    .setDescription(`<@${message.author.id}> ${transsv.poke.pokeyou} **${message.content.split(" ").slice(1).join(" ")}**`)
                    .setImage(nekoimg.url)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
    }
}

module.exports.data = {
    module:"actions",
    name: "poke"
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
        .setTitle(transsv.poke.help.title)
        .setDescription(transsv.slap.help.description)
        .addField(transsv.use,"```"+ transsv.poke.help.use +"```")
        .setFooter(transsv.helpfooter,message.avatarurlmod)
        .setColor(bot.color);
    message.channel.send(embed)
}