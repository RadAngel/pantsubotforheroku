const Discord = require('discord.js');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    var randomessage = Math.floor(Math.random() * (5 - 1 +1)) + 1;
    var shipmessage = "";
    switch(randomessage){
        case 1:
            shipmessage = "Esta es la mejor pareja :yellow_heart:"
        break;
        case 2:
            shipmessage = "Esta pareja es asombrosa :heart:"
        break;
        case 3:
            shipmessage = "Esta pareja es pasable :purple_heart:"
        break;
        case 4:
            shipmessage = "No me agrada mucho esta pareja"
        break;
        case 5:
            shipmessage = "Simplemente no deberian estar juntos"
        break;
    }


    if(message.content.split(" ")[1] != null && message.content.split(" ")[2] == null){
        if (message.mentions.users.first()){
            // console.log("mencion solitaria")
            let embed = new Discord.RichEmbed()
                .setDescription(`${message.author.username.slice(0,Math.floor(message.author.username.length/2))}${message.mentions.users.first().username.slice(Math.floor(message.mentions.users.first().username.length/2),message.mentions.users.first().username.length)} ${shipmessage}`)
                .setColor(bot.color);    
            message.channel.send(embed).catch( err => { } );
            return;
        }
        if(Number.isInteger(Number(message.content.split(" ")[1])) && message.content.split(" ")[1].length == 18){
            bot.fetchUser(message.content.split(" ")[1])
                .then(u => {
                    // console.log(u)
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${message.author.username.slice(0,Math.floor(message.author.username.length/2))}${u.username.slice(Math.floor(u.username.length/2),u.username.length)} ${shipmessage}`)
                        .setColor(bot.color);    
                    message.channel.send(embed).catch( err => { } );
                })
                .catch(e => {
                    // console.log(e)
                    message.channel.send("No se ha encontrado el usuario");
                })
                return;
        }
        if(message.content.split(" ")[1]){
            let embed = new Discord.RichEmbed()
                .setDescription(`${message.author.username.slice(0,Math.floor(message.author.username.length/2))}${message.content.split(" ")[1].slice(Math.floor(message.content.split(" ")[1].length/2),message.content.split(" ")[1].length)} ${shipmessage}`)
                .setColor(bot.color);    
            message.channel.send(embed).catch( err => { } );
            return;
        }
    }
    if (message.content.split(" ")[1] != null && message.content.split(" ")[2] != null){
        if (message.mentions.users.first()){
            // console.log("mencion dual")
            // console.log(message.mentions.users.map(n=>n.username))
            try{
                if(message.mentions.users.map(u => u.username)[0] != null){
                // console.log(message.mentions.users)
                let embed = new Discord.RichEmbed()
                    .setDescription(`${message.mentions.users.map(u => u.username)[0].slice(0,Math.floor(message.mentions.users.map(u => u.username)[0].length/2))}${message.mentions.users.map(u => u.username)[1].slice(Math.floor(message.mentions.users.map(u => u.username)[1].length/2),message.mentions.users.map(u => u.username)[1].length)} ${shipmessage}`)
                    .setColor(bot.color);    
                message.channel.send(embed).catch( err => { } );
                return;
                }
            }
            catch(err){
                // console.log(err)
                message.reply(`No puedes poner a la misma persona 2 veces, es algo... esta bien, lo hare`)
                    .then(m => {
                        setTimeout(function (){
                            m.delete()
                            let embed = new Discord.RichEmbed()
                                .setDescription(`${message.mentions.members.map(m => m.displayName)[0]}, uy, que bonita pareja`)
                                .setColor(bot.color);    
                            message.channel.send(embed).catch( err => { } );
                        },1000*5)
                    })
            }
        }
        if(Number.isInteger(Number(message.content.split(" ")[1])) && message.content.split(" ")[1].length == 18){
            bot.fetchUser(message.content.split(" ")[1])
                .then(u1 => {
                    // console.log(u1)
                    bot.fetchUser(message.content.split(" ")[2])
                        .then(u2 => {
                            let embed = new Discord.RichEmbed()
                                .setDescription(`${u1.username.slice(0,Math.floor(u1.username.length/2))}${u2.username.slice(Math.floor(u2.username.length/2),u2.username.length)} ${shipmessage}`)
                                .setColor(bot.color);    
                            message.channel.send(embed).catch( err => { } );
                        })
                        .catch(e => {
                            // console.log(e)
                            message.channel.send("No se ha encontrado el usuario 2");
                        })
                })
                .catch(e => {
                    // console.log(e)
                    message.channel.send("No se ha encontrado el usuario 1");
                })
                return;
        }
        else if(message.content.split(" ")[1] && !message.mentions.users.first() && !Number.isInteger(Number(message.content.split(" ")[1]))){
            // console.log("fusion rara")
            let embed = new Discord.RichEmbed()
                .setDescription(`${message.content.split(" ")[1].slice(0,Math.floor(message.content.split(" ")[1].length/2))}${message.content.split(" ")[2].slice(Math.floor(message.content.split(" ")[2].length/2),message.content.split(" ")[2].length)} ${shipmessage}`)
                .setColor(bot.color);    
            message.channel.send(embed).catch( err => { } );
            return;
        }
    }
}

module.exports.data = {
    module:"other",
    name: "ship"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    
}