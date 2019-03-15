const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
     message.channel.send("https://img-9gag-fun.9cache.com/photo/aOrE37D_460svwm.webm")
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "satisfaction"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    var colors = [0x00ff1d,0xffffff,0xe900ff]
    var actcolor = 0
    var end = 1
    let embed = new Discord.RichEmbed()
        .setDescription("Push me\nand then just touch me\ntill i can get my\n*SATISFACTION*\nPush me\nand then just touch me\ntill i can get my\n*SATISFACTION*\n*SATISFACTION*\n*SATISFACTION*\n*SATISFACTION*\n**ACID BASS INTENSIFIES**")
        .setColor(bot.color)
    message.channel.send(embed)
        .then(m => {
            var i = setInterval(e => {
                if(actcolor == 3){
                    actcolor = 0
                }
                if(end == 18){
                    clearInterval(i)
                }
                let embed = new Discord.RichEmbed()
                    .setDescription("Push me\nand then just touch me\ntill i can get my\nSATISFACTION\nPush me\nand then just touch me\ntill i can get my\nSATISFACTION\nSATISFACTION\nSATISFACTION\nSATISFACTION\n**ACID BASS INTENSIFIES**")
                    .setColor(colors[actcolor])
                m.edit(embed)
                .catch(err=>console.log(err))
                actcolor = actcolor + 1
                end = end + 1
            },1000*1.5)
        })
}