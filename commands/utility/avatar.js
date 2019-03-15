const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
  var avatarurlmod;
    if(message.author.avatarURL.includes("gif")){
        avatarurlmod = message.author.avatarURL.replace("gif","png")
    }
    else{
        avatarurlmod = message.author.avatarURL
    }
    if(message.content.split(" ")[1] == null){
        var avatar = message.author.avatarURL
        if(message.author.avatarURL.includes("gif")){
            avatar = avatar+"?size=1024&_=.gif"
        }
        let embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName,avatarurlmod)
            .setDescription(`Aqui esta tu avatar <@${message.author.id}>`)
            .setImage(avatar)
            .setColor(bot.color);
        message.channel.send(embed);
    }
    else{
        if(message.mentions.users.first() != null){
            if(message.author.id != message.mentions.users.first().id){
                avatar = message.mentions.users.first().avatarURL
                if(message.mentions.users.first().avatarURL.includes("gif")){
                    avatar = avatar+"?size=1024&_=.gif"
                }
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.member.displayName,avatarurlmod)
                    .setDescription(`Avatar de <@${message.mentions.users.first().id}> ${message.mentions.users.first().username}#${message.mentions.users.first().discriminator}`)
                    .setImage(avatar)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
            else{
                avatar = message.author.avatarURL
                if(message.author.avatarURL.includes("gif")){
                    avatar = avatar+"?size=1024&_=.gif"
                }
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.member.displayName,avatarurlmod)
                    .setDescription(`Aqui esta tu avatar <@${message.author.id}>`)
                    .setImage(avatar)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
        else{
            if(message.content.split(" ")[1] != message.author.id){
                bot.fetchUser(message.content.split(" ")[1])
                    .then(u => {
                        avatar = u.avatarURL
                        if((u.avatarURL.includes("gif"))){
                            avatar = avatar+"?size=1024&_=.gif"
                        }
                        let embed = new Discord.RichEmbed()
                            .setAuthor(message.member.displayName,avatarurlmod)
                            .setDescription(`Avatar de <@${u.id}> ${u.username}#${u.discriminator}`)
                            .setImage(avatar)
                            .setColor(bot.color);
                        message.channel.send(embed);
                    })
                    .catch(e => {
                        let embed = new Discord.RichEmbed()
                            .setAuthor(message.member.displayName,avatarurlmod)
                            .setDescription(`No he podido encontrar al usuario con id ${message.content.split(" ")[1]}`)
                            .setColor(bot.color);
                        message.channel.send(embed)
                    })
            }
            else{
                avatar = message.author.avatarURL
                if(message.author.avatarURL.includes("gif")){
                    avatar = avatar+"?size=1024&_=.gif"
                }
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.member.displayName,avatarurlmod)
                    .setDescription(`Aqui esta tu avatar <@${message.author.id}>`)
                    .setImage(avatar)
                    .setColor(bot.color);
                message.channel.send(embed);
            }
        }
    }
}

module.exports.data = {
    module: "utility",
    name: "avatar"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}