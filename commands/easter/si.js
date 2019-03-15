const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    if(message.content.split(" ")[1] == `señor`){
        var randomvid = Math.floor(Math.random() * (2 - 1 +1)) + 1;
      var vid;
        switch(randomvid){
            case 1:
                vid = 'https://img-9gag-fun.9cache.com/photo/aq7YgoZ_460svvp9.webm'
            break;
            case 2:
                vid = 'https://img-9gag-fun.9cache.com/photo/awXYMVQ_460sv.mp4'
            break;
        }
        message.channel.send(vid)
    }
}

module.exports.data = {
    module:"easter",
    hidemodule:1,
    name: "si"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}