const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var authorid = message.author.id;
    var numbarr = [];
    var temptime = 0;
    if (message.content.split(" ")[1] == "cancel") {
        if (bot.timers["user" + authorid]) {
            clearTimeout(bot.timers["user" + authorid])
            delete bot.timers["user" + authorid];
            message.reply("Se ha cancelado tu temporizador")
        }
        else {
            return message.reply("No tienes ningun temporizador")
        }

    }
    else {
        if (bot.timers["user" + authorid]) {
            return message.reply("No puedes tener 2 timers a la vez, necesitas pagar en pa... espera, todavia no tengo patreon")
        }
        else {
            if (!message.content.split(" ")[1]) {
                return message.reply("Parece que no has definido en cuanto tiempo quieres que te avise, usa **" + bot.prefix + "help timer** para ver como usar el comando")
            }
            else {
                numbarr = message.content.split(" ")[1].split(":")
                if (numbarr.length >= 4) {
                    return message.reply("has definido un numero de mas, no puedes poner un temporizador de un dia, intenta poner solo 3 numeros y que el tiempo total no supere un dia")
                }
                else {
                    if (Number.isInteger(Number(numbarr[numbarr.length - 1]))) {
                        var toreply = [];
                        var segsfix;
                        var minstoadd;
                        var minsfix;
                        var hourstoadd;
                        if (Number(numbarr[numbarr.length - 1]) >= 60) {
                            toreply.push("mas de 60 segundos")
                            segsfix = Math.floor(Number(numbarr[numbarr.length - 1]) % 60)
                            minstoadd = Math.floor(Number(numbarr[numbarr.length - 1]) / 60)
                            console.log(minstoadd)
                            temptime = segsfix * 1000
                        }
                        else {
                            minstoadd = 0;
                            temptime = Number(numbarr[numbarr.length - 1]) * 1000;
                        }
                        numbarr.pop()
                        if (numbarr.length >= 1) {
                            if (Number(numbarr[numbarr.length - 1]) + minstoadd >= 60) {
                                toreply.push("mas de 60 minutos")
                                minsfix = Math.floor((Number(numbarr[numbarr.length - 1]) + minstoadd) % 60);
                                hourstoadd = Math.floor((Number(numbarr[numbarr.length - 1]) + minstoadd) / 60);
                                console.log(temptime)
                                temptime = temptime + (minsfix * 1000 * 60);
                                console.log(temptime)
                            }
                            else {
                                hourstoadd = 0
                                temptime = temptime + (Number(numbarr[numbarr.length - 1]) + minstoadd) * 1000 * 60;
                            }
                            numbarr.pop()
                            if (numbarr.length >= 1) {
                                if (Number(numbarr[numbarr.length - 1]) + hourstoadd >= 24) {
                                    return message.reply("No puedes poner un temporizador de mas de un dia")
                                }
                                else {
                                    temptime = temptime + (Number(numbarr[numbarr.length - 1]) + hourstoadd) * 1000 * 60 * 60;
                                }
                                numbarr.pop()
                            }
                            else {
                                temptime = temptime + (hourstoadd * 1000 * 60 * 60);
                            }
                        }
                        else {
                            if(minstoadd > 0){
                                temptime = temptime + (minstoadd * 1000 * 60);
                            }
                        }
                    }
                    else {
                        return message.reply("Parece que " + numbarr[numbarr.length - 1] + " no es un numero")
                    }
                }
                var segundos = Math.floor(temptime / 1000)
                var minutos = Math.floor(segundos / 60)
                var horas = Math.floor(minutos / 60)
                if(horas < 24){
                    var timertime = [Math.floor(horas), "horas", Math.floor(minutos - (60 * horas)), "minutos", Math.floor(segundos - (60 * minutos)), "segundos"]
                    message.reply ("temporizador establecido para mencionarte en **"+timertime.join(" ")+"**")
                    bot.timers["user" + authorid] = setTimeout(m => {
                        message.reply(message.content.split(" ").slice(2).join(" "));
                        delete bot.timers["user" + authorid];
                    },
                        temptime)
                }
                else {
                    message.reply("Parece que la suma del tiempo del temporizador da mas de 24 horas")
                }
                
            }
        }
    }
}

module.exports.data = {
    module: "utility",
    name: "timer"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    if (message.author.avatarURL.includes("gif")) {
        avatarurlmod = message.author.avatarURL.replace("gif", "png")
    }
    else {
        avatarurlmod = message.author.avatarURL
    }
    let embed = new Discord.RichEmbed()
        .setTitle("Temporizador")
        .setDescription("Este comando emite una alerta despues de cierto tiempo y te etiqueta para avisarte")
        .addField("Uso", "```" + "p-timer <tiempo (hh:mm:ss)> <mensaje de lo que quieres que recuerdes>" + "```" + "\nNo puede superar las 24 horas")
        .addField("Ejemplos", bot.prefix + "timer **3:00:00** **Reclamar a la waifu**\np-timer 2:30 (si se deja en blanco solo dara el aviso con un ping)\n\nEl timer también acepta numeros que superen las medidas normales\n\np-timer 100:100 (1 hora 41 minutos 40 segundos)")
        .addField("Cancelación", "Para cancelar el Temporizador escribe" + "```" + bot.prefix + "timer cancel" + "```")
        .setFooter(transsv.helpfooter, message.avatarurlmod)
        .setColor(bot.color);
    message.channel.send(embed)
}