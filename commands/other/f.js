const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    message.delete()
        .catch(err => {console.log(`Error al borrar mensaje del comando -f en ${message.guild.name} por: ${err}`.yellow)});
    var randomhearth = Math.floor(Math.random() * (5 - 1 +1)) + 1;
    var heart;
    switch(randomhearth){
        case 1:
            heart = ":heart:";
        break;
        case 2:
            heart = ":blue_heart:";
        break;
        case 3:
            heart = ":green_heart:";
        break;
        case 4:
            heart = ":purple_heart:";
        break;
        case 5:
            heart = ":yellow_heart:";
        break;
    }
    if(message.content.split(" ").slice(1) == ""){
        message.channel.send(`**${message.guild.members.get(message.author.id).displayName}**` + ` ${transsv.f.withouttext} ` + `${heart}`);
    }
    else{
        message.channel.send(`**${message.guild.members.get(message.author.id).displayName}**` + ` ${transsv.f.withtext} ` + `**${message.content.split(" ").slice(1).join(" ")}** ${heart}`);
    }
}

module.exports.data = {
    module: "other",
    name: "f"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.f.help.title)
        .setDescription(transsv.f.help.description)
        .addField(transsv.use,"```"+transsv.f.help.use+"```",true)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed).catch( err => { } );
}