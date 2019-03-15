const Discord = require('discord.js');
var weather = require('weather-js');
var tc = require("timezonecomplete");

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    try{
    if(!message.content.split(" ")[1]) {
        let embed = new Discord.RichEmbed()
            .setTitle("Clima")
            .setDescription("Ayuda para usar el comando del clima")
            .addField("Clima de una ciudad","-clima <ciudad>",true)
            .addField("Pronostico del clima semanal de una ciudad","-clima semana <ciudad>",true)
            .setFooter("Recuerda quitar las <> al usar los comandos")
            .setColor(bot.color);
        message.channel.send(embed)
        return;
    }
    if(message.content.split(" ")[1] == "semana" || message.content.split(" ")[2] == "week" || message.content.split(" ")[1] == "semanal" || message.content.split(" ")[2] == "weekly"){
      var day;
      var cond;  
      var month;
      weather.find({search: message.content.split(" ").slice(2).join(" "), degreeType: 'C'}, function(err, result) {
            console.log(result[0].forecast)
            let embed = new Discord.RichEmbed ()
                .setTitle("Pronostico semanal")
                .setDescription(`Las predicciones para las condiciones del clima para esta semana en ${result[0].location.name}`)
                .setThumbnail("https://cdn.pixabay.com/photo/2017/09/25/18/14/cloud-2786100_960_720.png")
                .setColor(bot.color);
            for(var i=1;i<result[0].forecast.length;i++){
                switch(result[0].forecast[i].shortday){
                    case "Mon": 
                        day = "Lunes"
                    break;
                    case "Tue": 
                        day = "Martes"
                    break;
                    case "Wed": 
                        day = "Miercoles"
                    break;
                    case "Thu": 
                        day = "Jueves"
                    break;
                    case "Fri": 
                        day = "Viernes"
                    break;
                    case "Sat": 
                        day = "Sabado"
                    break;
                    case "Sun": 
                        day = "Domingo"
                    break;
                }
                switch(result[0].forecast[i].skycodeday){
                    case "9": 
                        cond = "Ligeramente Lluvioso :cloud_rain:"
                    break;
                    case "11": 
                        cond = "Lluvioso :cloud_rain:"
                    break;
                    case "22": 
                        cond = "Humo/Niebla :cloud:"
                    break;
                    case "26": 
                        cond = "Nublado :cloud:"
                    break;
                    case "27": 
                        cond = "Mayormente Nublado :white_sun_cloud:"
                    break;
                    case "28": 
                        cond = "Mayormente Nublado :white_sun_cloud:"
                    break;
                    case "29": 
                        cond = "Parcialmente Nublado :white_sun_cloud:"
                    break;
                    case "30": 
                        cond = "Parcialmente soleado :partly_sunny:"
                    break;
                    case "31": 
                        cond = "Mayormente despejado :white_sun_small_cloud:"
                    break;
                    case "32": 
                        cond = "Soleado :sunny:"
                    break;
                    case "34": 
                        cond = "Mayormente soleado :white_sun_small_cloud:"
                    break;
                    default: 
                        cond = result[0].forecast[i].skytextday
                    break;
                }
                embed.addField(`${day}`,`**Condición meteorologica**: ${cond}\n**Maxima Temperatura**: ${result[0].forecast[i].high}°C\n**Minima Temperatura**: ${result[0].forecast[i].low}°C\n**Precipitación**: ${result[0].forecast[i].precip}%`)
            }
            message.channel.send(embed)
        });
    }
    else if(message.content.split(" ")[1] && !(message.content.split(" ")[1] == "semana" || message.content.split(" ")[2] == "week")){
      var winddir;
      var cond;
        weather.find({search: message.content.split(" ").slice(1).join(" "), degreeType: 'C'}, function(err, result) {
            if(err) console.log(err);
            console.log(result,null,1)
            if(result[0]){
            switch(result[0].current.winddisplay.split(" ")[2]){
                case "North": 
                    winddir = "Norte :arrow_down:"
                break;
                case "South": 
                    winddir = "Sur :arrow_up:"
                    break;
                case "East": 
                    winddir = "Este :arrow_left:"
                break;
                case "West": 
                    winddir = "Oeste :arrow_right:"
                break;
                case "Northeast": 
                    winddir = "Noreste :arrow_lower_left:"
                break;
                case "Southeast": 
                    winddir = "Sureste :arrow_upper_left:"
                    break;
                case "Southwest": 
                    winddir = "Suroeste :arrow_upper_right:"
                break;
                case "Northwest": 
                    winddir = "Noroeste :arrow_lower_right:"
                break;
            }
            switch(result[0].current.skycode){
                case "9": 
                    cond = "Ligeramente Lluvioso :cloud_rain:"
                break;
                case "21": 
                    cond = "Neblina :cloud:"
                break;
                case "26": 
                    cond = "Nublado :cloud:"
                break;
                case "27": 
                    cond = "Mayormente Nublado :white_sun_cloud:"
                break;
                case "28": 
                    cond = "Mayormente Nublado :white_sun_cloud:"
                break;
                case "30": 
                    cond = "Parcialmente soleado :partly_sunny:"
                break;
                case "31": 
                    cond = "Despejado :sunny:"
                break;
                case "32": 
                    cond = "Soleado :sunny:"
                break;
                case "34": 
                    cond = "Mayormente soleado :white_sun_small_cloud:"
                break;
                default: 
                    cond = result[0].forecast[0].skytextday
                break;
            }
            var actDate = new Date();
            console.log(actDate)
            switch((Number(actDate.getUTCMonth())+1)){
                case 1: 
                    month = "Enero"
                break;
                case 2: 
                    month = "Febrero"
                break;
                case 3: 
                    month = "Marzo"
                break;
                case 4: 
                    month = "Abril"
                break;
                case 5: 
                    month = "Mayo"
                break;
                case 6: 
                    month = "Junio"
                break;
                case 7: 
                    month = "Julio"
                break;
                case 8: 
                    month = "Agosto"
                break;
                case 9: 
                    month = "Septiembre"
                break;
                case 10: 
                    month = "Octubre"
                break;
                case 11: 
                    month = "Noviembre"
                break;
                case 12: 
                    month = "Diciembre"
                break;
            }
              var hourDisp;
              var dayDisp;
              var timez;
            if((Number(actDate.getUTCHours().toString()) + Number(result[0].location.timezone)) < 0){
                hourDisp = (Number(actDate.getUTCHours().toString()) + Number(result[0].location.timezone)) + 24
                dayDisp = Number(actDate.getUTCDate().toString()) - 1;
            }
            else{
                hourDisp = (Number(actDate.getUTCHours().toString()) + Number(result[0].location.timezone))
                dayDisp = Number(actDate.getUTCDate().toString());
            }
            if(Number(result[0].location.timezone) >= 0){
                timez = "-" + result[0].location.timezone
            }
            else{
                timez = result[0].location.timezone
            }
            let embed = new Discord.RichEmbed()
                .setTitle(`Clima`)
                .setThumbnail(result[0].current.imageUrl)
                .setDescription(`Las condiciones del clima en ${result[0].location.name}`)
                .addField("Temperatura", `${result[0].current.temperature}°C`,true)
                .addField("Sensación termica", `${result[0].current.feelslike}°C`,true)
                .addField("Humedad", `${result[0].current.humidity}%`,true)
                .addField("Viento",`${result[0].current.winddisplay.split(" ").slice(0,2).join(" ")} del ${winddir}`,true)
                .addField("Condición meteorologica",cond,true)
                .addField("Zona horaria", `UTC${timez}`,true)
                .addField("Tiempo actual", `**Día**: ${dayDisp}\n**Mes**: ${month}\n**Hora**: ${hourDisp}:${actDate.getUTCMinutes().toString()}:${actDate.getUTCSeconds().toString()}`)
                .setColor(bot.color);
            message.channel.send(embed)
        }
        else{
            message.reply("parece que hubo un error, intentalo de nuevo")
        }
        });
    }
}
catch(err){
    console.log(err)
}
}

module.exports.data = {
    module: "utility",
    name: "weather"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Clima")
        .setDescription("Ayuda para usar el comando del clima")
        .addField("Clima de una ciudad","-clima <ciudad>",true)
        .addField("Pronostico del clima semanal de una ciudad","-clima semana <ciudad>",true)
        .setFooter("Recuerda quitar las <> al usar los comandos")
        .setColor(bot.color);
    message.channel.send(embed)
    return;
}