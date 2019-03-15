const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["thanos"]) {
        bot.easterscontrollers["thanos"] = {};
    }
    else {
        if(bot.easterscontrollers.thanos["channel"+message.channel.id]){
            clearTimeout(bot.easterscontrollers.thanos["channel"+message.channel.id].deltimeout).catch(err => console.log(err))
        }
    }
    var thanosexist = false;
    message.delete()
        .catch(err => { })
    let embed = new Discord.RichEmbed()
        .setDescription("Perfectamente equilibrado")
        .setImage("https://plantillasdememes.com/img/plantillas/perfectamente-equilibrado-como-todo-debe-estar2.jpg")
        .setFooter("Como debe estar")
        .setColor(0x000000);

    await message.channel.fetchWebhooks().then(async webhook => {
        if (!bot.easterscontrollers.thanos["channel" + message.channel.id]) {
            console.log(webhook)
            console.log(webhook.array().length)
            console.log(webhook.array())
            console.log(webhook.find(web => web.name == "Thanos"))
            if (webhook.array().length > 0) {
                if (webhook.find(web => web.name == "Thanos")) {
                    thanosexist = true
                    for (let i = 0; i < webhook.array().length; i++) {
                        if (webhook.array()[i].name == "Thanos") {
                            if (webhook.array()[i].id == webhook.find(web => web.name == "Thanos").id) {
                                var webhookid = webhook.find(web => web.name == "Thanos").id
                                var webhooktoken = webhook.find(web => web.name == "Thanos").token
                                console.log("webhook perdonado")
                            }
                            else {
                                var webhukdel = new Discord.WebhookClient(webhook.array()[i].id, webhook.array()[i].token);
                                webhukdel.delete().catch(err => console.log(err))
                                console.log("webhook borrado por exeso")
                            }
                        }
                    }
                }
                else {
                    thanosexist = false
                }
            }
            // console.log(webhook.find(web => web.name == "Super F"))
            if (!thanosexist) {
                await message.channel.createWebhook("Thanos", "https://www.androidred.com/wp-content/uploads/2016/08/Thanos-Phone-Wallpaper.jpg").then(wb => {
                    webhookid = wb.id
                    webhooktoken = wb.token
                    console.log(wb)
                })
                    .catch(err => console.log(err))
            }
            bot.easterscontrollers.thanos["channel" + message.channel.id] = { webhookid, webhooktoken }
        }
        var webhuk = new Discord.WebhookClient(bot.easterscontrollers.thanos["channel" + message.channel.id].webhookid, bot.easterscontrollers.thanos["channel" + message.channel.id].webhooktoken);
        webhuk.send(embed)
            .then(sendweb => {
                bot.easterscontrollers.thanos["channel"+message.channel.id]["deltimeout"] = setTimeout(del => {
                    webhuk.delete().catch(err => console.log(err))
                    delete bot.easterscontrollers.thanos["channel"+message.channel.id]
                    console.log("webhuk borrado")
                },1000*10)
            })
            .catch(err => console.log(err));
    })
        .catch(err => console.log(err))
}

module.exports.data = {
    module: "easter",
    hidemodule: 1,
    name: "thanos"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}