const Discord = require('discord.js');
const booru = require('booru');

module.exports.run = async (bot,message,transsv,nickcmds,db) => {
  var nsfwarray = ["e6","hypnohub.net","hypohub","hypo","hh","danbooru.donmai.us","danbooru","dan","db","tbib.org","tb","tbib","big","konachan.com","konac","kcom","kc","yande.re","yandere","yand","yd","gelbooru.com","gelbooru","gel","gb","rule34.xxx","rule34","r34","xbooru.com","xbooru","xb","youhate.us","youhate","you","yh","rule34.paheal.net","paheal","pa","lolibooru.moe","lolibooru","loli","lol","lb","derpibooru.org","derpibooru","derpi","derp","db"];
  var sfwarray = ["konachan.net","kn","konan","knet","safebooru.org","sb","safe","safebooru","dollbooru.org","do","doll","dollbooru"];
  var sitesarray = ["hypnohub.net","hypohub","hypo","hh","danbooru.donmai.us","danbooru","dan","db","konachan.com","konac","kcom","kc","yande.re","yandere","yand","yd","gelbooru.com","gelbooru","gel","gb","rule34.xxx","rule34","r34","xbooru.com","xbooru","xb","youhate.us","youhate","you","yh","rule34.paheal.net","paheal","pa","lolibooru.moe","lolibooru","loli","lol","lb","derpibooru.org","derpibooru","derpi","derp","db","konachan.net","kn","konan","knet","safebooru.org","sb","safe","safebooru","tbib.org","tb","tbib","big","dollbooru.org","do","doll","dollbooru"];
  var salsa = "";
  var clasification ="";
  var imagelink ="";
    function sendimg (message,transsv,img) {
        if(img.common.source){
            salsa = img.common.source
        }
        else {
            salsa = transsv.booru.nosource
        }
        switch(img.common.rating){
            case "s":
            clasification = transsv.booru.ratings.s
            break;
            case "q":
            clasification = transsv.booru.ratings.q
            break;
            case "e":
            clasification = transsv.booru.ratings.e
            break;
            case "u":
            clasification = transsv.booru.ratings.u
            break;
        }
        imagelink=img.common.file_url.split(" ").join("");
        let embed = new Discord.RichEmbed()
            .setDescription(`${transsv.booru.hereisurimg} <@${message.author.id}>`)
            .addField(transsv.booru.tags,img.common.tags,true)
            .addField(transsv.booru.rating,clasification,true)
            .addField(transsv.booru.source,salsa,true)
            .addField(transsv.booru.link2img,imagelink,true)
            .setImage(imagelink)
            .setColor(bot.color)
        message.channel.send(embed)
    }
    function sendimghypno (message,transsv,img) {
        if(img.common.source){
            salsa = img.common.source
        }
        else {
            salsa = transsv.booru.nosource
        }
        switch(img.common.rating){
            case "s":
            clasification = transsv.booru.ratings.s
            break;
            case "q":
            clasification = transsv.booru.ratings.q
            break;
            case "e":
            clasification = transsv.booru.ratings.e
            break;
            case "u":
            clasification = transsv.booru.ratings.u
            break;
        }
        imagelink=img.common.file_url.split(" ").join("");
        let embed = new Discord.RichEmbed()
            .setDescription(`${transsv.booru.hereisurimg} <@${message.author.id}>`)
            .addField(transsv.booru.tags,img.common.tags,true)
            .addField(transsv.booru.rating,clasification,true)
            .addField(transsv.booru.source,salsa,true)
            .addField(transsv.booru.link2img,imagelink,true)
            .addField("HypnoHub", transsv.booru.hypnocase)
            .setColor(bot.color)
        message.channel.send(embed)
        message.channel.send({file: imagelink})
    }
    
    if(!message.content.split(" ")[1]){
        if(!message.channel.nsfw){
            var randomsitesfw = Math.floor(Math.random() * (sfwarray.length - 0 +1)) + 0;
            booru.search(sfwarray[randomsitesfw],[],{limit: 1, random: true})
                .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            sendimg(message,transsv,image);
                        }
                    })
                    .catch(err => {
                        if (err.name === 'BooruError') {
                            console.log(err.message)
                            if(err.message == "You didn't give any images"){
                                message.reply(transsv.booru.weird)
                            }
                        } 
                        else {
                            console.log(err)
                        }
                    })
        }
        else{
            var randomsite = Math.floor(Math.random() * (sitesarray.length - 0 +1)) + 0;
            booru.search(sitesarray[randomsite],[],{limit: 1, random: true})
                .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            if(sitesarray[randomsite] == "hypnohub.net" || sitesarray[randomsite] == "hypohub" || sitesarray[randomsite] == "hypo" || sitesarray[randomsite] == "hh"){
                                sendimghypno(message,transsv,image);
                            }
                            else{
                                sendimg(message,transsv,image);
                            }
                        }
                    })
                    .catch(err => {
                        if (err.name === 'BooruError') {
                            console.log(err.message)
                            if(err.message == "You didn't give any images"){
                                message.reply(transsv.booru.weird)
                            }
                        } 
                        else {
                            console.log(err)
                        }
                    })
        }
    }
    if(message.content.split(" ")[1] && !message.content.split(" ")[2]){
        var is_site = 0
        for(var i=0;i<sitesarray.length;i++){
            if(message.content.split(" ")[1] == sitesarray[i]){
                if(message.channel.nsfw){
                    booru.search(message.content.split(" ")[1],[],{limit: 1, random: true})
                .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            if(message.content.split(" ")[1] == "hypnohub.net" || message.content.split(" ")[1] == "hypohub" || message.content.split(" ")[1] == "hypo" || message.content.split(" ")[1] == "hh"){
                                sendimghypno(message,transsv,image);
                            }
                            else{
                                sendimg(message,transsv,image);
                            }
                        }
                    })
                    .catch(err => {
                        if (err.name === 'BooruError') {
                            console.log(err.message)
                            if(err.message == "You didn't give any images"){
                                message.reply(transsv.booru.weird)
                            }
                        } 
                        else {
                            console.log(err)
                        }
                    })
                }
                else{
                    for(var k=0;k<nsfwarray.length;k++){
                        if(message.content.split(" ")[1] == nsfwarray[k]){
                            message.reply(transsv.booru.sorrynsfw)
                            return;
                        }
                    }
                    booru.search(message.content.split(" ")[1],[],{limit: 1, random: true})
                    .then(booru.commonfy)
                        .then(images => {
                            for (let image of images) {
                                sendimg(message,transsv,image);
                            }
                        })
                        .catch(err => {
                            if (err.name === 'BooruError') {
                                console.log(err.message)
                                if(err.message == "You didn't give any images"){
                                    message.reply(transsv.booru.weird)
                                }
                            } 
                            else {
                                console.log(err)
                            }
                        })
                }
                is_site = 1
                return;
            }
            if(i == sitesarray.length - 1 && is_site == 0){
                message.reply(transsv.booru.nopage)
            }
        }
    }
    if(message.content.split(" ")[1] && message.content.split(" ")[2]){
        is_site = 0
        for(i=0;i<sitesarray.length;i++){
            if(message.content.split(" ")[1] == sitesarray[i]){
                if(message.channel.nsfw){
                    booru.search(message.content.split(" ")[1],message.content.split(" ").slice(2),{limit: 1, random: true})
                .then(booru.commonfy)
                    .then(images => {
                        for (let image of images) {
                            if(message.content.split(" ")[1] == "hypnohub.net" || message.content.split(" ")[1] == "hypohub" || message.content.split(" ")[1] == "hypo" || message.content.split(" ")[1] == "hh"){
                                sendimghypno(message,transsv,image);
                            }
                            else{
                                sendimg(message,transsv,image);
                            }
                        }
                    })
                    .catch(err => {
                        if (err.name === 'BooruError') {
                            console.log(err.message)
                            if(err.message == "You didn't give any images"){
                                message.reply(transsv.booru.weird)
                            }
                        } 
                        else {
                            console.log(err)
                        }
                    })
                }
                else{
                    for(k=0;k<nsfwarray.length;k++){
                        if(message.content.split(" ")[1] == nsfwarray[k]){
                            message.reply(transsv.booru.sorrynsfw)
                            return;
                        }
                    }
                    booru.search(message.content.split(" ")[1],message.content.split(" ").slice(2),{limit: 1, random: true})
                    .then(booru.commonfy)
                        .then(images => {
                            for (let image of images) {
                                sendimg(message,transsv,image);
                            }
                        })
                        .catch(err => {
                            if (err.name === 'BooruError') {
                                console.log(err.message)
                                if(err.message == "You didn't give any images"){
                                    message.reply(transsv.booru.weird)
                                }
                            } 
                            else {
                                console.log(err)
                                message.reply(transsv.booru.sorrynsfw)
                            }
                        })
                }
                is_site = 1
                return;
            }
            if(i == sitesarray.length - 1 && is_site == 0){
                message.reply(transsv.booru.nopage)
            }
        }
    }

}

module.exports.data = {
    module: "booru",
    name: "booru"
}

module.exports.help = async (bot,message,transsv,nickcmds,db) => {
    let embed = new Discord.RichEmbed()
        .setTitle(transsv.booru.help.title)
        .setDescription(transsv.booru.help.description)
        .addField(transsv.booru.help.useforrandomimg,"```"+"-booru"+"```",true)
        .addField(transsv.booru.help.useforrandimginspecsite,"```"+`-booru ${transsv.booru.help.useforrandimginspecsitetext}`+"```",true)
        .addField(transsv.booru.help.useforspecimginspecsite,"```"+`-booru ${transsv.booru.help.useforspecimginspecsitetext}`+"```",true)
        .addField(transsv.booru.help.sfwsites,`**e926.net**: *e9*, *e926*\n**konachan.net**: *kn*, *konan*, *knet*\n**safebooru.org**: *sb*, *safe*, *safebooru*\n**dollbooru.org**: *do*, *doll*, *dollbooru*`)
        .addField(transsv.booru.help.nsfwsites,`**e621.net**: *e621*, *e6* (${transsv.booru.help.furry})\n**hypnohub.net**: *hypohub*, *hypo*, *hh* (${transsv.booru.help.hypnotism})\n**tbib.org**: *tb*, *tbib*, *big*\n**danbooru.donmai.us**: *danbooru*, *dan*, *db*\n**konachan.com**: *konac*, *kcom*, *kc*\n**yande.re**: *yandere*, *yand*, *yd*\n**gelbooru.com**: *gelbooru*, *gel*, *gb*\n**rule34.xxx**: *rule34*, *r34* (${transsv.booru.help.r34warn})\n**xbooru.com**: *xbooru*, *xb*\n**youhate.us**: *youhate*, *you*, *yh* (${transsv.booru.help.gelbooruagain})\n**rule34.paheal.net**: *paheal*, *pa* (${transsv.booru.help.r34again})\n**lolibooru.moe**: *lolibooru*, *loli*, *lol*, *lb* (${transsv.booru.help.dontlewdlolis})\n**derpibooru.org**: *derpibooru*, *derpi*, *derp*, *db*`)
        .setFooter(transsv.helpfooter,message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed)
}