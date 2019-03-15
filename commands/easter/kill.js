const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(message.content.split("")[0] == "/"){
        if(!message.content.split(" ")[1]){
            let embed = new Discord.RichEmbed()
                .setDescription(`**${message.member.displayName}** se ha suicidado`)
                .setImage('https://bugs.mojang.com/secure/attachment/12953/2012-11-12_00.10.37.png')
                .setColor(0xff0000);
            message.channel.send(embed);
            return;
        }
        if(message.content.split(" ")[1] === "@a"){
            let embed = new Discord.RichEmbed()
                .setDescription(`**${message.member.displayName}** ha matado a todos en el servidor`)
                .setImage('https://bugs.mojang.com/secure/attachment/12953/2012-11-12_00.10.37.png')
                .setColor(0xff0000);
            message.channel.send(embed);
            return;
        }
        if(message.mentions.users.first()){
            let embed = new Discord.RichEmbed()
                .setDescription(`**${message.member.displayName}** ha matado a **${message.mentions.members.first().displayName}**`)
                .setImage('https://bugs.mojang.com/secure/attachment/12953/2012-11-12_00.10.37.png')
                .setColor(0xff0000);
            message.channel.send(embed); 
            return;
        }
        if(Number.isInteger(Number(message.content.split(" ")[1])) && message.content.split(" ")[1].length === 18){
            message.guild.fetchMember(message.content.split(" ")[1], )
            .then(m => {
                let embed = new Discord.RichEmbed()
                    .setDescription(`**${message.member.displayName}** ha matado a **${m.displayName}**`)
                    .setImage('https://bugs.mojang.com/secure/attachment/12953/2012-11-12_00.10.37.png')
                    .setColor(0xff0000);
                message.channel.send(embed); 
                return;
            })
            .catch(err => {
                console.log(`${err}`.red)
                message.reply("no he podido encontrar al miembro")
            })
        }
        if(message.content.split(" ").slice(1) && !message.mentions.users.first() && !Number.isInteger(Number(message.content.split(" ")[1]) && message.content.split(" ")[1] !== "@a")){
            let embed = new Discord.RichEmbed()
                .setDescription(`**${message.member.displayName}** ha matado a **${message.content.split(" ").slice(1).join(" ")}**`)
                .setImage('https://bugs.mojang.com/secure/attachment/12953/2012-11-12_00.10.37.png')
                .setColor(0xff0000);
            message.channel.send(embed); 
            return;
        }
    }
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "kill"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed ()
        .setTitle(transsv.kill.help.title)
        .setDescription(transsv.kill.help.description)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}