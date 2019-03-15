const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["waiting"]) {
        bot.easterscontrollers["waiting"] = {};
    }
    else {
        if(bot.easterscontrollers.waiting["channel"+message.channel.id]){
            clearTimeout(bot.easterscontrollers.thanos["channel"+message.channel.id].deltimeout).catch(err => console.log(err))
        }
    }
    var waitingexist = false;
    message.delete()
        .catch(err => { })
    let embed = new Discord.RichEmbed()
        .setImage("https://i.imgflip.com/1hew5r.jpg")
        .setColor(0x000000);

    message.channel.fetchWebhooks().then(async webhook => {
        if (!bot.easterscontrollers.waiting["channel" + message.channel.id]) {
            console.log(webhook)
            console.log(webhook.array().length)
            console.log(webhook.array())
            console.log(webhook.find(web => web.name == "Majin Bu"))
            if (webhook.array().length > 0) {
                if (webhook.find(web => web.name == "Majin Bu")) {
                    waitingexist = true
                    for (let i = 0; i < webhook.array().length; i++) {
                        if (webhook.array()[i].name == "Majin Bu") {
                            if (webhook.array()[i].id == webhook.find(web => web.name == "Majin Bu").id) {
                                var webhookid = webhook.find(web => web.name == "Majin Bu").id
                                var webhooktoken = webhook.find(web => web.name == "Majin Bu").token
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
                    waitingexist = false
                }
            }
            // console.log(webhook.find(web => web.name == "Super F"))
            if (!waitingexist) {
                await message.channel.createWebhook("Majin Bu", "https://i.imgflip.com/1hew5r.jpg").then(wb => {
                    webhookid = wb.id
                    webhooktoken = wb.token
                    console.log(wb)
                })
                    .catch(err => console.log(err))
            }
            bot.easterscontrollers.waiting["channel" + message.channel.id] = { webhookid, webhooktoken }
        }
        var webhuk = new Discord.WebhookClient(bot.easterscontrollers.waiting["channel" + message.channel.id].webhookid, bot.easterscontrollers.waiting["channel" + message.channel.id].webhooktoken);
        webhuk.send(embed)
            .then(sendweb => {
                bot.easterscontrollers.waiting["channel"+message.channel.id]["deltimeout"] = setTimeout(del => {
                    webhuk.delete().catch(err => console.log(err))
                    delete bot.easterscontrollers.waiting["channel"+message.channel.id]
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
    name: "waiting"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}