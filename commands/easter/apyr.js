const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["apyr"]) {
        bot.easterscontrollers["apyr"] = {};
    }
    else {
        if(bot.easterscontrollers.apyr["channel"+message.channel.id]){
            clearTimeout(bot.easterscontrollers.apyr["channel"+message.channel.id].deltimeout).catch(err => console.log(err))
        }
    }
    var apyrexist = false;
    message.delete()
        .catch(err => { })
    let embed = new Discord.RichEmbed()
        .setImage("https://i.imgur.com/PkIeN4J.jpg")
        .setColor(0x000000);

    message.channel.fetchWebhooks().then(async webhook => {
        if (!bot.easterscontrollers.apyr["channel" + message.channel.id]) {
            console.log(webhook)
            console.log(webhook.array().length)
            console.log(webhook.array())
            console.log(webhook.find(web => web.name == "Apyr"))
            if (webhook.array().length > 0) {
                if (webhook.find(web => web.name == "Apyr")) {
                    apyrexist = true
                    for (let i = 0; i < webhook.array().length; i++) {
                        if (webhook.array()[i].name == "Apyr") {
                            if (webhook.array()[i].id == webhook.find(web => web.name == "Apyr").id) {
                                var webhookid = webhook.find(web => web.name == "Apyr").id
                                var webhooktoken = webhook.find(web => web.name == "Apyr").token
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
                    apyrexist = false
                }
            }
            // console.log(webhook.find(web => web.name == "Super F"))
            if (!apyrexist) {
                await message.channel.createWebhook("Apyr", "https://cdn.wallpapersafari.com/39/1/KMH8X0.jpg").then(wb => {
                    webhookid = wb.id
                    webhooktoken = wb.token
                    console.log(wb)
                })
                    .catch(err => console.log(err))
            }
            bot.easterscontrollers.apyr["channel" + message.channel.id] = { webhookid, webhooktoken }
        }
        var webhuk = new Discord.WebhookClient(bot.easterscontrollers.apyr["channel" + message.channel.id].webhookid, bot.easterscontrollers.apyr["channel" + message.channel.id].webhooktoken);
        webhuk.send(embed)
            .then(sendweb => {
                bot.easterscontrollers.apyr["channel"+message.channel.id]["deltimeout"] = setTimeout(del => {
                    webhuk.delete().catch(err => console.log(err))
                    delete bot.easterscontrollers.apyr["channel"+message.channel.id]
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
    name: "apyr"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}