const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
  var checkbotowner = message.author.id == bot.ownerid;
  var checksupportsv = message.guild.id == "448454327380475924";
  var developer = bot.users.get(bot.ownerid);
  var avatarurlmod = "";
  if (developer.avatarURL.includes("gif")) {
    avatarurlmod = developer.avatarURL.replace("gif", "png")
  }
  else {
    avatarurlmod = developer.avatarURL
  }
  if (message.content.split(" ")[1] == null) {
    let embed = new Discord.RichEmbed()
      .setTitle(transsv.help.title)
      .setDescription(`${transsv.help.description} <@${message.author.id}>`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${transsv.help.botdevelopedby} ${developer.username}#${developer.discriminator}\n${bot.user.username} v${bot.ver}`, avatarurlmod)
      .setColor(bot.color);
    embed
      .addField(transsv.help.needmorehelp, "```" + "\n" + bot.prefix + transsv.help.morehelp + "```")
      .addField(transsv.help.comands, "```" + "\n" + bot.prefix + transsv.help.moarhelp + "```")
      .addField(transsv.help.ifyouneedmoarhelp, checksupportsv ? transsv.help.weareinsupportsv + "<#457290997102149637>" : "https://discord.gg/Aq4PEgk");
    message.channel.send(embed).catch();
  }
  if (message.content.split(" ")[1]) {
    if (message.content.toLowerCase().split(" ")[1] == "comandos" || message.content.toLowerCase().split(" ")[1] == "commands") {
      var modules = bot.commands.map(c => c.data.module);
      var arraymod = [];
      modules.forEach(mod => {
        if (!arraymod.includes(mod)) {
          arraymod.push(mod);
        }
      })
      var arraycmd = {};
      arraymod.forEach(mod => {
        arraycmd[mod] = [];
        var commands = bot.commands.map(c => c)
        commands.forEach(cmd => {
          if (cmd.data.module == mod) {
            if (!checkbotowner) {
              if (cmd.data.hidemodule == 1) {
                if (!arraycmd[mod].includes("Comandos secretos, ¿Cuáles podrian ser?")) {
                  arraycmd[mod].push("Comandos secretos, ¿Cuáles podrian ser?");
                }
              }
              else if (mod == "botowner") {
                if (!arraycmd[mod].includes("Comandos solo visibles para el dueño del bot")) {
                  arraycmd[mod].push("Comandos solo visibles para el dueño del bot");
                }
              }
              else if (cmd.data.testcmd == 1) {

              }
              else {
                arraycmd[mod].push(cmd.data.name);
              }
            }
            else {
              arraycmd[mod].push(cmd.data.name);
            }
          }
        });
      })
      let embed = new Discord.RichEmbed()
        .setTitle(transsv.help.commands.title)
        .setDescription(`${transsv.help.commands.description} <@${message.author.id}>`)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${transsv.help.botdevelopedby} ${developer.username}#${developer.discriminator}\n${bot.user.username} v${bot.ver}`, avatarurlmod)
        .setColor(bot.color);
      arraymod.forEach(mod => {
        embed.addField(transsv.help.commands.modules[mod], arraycmd[mod].join(", "), true)
      });
      embed
        .addField(transsv.help.needmorehelp, "```" + "\n" + bot.prefix + transsv.help.morehelp + "```")
        .addField(transsv.help.ifyouneedmoarhelp, checksupportsv ? transsv.help.weareinsupportsv + "<#457290997102149637>" : "https://discord.gg/Aq4PEgk")
      message.channel.send(embed).catch()
    }
    else {
      var cmd = message.content.split(" ")[1].toLowerCase();
      let commandfile = bot.commands.get(message.content.split(" ")[1]);
      if (commandfile) return commandfile.help(bot, message, transsv, nickcmds, db);
      try {
        eval("nickcmds." + `${cmd}`);
        if (eval("nickcmds." + `${cmd}`)) {
          bot.commands.get(eval("nickcmds." + `${cmd}`)).help(bot, message, transsv, nickcmds, db)
        }
        else {
          let embed = new Discord.RichEmbed()
            .setTitle(transsv.help.title)
            .setDescription(`${transsv.help.description} <@${message.author.id}>`)
            .setThumbnail(message.author.avatarURL)
            .setFooter(`${transsv.help.botdevelopedby} ${developer.username}#${developer.discriminator}\n${bot.user.username} v${bot.ver}`, avatarurlmod)
            .setColor(bot.color);
          embed
            .addField(transsv.help.needmorehelp, "```" + "\n" + bot.prefix + transsv.help.morehelp + "```")
            .addField(transsv.help.comands, "```" + "\n" + bot.prefix + transsv.help.moarhelp + "```")
            .addField(transsv.help.ifyouneedmoarhelp, checksupportsv ? transsv.help.weareinsupportsv + "<#457290997102149637>" : "https://discord.gg/Aq4PEgk")
          message.channel.send(embed).catch()
        }
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.log(`Error de comando: ${e.message} en ${message.guild.name} por ${message.author.username} con el mensaje ${message.content}`.red);
        }
        else {
          throw (e);
        }
      }
    }
  }
}

module.exports.data = {
    module: "bot",
    name: "help"
}

module.exports.help = async (bot, message, transsv, nickcmds, db) => {
  let embed = new Discord.RichEmbed()
    .setTitle(transsv.help.help.title)
    .setDescription(transsv.help.help.description)
    .addField(transsv.use, "```" + transsv.help.morehelp + "```", true)
    .setFooter(transsv.helpfooter, message.author.avatarURL)
    .setColor(bot.color);
  message.channel.send(embed)
}