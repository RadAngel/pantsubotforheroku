const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    if (!bot.easterscontrollers["superf"]) {
        bot.easterscontrollers["superf"] = {};
    }
    else {
        if(bot.easterscontrollers.superf["channel"+message.channel.id]){
            clearTimeout(bot.easterscontrollers.superf["channel"+message.channel.id].deltimeout).catch(err => console.log(err))
        }
    }
    var superfexist = false;
    message.delete()
        .catch(err => { })
    let embed = new Discord.RichEmbed()
        .setImage("https://static.tvtropes.org/pmwiki/pub/images/super_f_6926.png")
        .setColor(0x000000);

    await message.channel.fetchWebhooks().then(async webhook => {
        if (!bot.easterscontrollers.superf["channel" + message.channel.id]) {
            console.log(webhook)
            console.log(webhook.array().length)
            console.log(webhook.array())
            console.log(webhook.find(web => web.name == "Super F"))
            if (webhook.array().length > 0) {
                if (webhook.find(web => web.name == "Super F")) {
                    superfexist = true
                    for (let i = 0; i < webhook.array().length; i++) {
                        if (webhook.array()[i].name == "Super F") {
                            if (webhook.array()[i].id == webhook.find(web => web.name == "Super F").id) {
                                var webhookid = webhook.find(web => web.name == "Super F").id
                                var webhooktoken = webhook.find(web => web.name == "Super F").token
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
                    superfexist = false
                }
            }
            // console.log(webhook.find(web => web.name == "Super F"))
            if (!superfexist) {
                await message.channel.createWebhook("Super F", "https://static.tvtropes.org/pmwiki/pub/images/super_f_6926.png").then(wb => {
                    webhookid = wb.id
                    webhooktoken = wb.token
                    console.log(wb)
                })
                    .catch(err => console.log(err))
            }
            bot.easterscontrollers.superf["channel" + message.channel.id] = { webhookid, webhooktoken }
        }
        var webhuk = new Discord.WebhookClient(bot.easterscontrollers.superf["channel" + message.channel.id].webhookid, bot.easterscontrollers.superf["channel" + message.channel.id].webhooktoken);
        webhuk.send(embed)
            .then(sendweb => {
                bot.easterscontrollers.superf["channel"+message.channel.id]["deltimeout"] = setTimeout(del => {
                    webhuk.delete().catch(err => console.log(err))
                    delete bot.easterscontrollers.superf["channel"+message.channel.id]
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
    name: "superf"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
}