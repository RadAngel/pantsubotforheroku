const Discord = require('discord.js');

module.exports.run = async (bot, message, db, askisbot,idtoregister) => {
    var progress = {};
    progress['xp'] = 0;
    progress['lvl'] = 0;
    // console.log(progress);
    var customdata = {};
    var messagetoregister;
    var datatoregister;
    customdata['subtitle'] = "El/La usuario(a) de discord\nThe discord user";
    customdata['gender'] = "Desconocido\nUnknown";
    customdata['pm'] = "Soy demasiado flojo como para poner un mensaje personal\nI'm too lazy to put a personal message";
    customdata['color'] = "#ffffff";
    customdata['equipedbackgound'] = "undefined";
    customdata['equipedmedals'] = [];
    // console.log(customdata);
    if(message.author.id !== idtoregister){
        messagetoregister = "nope";
        datatoregister = "nope";
    }
    else{
        messagetoregister = message.content;
        datatoregister = message.createdAt.toLocaleString();
    }
    var lastmessage = {};
    lastmessage['content'] = message.content;
    lastmessage['date'] = message.createdAt.toLocaleString()
    // console.log(lastmessage);
    var lastmsgedited = {};
    lastmsgedited['oldcontent'] = "undefined";
    lastmsgedited['olddate'] = "undefined";
    lastmsgedited['newcontent'] = "undefined";
    lastmsgedited['newdate'] = "undefined";
    // console.log(lastmsgedited);
    var economy = {};
    economy['pantsucoins'] = 0;
    economy['pantsugems'] = 0; //1m pantsucoins
    economy['streak'] = 0;
    economy['lastdaily'] = "undefined";
    // console.log(lastmessage);
    var inventory = {};
    inventory['boxes'] = {};
    inventory.boxes['common'] = 0;
    inventory.boxes['rare'] = 0;
    inventory.boxes['ultrarare'] = 0;
    inventory.boxes['legendary'] = 0;
    inventory.boxes['mythical'] = 0;
    inventory['evboxes'] = {};
    inventory.evboxes['halloween'] = {};
    inventory.evboxes.halloween['common'] = 0;
    inventory.evboxes.halloween['rare'] = 0;
    inventory.evboxes.halloween['ultrarare'] = 0;
    inventory.evboxes.halloween['legendary'] = 0;
    inventory.evboxes.halloween['mythical'] = 0;
    inventory.evboxes['christmas'] = {};
    inventory.evboxes.christmas['common'] = 0;
    inventory.evboxes.christmas['rare'] = 0;
    inventory.evboxes.christmas['ultrarare'] = 0;
    inventory.evboxes.christmas['legendary'] = 0;
    inventory.evboxes.christmas['mythical'] = 0;
    inventory['pantsus'] = {};
    inventory.pantsus['common'] = 0;
    inventory.pantsus['rare'] = 0;
    inventory.pantsus['ultrarare'] = 0;
    inventory.pantsus['legendary'] = 0;
    inventory.pantsus['mythical'] = 0;
    inventory['evpantsus'] = {};
    inventory.evpantsus['halloween'] = {};
    inventory.evpantsus.halloween['common'] = 0;
    inventory.evpantsus.halloween['rare'] = 0;
    inventory.evpantsus.halloween['ultrarare'] = 0;
    inventory.evpantsus.halloween['legendary'] = 0;
    inventory.evpantsus.halloween['mythical'] = 0;
    inventory.evpantsus['christmas'] = {};
    inventory.evpantsus.christmas['common'] = 0;
    inventory.evpantsus.christmas['rare'] = 0;
    inventory.evpantsus.christmas['ultrarare'] = 0;
    inventory.evpantsus.christmas['legendary'] = 0;
    inventory.evpantsus.christmas['mythical'] = 0;
    inventory.medals = [];
    inventory.backgorunds = [];
    // console.log(inventory);
    var blacklisted = {};
    blacklisted['status'] = false;
    blacklisted['times'] = 0;
    // console.log(blacklisted);
    var is_bot = 0;
    if(askisbot){
        is_bot = 1;
        customdata['subtitle'] = "El bot de discord\nThe discord bot";
        customdata['gender'] = "Soy un bot, no tengo un genero definido a menos de que mi creador me lo establezca\nI am a bot, I do not have a defined gender unless my creator establishes it to me";
        customdata['pm'] = "Solo soy un bot de discord no se por que deberia tener un mensaje personal\nI'm only a discord bot idk why i must have a personal message";
        customdata['color'] = "#808080";
    }
    if(!idtoregister){
        idtoregister = message.author.id;
    }
    try{
        db.prepare(`INSERT INTO profiles (id, progress, customdata, economy, inventory, lastmessage, lastedited, blacklisted, is_bot) VALUES ('${idtoregister}', '${JSON.stringify(progress)}', '${JSON.stringify(customdata).replace(/'/g,"''")}', '${JSON.stringify(economy)}', '${JSON.stringify(inventory)}', '${JSON.stringify(lastmessage).replace(/'/g,"''")}', '${JSON.stringify(lastmsgedited)}', '${JSON.stringify(blacklisted)}', ${is_bot});`).run();
    }
    catch(err){
        console.log(err)
    }
    //id | id de usuario
    //progreso {xp,nivel}
    //datos-personalizables {subtitulo,genero,mp(mensaje-personal),color}
    //ultimo-mensaje {contenido,fecha}
    //ultimo-editado {viejo-contenido,nuevo-contenido,vieja-fecha,nueva-fecha}
    //economia {pantsucoins}
    //inventario {cajas:{comun,raro,ultra-raro,legendario,cajas-eventos:{halloween:{r,ur,lgn},navidad:{r,ur,lgn}}},pantsus:{rango1,rango...,rango10},fondos:{codigo,...},medallas:{codigo,...}}
    //bloqueado {estado,veces}

    //id | user id
    //progress {xp,level}
    //custom-data {subtitle,gender,pm(personal-message),color}
    //last-message {content,date}
    //last-edited {old-content,new-content,old-date,new-date}
    //economy {pantsucoins}
    //inventory {boxes:{common,rare,ultra-rare,legendary,event-box:{halloween:{r,ur,lgn},christmas:{r,ur,lgn}}},pantsus:{tier1,tier...,tier10},backgorunds:{code,...},medals:{code,...}}
    //banned {status,times}
}