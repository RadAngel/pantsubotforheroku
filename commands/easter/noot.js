const Discord = require('discord.js');
const ytdl = require('ytdl-core');
module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["noot"]) {
        bot.easterscontrollers["noot"] = {};
    }
    if (!message.member.voiceChannel) {
        message.channel.send("Tienes que estan en un canal de voz")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete().catch();
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
                    m.delete().catch();
                }, 1000 * 10);
            })
        return;
    }
    if (!message.member.voiceChannel.permissionsFor(bot.user).has("SPEAK")) {
        message.channel.send("No puedo hablar en ese canal de voz")
            .then(m => {
                var autodelete = setTimeout(function () {
                    message.delete().catch();
                    m.delete().catch();
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
                    m.delete().catch();
                }, 1000 * 10);
            })
        return;
    }
  var checkdoot;
    if(bot.easterscontrollers.doot){
        if(bot.easterscontrollers.doot["guild"+message.guild.id]){
            checkdoot = true
        }
        else {
            checkdoot = false
        }
    }
    else {
        checkdoot = false
    }
    if(bot.easterscontrollers.noot["guild"+message.guild.id] || checkdoot){
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
        bot.easterscontrollers.noot["guild"+message.guild.id] = 1;
    }
    // console.log(message.guild.voiceConnection)
    if(message.guild.voiceConnection != null){
        // console.log(message.guild.voiceConnection.speaking)
        if (message.guild.voiceConnection.speaking){
            message.reply("ahora mismo estoy ocupado")
                .then(m => {
                    var autodelete = setTimeout(function () {
                        message.delete().catch();
                        m.delete().catch();
                    }, 1000 * 10);
                })
            return;
        }
        const connection = message.guild.voiceConnection;
        const dispatcher = connection.playStream(ytdl("https://www.youtube.com/watch?v=MFw3E6X5aoA"), {filter:"audioonly"});
        let embed = new Discord.RichEmbed()
            .setTitle("Noot Noot")
            .setImage("https://assets.change.org/photos/1/lh/jv/czLHJvpcQHFecEV-800x450-noPad.jpg")
            .setColor("#f23535");
        message.channel.send(embed)
        message.delete().catch();
        dispatcher.on("end", end => {
            delete bot.easterscontrollers.noot["guild"+message.guild.id]
            message.guild.fetchMember(bot.user).then(v => {
                    if (message.guild.voiceConnection) v.voiceChannel.leave()
            })
        })
    }
    else{
        message.member.voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playStream(ytdl("https://www.youtube.com/watch?v=MFw3E6X5aoA"), {filter:"audioonly"});
                let embed = new Discord.RichEmbed()
                    .setTitle("Noot Noot")
                    .setImage("https://assets.change.org/photos/1/lh/jv/czLHJvpcQHFecEV-800x450-noPad.jpg")
                    .setColor("#f23535");
                message.channel.send(embed)
                message.delete().catch();
                dispatcher.on("end", end => {
                    delete bot.easterscontrollers.noot["guild"+message.guild.id]
                    message.guild.fetchMember(bot.user).then(v => {
                            if (message.guild.voiceConnection) v.voiceChannel.leave()
                    })
                });
            })
            .catch()
    }
}

module.exports.data = {
    module: "easter",
    hidemodule: 1,
    name: "noot"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}