const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const soundsurls = ["https://www.youtube.com/watch?v=WTWyosdkx44","https://www.youtube.com/watch?v=KDdN4Gb2lBw"];
const images = ["https://www.beamng.com/data/avatars/l/214/214606.jpg?1501678887","http://i3.ytimg.com/vi/KDdN4Gb2lBw/maxresdefault.jpg"];
module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["doot"]) {
        bot.easterscontrollers["doot"] = {};
    }
    if (!message.member.voiceChannel) {
        message.channel.send("Tienes que estan en un canal de voz")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete()
                        .catch();
                }, 1000 * 10);
            })
        return;
    }
    // voicec = message.member.voiceChannel
    // console.log(message.member.voiceChannel)
    // console.log(voicec.permissionsFor(bot.user).has)
    // console.log(message.guild.fetchMember(bot.user))

    if (!message.member.voiceChannel.permissionsFor(bot.user).has("CONNECT")) {
        message.channel.send("No puedo conectarme a ese canal de voz")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete()
                        .catch();
                }, 1000 * 10);
            })
        return;
    }
    if (!message.member.voiceChannel.permissionsFor(bot.user).has("SPEAK")) {
        message.channel.send("No puedo hablar en ese canal de voz")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete()
                        .catch();
                }, 1000 * 10);
            })
        return;
    }
    // console.log(message.guild.member(bot.user))
    // console.log(message.guild.member(bot.user).serverMute)
    if(message.guild.member(bot.user).serverMute){
        message.channel.send("Estoy silenciado en el servidor")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete()
                        .catch();
                }, 1000 * 10);
            })
        return;
    }
  var checknoot
    if(bot.easterscontrollers.noot){
        if(bot.easterscontrollers.noot["guild"+message.guild.id]){
            checknoot = true
        }
        else {
            checknoot = false
        }
    }
    else {
        checknoot = false
    }
    if(bot.easterscontrollers.doot["guild"+message.guild.id] || checknoot){
        message.reply("calmate por un momento")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete().catch();
                }, 1000 * 10);
            })
        return;
    }
    else {
        bot.easterscontrollers.doot["guild"+message.guild.id] = 1;
    }
    // console.log(soundsurls.length)
    var randomnumb = Math.floor(Math.random() * (soundsurls.length - 1 +1)) + 1 - 1;
    // console.log(randomnumb)
    var soundurl = soundsurls[randomnumb];
    var img = images[randomnumb];
    // console.log(message.guild.voiceConnection)
    if(message.guild.voiceConnection != null){
        // console.log(message.guild.voiceConnection.speaking)
        if (message.guild.voiceConnection.speaking){
            message.reply("ahora mismo estoy ocupado")
                .then(m => {
                    var autodelete = setTimeout(function () {
                        message.delete().catch();
                        m.delete()
                            .catch();
                    }, 1000 * 10);
                })
            return;
        }
        const connection = message.guild.voiceConnection;
        const dispatcher = connection.playStream(ytdl(soundurl), {filter:"audioonly"});
        let embed = new Discord.RichEmbed()
            .setTitle("DOOT")
            .setImage(img)
            .setColor("#c4a81d")
            .setFooter("Thank mr skeltal", "https://ih0.redbubble.net/image.234849454.2211/flat,800x800,070,f.jpg");
        message.channel.send(embed).catch()
        message.delete().catch();
        dispatcher.on("end", end => {
            delete bot.easterscontrollers.doot["guild"+message.guild.id]
            message.guild.fetchMember(bot.user).then(v => {
                setTimeout(function () {
                    if (message.guild.voiceConnection) v.voiceChannel.leave()
                }, 500)
            })
        })
    }
    else{
        message.member.voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playStream(ytdl(soundurl), {filter:"audioonly"});
                let embed = new Discord.RichEmbed()
                    .setTitle("DOOT")
                    .setImage(img)
                    .setColor("#c4a81d")
                    .setFooter("Thank mr skeltal", "https://ih0.redbubble.net/image.234849454.2211/flat,800x800,070,f.jpg");;
                message.channel.send(embed).catch()
                message.delete().catch();
                dispatcher.on("end", end => {
                    delete bot.easterscontrollers.doot["guild"+message.guild.id]
                    message.guild.fetchMember(bot.user).then(v => {
                        setTimeout(function () {
                            if (message.guild.voiceConnection) v.voiceChannel.leave()
                        }, 500)
                    })
                });
            })
            .catch()
    }
}

module.exports.data = {
    module: "easter",
    hidemodule: 1,
    name: "doot"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}