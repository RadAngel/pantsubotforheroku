const Discord = require('discord.js');

module.exports.eventrun = async (bot, message, db, talkedRecently, nickcmds) => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var lvlmult = 2.45;
    var randomxp = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    var xpbase = 500;

    if (talkedRecently.has(message.author.id)) {
        // console.log(`${message.author.username} talked recently`)
    } else {
        // console.log(`${message.author.username} won xp`)
        var userexists = db.prepare(`SELECT count(*), * FROM profiles WHERE id = "${message.author.id}";`).get();
        if (!userexists['count(*)']) {
            bot.globalfunctions.get("registeruser").run(bot, message, db, false, message.author.id);
        }
        var userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();
        if (JSON.parse(userrow.progress).lvl <= 0) {
            lvlmult = 1
        }
        if (JSON.parse(userrow.progress).lvl > 0) {
            lvlmult = 2.45 * JSON.parse(userrow.progress).lvl
        }
        var newobject = JSON.parse(userrow.progress)
        newobject.xp = newobject.xp + randomxp;
        if (newobject.xp >= lvlmult * xpbase) {
            newobject.lvl = newobject.lvl + 1;
        }
        db.prepare(`UPDATE profiles SET progress = '${JSON.stringify(newobject).replace(/'/g, "''")}' WHERE id = ${message.author.id};`).run();
        userrow = db.prepare(`SELECT * FROM profiles WHERE id = ${message.author.id};`).get();

        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);
    }

    var transsv = bot.langs.get("es")
    if (message.author.bot) return;
    // if(message.author.id == "261700562649612289"){
    //     function resolveEmojiIdentifier(emoji) {
    //         console.log(emoji)
    //         if (emoji instanceof Discord.Emoji || emoji instanceof Discord.ReactionEmoji) return emoji.identifier;
    //         if (typeof emoji == 'string') {
    //           if (bot.emojis.has(emoji)) return bot.emojis.get(emoji).identifier;
    //           else if (!emoji.includes('%')) return encodeURIComponent(emoji);
    //           else return emoji;
    //         }
    //         return null;
    //       }
    //     for(i=0;i<message.content.split(" ").length;i++){
    //         console.log(resolveEmojiIdentifier(message.content.split(" ")[i]));
    //     }
    // }
    if (message.content.startsWith(bot.prefix)) {
        var cmd = message.content.split(" ")[0].slice(1).toLowerCase();
        if (cmd === "invite" || cmd === "invitación" || cmd === "invitar") {
            cmd = message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase();
            let commandfile = bot.commands.get(message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase());
            if (commandfile) {
                return commandfile.run(bot, message, transsv, nickcmds, db);
            }
            try {
                eval("nickcmds." + `${cmd}`);
                if (eval("nickcmds." + `${cmd}`)) {
                    bot.commands.get(eval("nickcmds." + `${cmd}`)).run(bot, message, transsv, nickcmds, db)
                }
            } catch (e) {
                if (e instanceof SyntaxError) {
                    console.log(`Error de comando: ${e.message} en ${message.guild.name} por ${message.author.username} con el mensaje ${message.content}`.red);
                } else {
                    throw (e);
                }
            }
        }
    }
    if (message.channel.type === "dm") return;
    // mata.matamens(bot,message,transsv,nickcmds,db);
    if (message.content.startsWith("/")) {
        cmd = message.content.split(" ")[0].slice(1).toLowerCase();
        if (cmd === "kill") {
            cmd = message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase();
            let commandfile = bot.commands.get(message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase());
            if (commandfile) {
                return commandfile.run(bot, message, transsv, nickcmds, db);
            }
            try {
                eval("nickcmds." + `${cmd}`);
                if (eval("nickcmds." + `${cmd}`)) {
                    bot.commands.get(eval("nickcmds." + `${cmd}`)).run(bot, message, transsv, nickcmds, db)
                }
            } catch (e) {
                if (e instanceof SyntaxError) {
                    console.log(`Error de comando: ${e.message} en ${message.guild.name} por ${message.author.username} con el mensaje ${message.content}`.red);
                } else {
                    throw (e);
                }
            }
        }
    }
    // if(message.mentions.users.find("username",bot.user.username)) return message.reply("todavia no estoy hecho para mantener conversaciones, intenta en otro momento, si necesitas ayuda, usa el comando **-ayuda**").then(m=>setTimeout(function(){m.delete();message.delete()},1000*10))
    if (!message.content.toLowerCase().split(" ")[0].startsWith(bot.prefix)) return;
    cmd = message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase();
    let commandfile = bot.commands.get(message.content.split(" ")[0].slice(bot.prefix.length).toLowerCase());
    if (message.content.startsWith(`${bot.prefix}`)) {
        if (commandfile) return commandfile.run(bot, message, transsv, nickcmds, db);
        try {
            eval("nickcmds." + `${cmd}`);
            if (eval("nickcmds." + `${cmd}`)) {
                bot.commands.get(eval("nickcmds." + `${cmd}`)).run(bot, message, transsv, nickcmds, db)
            }
        } catch (e) {
            if (e instanceof SyntaxError) {
                // console.log(`Error de comando: ${e.message} en ${message.guild.name} por ${message.author.username} con el mensaje ${message.content}`.red);
            } else {
                throw (e);
            }
        }
    }

    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}date`) {
        var dat = new Date();
        console.log(dat);
        console.log(dat.toJSON());
        console.log(JSON.stringify(dat.toJSON()));
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}nicks`) {
        console.log(JSON.stringify(nickcmds))
        console.log(JSON.stringify(nickcmds).replace("{", "").replace("}", "").split(","))
        // for(i=0;i<nickcmds;i++)
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}user`) {
        var user = bot.users.get(message.content.split(" ")[1])
        console.log(user)
        bot.fetchUser(message.content.split(" ")[1])
            .then(u => {
                console.log(u)
            })
            .catch(err => {
                console.log(err)
            })
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}pollux` && message.author.id == bot.ownerid) {
        try {
          var polluxavatar = "";
            message.delete().catch(err => console.log(err));
            bot.fetchUser("271394014358405121").then(u => {
                polluxavatar = u.avatarURL
            })
            var webhook = await message.channel.fetchWebhooks()
            if (webhook.map(w => w.name) != "Pollux") {
                await message.channel.createWebhook("Pollux", polluxavatar + "?size=2048").then(wb => {
                    console.log(wb)
                })
            }
            webhook = await message.channel.fetchWebhooks()
            var webhuk = new Discord.WebhookClient(webhook.map(w => w.id), webhook.map(w => w.token));
            webhuk.send("!Oh cielos, un Botin **SUPER RARO**! !Todos tienen __**20 Segundos**__ para disputarserlo! Escribe `pick` !por la oportunidad de conseguirlo!", {
                file: "https://cdn.discordapp.com/attachments/715648446912266330/715648563681689760/chest.png"
            })
                .then(kek =>
                    webhuk.send("Participantes para esta Caja:")
                        .then(c => {
                            const filter = m => m.content.includes('pick');
                            message.channel.awaitMessages(filter, {
                                time: 20000,
                                errors: ['time']
                            })
                                .catch(a => {
                                    console.log(a)
                                    console.log(kek)
                                    console.log(c)
                                    console.log(message.channel.fetchMessage(c.id))
                                    webhuk.delete();
                                })
                        })
                )
        } catch (err) { console.log(err) };
    }
    // if(message.guild.id == "398142330239975426" && (message.channel.id == "450128032905166858" || message.channel.id == "437395191280959490")){
    //     no = message.guild.emojis.find(f => f.name === "nooo")
    //     si = message.guild.emojis.find(f => f.name === "siii")
    //     console.log(JSON.parse(JSON.stringify(no)).id)
    //     console.log(JSON.parse(JSON.stringify(si)).id)
    //     // console.log(message.guild.emojis.get(JSON.parse(JSON.stringify(si)).id))
    //     message.react(message.guild.emojis.get(JSON.parse(JSON.stringify(no)).id))
    //     message.react(message.guild.emojis.get(JSON.parse(JSON.stringify(si)).id))
    //     message.react(message.guild.emojis.get('453684139720441867'))
    //         .then(console.log)
    //         .catch(console.error);
    //     message.react(message.guild.emojis.get('453684164307189762')) 
    //         .then(console.log)
    //         .catch(console.error);
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}send`) { }
    // if(newMessage.content.toLowerCase().includes("nel"))
    // message.channel.send('Dijo nel');
    // if(newMessage.content.toLowerCase().includes("suck"))
    // message.channel.send('Suck it rai nau');
    // if(newMessage.content.toLowerCase().includes("simon"))
    // message.channel.send('Karnal');
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}tabletest`) {
        // var kek = 0;
        // console.log(`${kek} inicio`);
        // con.query(`SELECT * FROM test_table WHERE test_value = "1"`, (err, row) => {
        //     kek = row[0].test_value
        //     console.log(`${kek} en query`);
        // });
        // console.log(`${kek} final`);
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}collection`) {
        console.log(bot.commands);
        console.log(bot.langs);
        console.log(bot.commands.map(c => c.data.name));
        console.log(bot.globalfunctions);
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}tenor`) { }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}servidores`) {
        console.log(bot.guilds.map(g => g.name));
        console.log(bot.guilds.map(g => g.name).slice(","));
        if (bot.guilds.map(g => g.name).slice(",").includes("man")) {
            console.log("astol encontrado");
        }
        console.log("astol no encontrado");
    }
    // if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}roles`) {
    //     console.log(message.guild.roles.map(g => g.name), message.guild.roles.map(g => g.permissions));
    // }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}member`) {
        console.log(message.member.roles.map(g => g.permissions));
        // console.log(message.author.client.guilds.find(g => g.name,"cafetería").roles.map(g => g.permissions));
    }

    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}ame` && message.guild.id == "441751577686966282" && message.channel.id == "441753844456882206") {
        //console.log(message.guild);
        let embed = new Discord.RichEmbed()
            .setDescription(`ame ame ame para <@${message.author.id}>`)
            .setImage("https://i.pinimg.com/originals/ac/81/3b/ac813ba1954d732abe8b8df984f1cb7c.gif")
            .setColor(0xff68f9);
        message.channel.send(embed)
        message.delete().catch(err => console.log(err));
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}timeout`) {
        var a = "kek"
        if (message.content.toLowerCase().split(" ")[1] == `start`) {
            message.channel.send("timeout empezado")
            a = setTimeout(kek => {
                message.channel.send("se acabo el tiempo")
            }, 1000 * 10)
            const filter = m => (m.content == `end` || m.content == "c") && m.author.id == message.author.id;
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 60000,
                errors: ['time']
            })
                .then(e => {
                    message.channel.send("timeout cancelado");
                    clearTimeout(a)
                })
        }
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}voice`) {
        console.log(message.guild.fetchMember(bot.user)
            .then(v => {
                // console.log(v.voiceChannel)
                v.voiceChannel.leave()

            }));
    }
    if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}pixiv`) {

    }
    // if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}rainbow` && (message.channel.permissionsFor(message.member).has("ADMINISTRATOR") || message.author.id == bot.ownerid)) {
    //     // console.log(message.guild.roles)
    //     // console.log(message.guild.roles.exists(r => r.name === 'rainbow'))
    //     // console.log(message.guild.roles.find(r => r.name === 'rainbow').id)
    //     // console.log(message.guild.roles.find(r => r.name === 'rainbow').name)
    //     if (message.guild.roles.some(r => r.name === 'Arcoíris')) {
    //         console.log("Arcoíris existe")
    //         message.guild.roles.find(r => r.name === "Arcoíris").setPosition(message.guild.roles.find(r => r.name === "PantsuBot").position - 1)
    //         message.member.addRole(message.guild.roles.find(r => r.name === "Arcoíris").id)
    //         const rolecolors = [0x9400D3, 0x4B0082, 0x0000FF, 0x00FF00, 0xFFFF00, 0xFF7F00, 0xFF0000]
    //         var actcolor = 0;
    //         if (message.content.toLowerCase().split(" ")[1] == "start" && message.author.id == bot.ownerid) {
    //             setInterval(function () {
    //                 // console.log("cambio de color")
    //                 message.guild.roles.find(r => r.name === "Arcoíris").setColor(rolecolors[actcolor])
    //                 actcolor = actcolor + 1
    //                 if (actcolor == rolecolors.length) {
    //                     actcolor = 0
    //                 }
    //                 // use the message's channel (TextChannel) to send a new message
    //             }, 1000 * 3);
    //         }
    //     } else {
    //         message.guild.createRole({
    //             name: 'Arcoíris',
    //             color: 0x9400D3,
    //         })
    //         setTimeout(function () {
    //             message.member.addRole(message.guild.roles.find(r => r.name === "Arcoíris").id)
    //             message.guild.roles.find(r => r.name === "Arcoíris").setPosition(message.guild.roles.find(r => r.name === "PantsuBot").position - 1)
    //         }, 1000)
    //     }
    // }
}
