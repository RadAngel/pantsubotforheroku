const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    var presences = ["online","idle","invisible","dnd"]
    var activitytype = ["PLAYING","STREAMING","LISTENING","WATCHING"]
    if(message.author.id === bot.ownerid){
        if(message.content.split(" ")[1]){
            for(var i=0;i<presences.length;i++){
                if(message.content.split(" ")[1].toLowerCase() == presences[i]){
                    if(message.content.split(" ")[2]){
                        bot.user.setPresence({game:{name: message.content.split(" ").slice(2).join(" "),type:"PLAYING"},status: message.content.toLowerCase().split(" ")[1]})
                        return;
                    }
                    else{
                        bot.user.setStatus(presences[i])
                        return;
                    }
                }
            }
            for(i=0;i<activitytype.length;i++){
                if(message.content.split(" ")[1].toUpperCase() == activitytype[i]){
                    if(message.content.split(" ")[2]){
                        switch(i){
                            case 0:
                                return bot.user.setPresence({game:{name: message.content.split(" ").slice(3).join(" "),type:activitytype[i]}})
                            break;
                            case 1:
                                if(message.content.split(" ")[2].includes("https://www.twitch.tv")){
                                    return bot.user.setPresence({game:{name: message.content.split(" ").slice(3).join(" "),url:message.content.split(" ")[2],type:activitytype[i]}})
                                }
                                else{
                                    return message.reply("Esta URL no es de Twitch")
                                }
                            break;
                            case 2:
                                return bot.user.setPresence({game:{name: message.content.split(" ").slice(2).join(" "),type:activitytype[i]}})
                            break;
                            case 3:
                                return bot.user.setPresence({game:{name: message.content.split(" ").slice(2).join(" "),type:activitytype[i]}})
                            break;
                        }
                    }
                    else{
                        return message.reply("Faltan parametros")
                    } 
                }
            }
            if(message.content.toLowerCase().split(" ")[1] === "reset"){
                bot.user.setPresence({game:{name:'Darle pantsus a todos (en beta) | -help'},status: 'online'})
                return;
            }
            if(message.content.toLowerCase().split(" ")[1] === "nogame"){
                bot.user.setActivity(null)
            }
            else{
                bot.user.setPresence({game:{name: message.content.split(" ").slice(1).join(" "),type:"PLAYING"}})
                return;
            }
        }
        else{
            bot.commands.get("setpresence").help(bot,message,transsv,nickcmds,db)
        }
    }
    else{
        message.channel.send(transsv.onlyowner)
            .then(m => {setTimeout(m.delete(),1000*5)})
    }
}

module.exports.data = {
    module: "botowner",
    name: "setpresence"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    try{
    var botowner = bot.users.get(bot.ownerid)
    let embed = new Discord.RichEmbed()
        .setTitle("Comando setpresence")
        .setDescription("Este comando permite cambiar la presencia del bot. " + transsv.onlyowner)
        .addField("Solo cambiar estado","```"+"\n-setpresence (online/idle/dnd/invisible)"+"```")
        .addField("Solo cambiar juego","```"+"\n-setpresence (texto de juego)"+"```")
        .addField("Reiniciar presencia","```"+"\n-setpresence reset"+"```")
        .addField("Quitar juego","```"+"\n-setpresence nogame"+"```")
        .addField("Cambiar estado y juego","```"+"\n-setpresence (online/idle/dnd/invisible) (Texto de juego)"+"```")
        .addField("Cambiar Actividad","```"+"\n-setpresence (PLAYING/LISTENING/WATCHING) (texto de actividad)"+"```")
        .addField("Cambiar Actividad Stream","```"+"\n-setpresence (STREAMING) (URL de Twitch) (texto de actividad)"+"```")
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color)
    message.channel.send(embed)
    }
    catch(err){console.log(err)}
}