const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
  var meme;
  var avatarurlmod;
  var randomeme;
    message.delete().catch(err => console.log(err))
    if(message.author.avatarURL.includes("gif")){
        avatarurlmod = message.author.avatarURL.replace("gif","png")
    }
    else{
        avatarurlmod = message.author.avatarURL
    }
    if(message.content.split(" ")[1]){
        if(Number.isInteger(Number(message.content.split(" ")[1]))){
            if(Number(message.content.split(" ")[1]) > 0 && Number(message.content.split(" ")[1]) < 17){
                randomeme = Number(message.content.split(" ")[1])
            }
            else{
                message.reply(transsv.dmeme.only)
            }
        }
        else{
            message.reply(transsv.dmeme.only)
        }
    }
    else{
        randomeme = Math.floor(Math.random() * (16 - 1 +1)) + 1;
    }
    switch(randomeme){
        case 1:
            meme = "https://i.imgur.com/ruLlqMx.jpg";
        break;
        case 2:
            meme = "https://i.imgur.com/ruLlqMx.jpg";
        break;
        case 3:
            meme = "https://i.imgur.com/MI61bSj.jpg";
        break;
        case 4:
            meme = "https://i.imgur.com/yeLbksS.png";
        break;
        case 5:
            meme = "https://i.imgur.com/pzLiTAH.jpg";
        break;
        case 6:
            meme = "https://i.imgur.com/Diagt8X.jpg";
        break;
        case 7:
            meme = "https://i.imgur.com/WJy6T2B.jpg";
        break;
        case 8:
            meme = "https://i.imgur.com/OwmhN6x.jpg";
        break;
        case 9:
            meme = "https://i.imgur.com/Jj1mGsF.jpg";
        break;
        case 10:
            meme = "https://i.imgur.com/PB3XVA2.jpg";
        break;
        case 11:
            meme = "https://i.imgur.com/Ej6pitX.jpg";
        break;
        case 12:
            meme = "https://i.imgur.com/2eB9FtY.jpg";
        break;
        case 13:
            meme = "https://i.imgur.com/YdgNXzj.png";
        break;
        case 14:
            meme = "https://i.imgur.com/DHNAUV2.jpg";
        break;
        case 15:
            meme = "https://i.imgur.com/5j5zkcv.png";
        break;
        case 16:
            meme = "https://i.imgur.com/9fmgZ3L.png";
        break;
    }
    let embed = new Discord.RichEmbed()
            .setAuthor(message.member.displayName,avatarurlmod)
            .setImage(meme)
            .setColor(0xff0000);    
        message.channel.send(embed).catch( err => { } );
        return;
}

module.exports.data = {
    module: "other",
    name: "dmeme"
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
        .setTitle(transsv.dmeme.help.title)
        .setDescription(transsv.dmeme.help.description)
        .addField(transsv.use,"```"+ transsv.dmeme.help.use +"```")
        .setFooter(transsv.helpfooter,avatarurlmod)
        .setColor(bot.color);
    message.channel.send(embed).catch( err => { } );
}