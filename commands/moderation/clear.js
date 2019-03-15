const Discord = require('discord.js');
var colors = require('colors')
module.exports.run = async (bot,message,transsv,nickcmds,db) => {
    let deleteStuff = async (canttodel,original_number) => {
        // console.log(`deleteStuff`.bgWhite.green)
        if(canttodel <= 100 && canttodel > 0){
            // console.log(`menor que 100`.bgWhite.blue)
            message.channel.fetchMessages({ limit: canttodel })
                .then(messages => {
                    message.channel.bulkDelete(messages)
                        .then(bulk => {
                            message.channel.send(`Se han borrado ${original_number} mensaje(s)`)
                                .then(m => {
                                    setTimeout (function () {
                                        m.delete()
                                    .catch(console.error);
                                    }, 1000 * 3);
                                })
                            return;
                        })
                        .catch(err => console.log(`${err}`.red))
                    canttodel = canttodel - canttodel
                })
                
        }
        else if(canttodel > 100){
            // console.log(`mayor que 100`.bgWhite.blue)
            message.channel.fetchMessages({ limit: 100 })
                .then(messages => {
                    message.channel.bulkDelete(messages)
                .catch(err => console.log(`${err}`.red))
            canttodel = canttodel - 100
            deleteStuff(canttodel,original_number);
                })
        }
    };
    message.guild.fetchMember(bot.user)
        .then(b => {
            if(message.channel.permissionsFor(b).has("MANAGE_MESSAGES")){
                if(message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && message.content.toLowerCase().split(" ")[1]==null){
                    message.channel.send("Tienes que decirme la cantidad");
                    return;
                }
                if(message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")){
                    if(Number.isInteger(Number(message.content.toLowerCase().split(" ")[1]))){
                        var canttodel = Number(message.content.split(" ")[1]);
                        var original_number = Number(message.content.toLowerCase().split(" ")[1])
                        message.delete()
                            .then(m => {
                                deleteStuff(canttodel,original_number);
                            })
                        // for(i=0;i<canttodel;){
                        //     console.log(canttodel)
                        //     if(canttodel <= 100 && canttodel > 0){
                        //         console.log(`${canttodel} menor 100`)
                        //         message.channel.bulkDelete(canttodel)
                        //             .catch(err => console.log(`${err}`.red))
                        //         canttodel = canttodel - canttodel
                        //     }
                        //     else if(canttodel > 100){
                        //         console.log(`${canttodel} mayor 100`)
                        //         message.channel.bulkDelete(100)
                        //             .catch(err => console.log(`${err}`.red))
                        //         canttodel = canttodel - 100
                        //     }
                        // }
                        
                    }
                    else{
                        let embed = new Discord.RichEmbed()
                            .setDescription("Escribe un numero real")
                            .setColor(0xff68f9);
                        message.channel.send(embed);
                        return;
                    }
                }
                else{
                    message.channel.send(`No tienes permisos para esto <@${message.author.id}>`);
                    return;
                }
            }
            else{
                message.reply("No tengo permisos, contacta con un administrador del canal para darme el permiso de administrar mensajes")
                return;
            }
        })
        .catch(e => {
            console.log(e)
            console.log("No me encuentro a mi mismo".red)
            return;
        })
}

module.exports.data = {
    module:"moderation",
    name: "clear"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}