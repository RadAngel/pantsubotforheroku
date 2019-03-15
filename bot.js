const botSettings = process.env;
const Discord = require("discord.js");
// const mata = require('./matapacmans.js');
const GoogleImages = require('google-images');
const googleimg = new GoogleImages(botSettings.searchengine, botSettings.apigoogle);
const gif = require(`gif-search`);
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"]
});
const cron = require('cron');
const fs = require('fs');
const nickcmds = require('./nickcmds.json');
var colors = require('colors');
var https = require('https');
var path = require('path');
var chokidar = require('chokidar');
var spawn = require('child_process').spawn;
bot.commands = new Discord.Collection();
bot.langs = new Discord.Collection();
bot.globalfunctions = new Discord.Collection();
bot.timers = {};
bot.easterscontrollers = {};
bot.canvascontrollers = {};
bot.color = 0x4790ff;
bot.ownerid = botSettings.ownerid;
bot.ytkey = botSettings.apiyt;
bot.prefix = botSettings.prefix;
bot.ver = require("./package.json").version;
bot.debug = 0;
const talkedRecently = new Set();
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
process.setMaxListeners(Infinity);
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });

const job = new cron.CronJob('0 58 */11 * * *', function() {
  https.get('https://pantsubotawake.glitch.me', (resp) => {
  // console.log(resp);
  let data = '';
  console.log(resp);
  // A chunk of data has been recieved.

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
});
job.start();
// function main() {

//     if (process.env.process_restarting) {
//         delete process.env.process_restarting;
//         // Give old process one second to shut down before continuing ...
//         setTimeout(main, 1000);
//         return;
//     }
// }

// process.on('exit', (code) => {
//     console.log(code)
//     console.log("ded")
//     spawn(process.argv[0], process.argv.slice(1), {
//         env: {
//             process_restarting: 1
//         },
//         detached: true,
//         stdio: 'ignore'
//     }).unref();
// });


var Database = require('better-sqlite3');
var db = new Database('./database/pantsubot.db');
// var db = db.prepare('CREATE TABLE scores');
var profiles = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profiles';").get();
if (!profiles['count(*)']) {
    db.prepare(`CREATE TABLE IF NOT EXISTS profiles (id VARCHAR, progress VARCHAR, customdata VARCHAR, economy VARCHAR, inventory VARCHAR, lastmessage VARCHAR, lastedited VARCHAR, blacklisted VARCHAR, is_bot INT);`).run();
    profiles = db.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'profiles';").get();
    console.log(`Tabla de perfiles creada exitosamente`.rainbow)
} else {
    console.log(`Tabla de perfiles existente`.rainbow)
}

// var textToImage = require('text-to-image');
// textToImage.generate('Lorem ipsum dolor sit amet').then(function (dataUri) {
//   console.log(dataUri);
// });

function getFilesFromDir(dir, fileTypes) {
    var filesToReturn = [];

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);
            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                filesToReturn.push(curFile.replace(dir, ''));
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
    };
    walkDir(dir);
    return filesToReturn;
}
console.log("\ncargando comandos...\n".cyan)
var comands = getFilesFromDir("./commands", [".js"]);
console.log(comands);
for (i = 0; i < comands.length; i++) {
    let props = require(`./commands/${comands[i].split("/")[1]}/${comands[i].split("/")[2]}`);
    console.log(`${comands[i].split("/").slice(1).join("/")} listo`.blue);
    bot.commands.set(props.data.name, props)
}
console.log("\ncargando funciones globales...\n".cyan)
var globalfunctions = getFilesFromDir("./globalfunctions", [".js"]);
for (var i = 0; i < globalfunctions.length; i++) {
    let props = require(`./globalfunctions/${globalfunctions[i].split("/")[1]}`);
    console.log(`${globalfunctions[i].split("/").slice(1).join("/")} listo`.blue);
    bot.globalfunctions.set(globalfunctions[i].split("/")[1].split(".")[0], props)
}
console.log("\ncargando idiomas...\n".cyan)
var langs = getFilesFromDir("./langs", [".json"]);
for (var i = 0; i < langs.length; i++) {
    let props = require(`./langs/${langs[i].split("/")[1]}`);
    console.log(`${langs[i].split("/").slice(1).join("/")} listo`.blue);
    bot.langs.set(langs[i].split("/")[1].split(".")[0], props)
}
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        delete require.cache[require.resolve(`./events/${file}`)];
        let eventor = require(`./events/${file}`);
        let eventide = file.split(".")[0];
        bot.on(eventide, (...args) => eventor.eventrun(bot, ...args, db, talkedRecently,nickcmds));
        delete require.cache[require.resolve(`./events/${file}`)]
    });
});

// fs.readdir("./commands", (err, files) => {
//     if(err) console.log(err);
//     let jsfile = files.filter(f => f.split(".").pop() === "js")
//     if(jsfile.length <= 0){
//         console.log("no hay comandos")
//         return;
//     }

//     jsfile.forEach((f, i) => {
//         let props =require(`./commands/${f}`);
//         console.log(`${f} listo`);
//         bot.commands.set(props.name.name, props)
//     });
// });

// var pixiv = new Pixiv();

var con = null;

chokidar.watch('.', {
    ignored: [/(^|[\/\\])\../, './node_modules', './database', './notas.txt']
}).on('all', (event, path) => {
    // console.log(event, path
}).on('change', (ev, path) => {
    // console.log(typeof ev)
    // console.log(ev)
    fs.readFile(ev, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(require('./' + ev))
        //   console.log(data.toString());
        if (ev.split("/")[0] == "commands") {
            delete require.cache[require.resolve('./' + ev)]
            let props = require('./' + ev);
            delete bot[ev.split("/")[0]][ev.split("/")[0]]
            bot[ev.split("/")[0]].set(props.data.name, props)
            console.log(`${ev.split("/")[ev.split("/").length-1]} listo`.blue);
            console.log(ev + 'actualizado'.blue);
        } else if (ev.split("/")[0] == "globalfunctions"){
            delete require.cache[require.resolve('./' + ev)]
            let props = require('./' + ev);
            delete bot[ev.split("/")]
            bot[ev.split("/")[0]].set(ev.split("/")[1].split(".")[0], props)
            console.log(`${ev.split("\\")[ev.split("/").length-1]} listo`.blue);
            console.log(ev + 'actualizado'.blue);
        }else if (ev.split("/")[0] == "events") {
            fs.readdir("./events/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    delete require.cache[require.resolve(`./events/${file}`)];
                    let eventor = require(`./events/${file}`);
                    let eventide = file.split(".")[0];
                    bot.on(eventide, (...args) => eventor.eventrun(bot, ...args, db, talkedRecently));
                    delete require.cache[require.resolve(`./events/${file}`)]
                });
            });
         
        }else if (ev.split("/")[0] == "langs"){
            delete require.cache[require.resolve('./' + ev)]
            let props = require('./' + ev);
            delete bot[ev.split("/")]
            bot[ev.split("/")[0]].set(ev.split("/")[1].split(".")[0], props)
            console.log(`${ev.split("/")[ev.split("/").length-1]} listo`.blue);
            console.log(ev + 'actualizado'.blue);
        }else if (ev.split("/")[0] == "bot.js"){
            // main()
            // process.exit()
        }
    });


});

// bot.on("message", async function (message) {
//     try {
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}bannedwords`)
//             mata.logoutbanwords(message);
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}neko`) {
//             nekoslifeapi.neko(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}nekog`) {
//             nekoslifeapi.nekog(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}cat`) {
//             nekoslifeapi.cat(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}lizard`) {
//             nekoslifeapi.lizard(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}hug`) {
//             nekoslifeapi.hug(message, message.content.toLowerCase().split(" "), nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}foxgirl`) {
//             nekoslifeapi.foxgirl(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}feed`) {
//             nekoslifeapi.feed(message, message.content.toLowerCase().split(" "), nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}cuddle`) {
//             nekoslifeapi.cuddle(message, message.content.toLowerCase().split(" "), nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}why`) {
//             nekoslifeapi.why(message, nekos, Discord, bot);
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}catmote`) {
//             nekoslifeapi.catemote(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}owo`) {
//             if (message.content.split(" ")[1] == null) {
//                 let embed = new Discord.RichEmbed()
//                     .setDescription(`<@${message.author.id}> tienes que escribir algo`)
//                     .setColor(0xff68f9);
//                 message.channel.send(embed);
//             } else {
//                 nekoslifeapi.owofy(message, nekos, Discord, bot, message.content.split(" ").slice(1).join(" "));
//                 message.delete().catch(err => console.log(err));
//             }
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}chat`) {
//             if (message.content.split(" ")[1] == null) {
//                 let embed = new Discord.RichEmbed()
//                     .setDescription(`<@${message.author.id}> tienes que escribir algo`)
//                     .setColor(0xff68f9);
//                 message.channel.send(embed);
//             }
//             if (message.content.toLowerCase().split(" ")[1] == "owo") {
//                 nekoslifeapi.nekochatowo(message, nekos, Discord, bot, message.content.split(" ").slice(2).join(" "));
//             } else {
//                 nekoslifeapi.nekochat(message, nekos, Discord, bot, message.content.split(" ").join(" ").slice(1));
//             }
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}8ball`) {
//             nekoslifeapi.ball(message, nekos, Discord, bot);
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}fact`) {
//             nekoslifeapi.fact(message, nekos, Discord, bot);
//             message.delete().catch(err => console.log(err));
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}fuck`) {
//             if (!message.channel.nsfw) {
//                 let embed = new Discord.RichEmbed()
//                     .setDescription(`Aqui en publico no <@${message.author.id}>`)
//                     .setColor(0xff68f9);
//                 message.channel.send(embed);
//             } else {
//                 nekoslifeapi.fuck(message, message.content.toLowerCase().split(" "), nekos, Discord, bot);
//                 message.delete().catch(err => console.log(err));
//             }
//         }
//         if (message.content.toLowerCase().split(" ")[0] == `${bot.prefix}gif`) {
//             busqueda = message.content.split(" ").slice(1).join(" ");
//             gif.random(busqueda)
//                 .then(gifUrl => {
//                     // console.log(gifUrl[1]);
//                     let embed = new Discord.RichEmbed()
//                         .setImage(gifUrl)
//                         .setDescription(`Aqui tienes tu gif de ${busqueda}`)
//                         .setColor(0xff68f9);
//                     message.channel.send(embed);
//                 });
//         }
//     } catch (err) {
//         console.log(err)
//     }
// });
bot.on("messageUpdate", function (oldMessage, newMessage) {
    //console.log(newMessage);
    if (newMessage.author.bot) return;
    if (newMessage.channel.type === "dm") return;
    // mata.mataupd(bot,newMessage,transsv,nickcmds)
});
bot.on("messageReactionAdd", function (messageReaction, user) {
    var mensagereact = messageReaction.message
    // console.log(messageReaction.message.reactions.map(r => r.emoji.id)[0]);
    if (messageReaction.message.reactions.map(r => r.emoji.id)[0] == "406192511070240780") {
        messageReaction.message.clearReactions();
    }
});
bot.on("guildMemberAdd", function (member) {

});
bot.on("warn", function (info) {
    console.log(info)
})
bot.login(botSettings.token);