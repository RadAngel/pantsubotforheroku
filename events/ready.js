const Discord = require('discord.js');

module.exports.eventrun = async (bot) => {
  
    console.log(`\n${bot.user.username} esta listo\n`.rainbow);
    console.log(`listo a las ${new Date().toLocaleString()}`.rainbow);
    bot.user.setPresence({game:{name:`OPERANDO DESDE EL AÑO 2077 | ${bot.prefix}help`},status: 'online'})
    try {
        // let link = await bot.generateInvite(["ADMINISTRATOR"]);
        // console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
}
