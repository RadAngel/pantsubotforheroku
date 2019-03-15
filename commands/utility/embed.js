const Discord = require('discord.js');

module.exports.run = async (bot, message, transsv, nickcmds, db) => {
    var termseparator = ";;";
    var imageattachedurl = 0;
    function createembed(messagearr, channel, message, imageattachedurl) {
        let embed = new Discord.RichEmbed()
        var separator = "::"
        var innerseparator = "<>"
        var fieldcounter = 0;
        var fieldfullreplier = 0;
        if (imageattachedurl) {
            embed.setImage(imageattachedurl)
        }
        try {
            messagearr.forEach(messagepart => {
                console.log(messagepart.match(/title(.*?)/i))
                if (messagepart.match(/title(.*?)/g)) {
                    console.log('añadiendo titulo')
                    // console.log(messagepart.split(separator)[1])
                    // console.log(messagepart.match(/::(.*?)/g))
                    embed.setTitle(messagepart.replace(/title::(.*?)/g,""))
                }
                else if (messagepart.split(separator)[0].includes('description')) {
                    embed.setDescription(messagepart.split(separator)[1])
                }
                else if (messagepart.split(separator)[0].includes('field')) {
                    if (fieldcounter <= 25) {
                        if (messagepart.split(separator)[1].split(innerseparator).length == 2) {
                            embed.addField(messagepart.split(separator)[1].split(innerseparator)[0], messagepart.split(separator)[1].split(innerseparator)[1])
                            fieldcounter += 1;
                        } else if (messagepart.split(separator)[1].split(innerseparator).length == 3) {
                            embed.addField(messagepart.split(separator)[1].split(innerseparator)[0], messagepart.split(separator)[1].split(innerseparator)[1], true)
                            fieldcounter += 1;
                        } else {
                            return message.reply(`error en el field ${fieldcounter + 1}, los campos obligatoriamente necesitan el titulo del campo y su contenido por ejemplo\nfield:titulo del campo,contenido del campo\nrevisa si no has olvidado una coma en este campo`).catch()
                        }
                    } else if (fieldcounter == 25 && !fieldfullreplier) {
                        message.reply('no puedes agregar mas de 25 campos a un embed, no te preocupes de todas formas cortare los exedentes').catch()
                        fieldfullreplier = 1;
                    }
                }
                else if (messagepart.split(separator)[0].includes('color')) {
                    embed.setColor(messagepart.split(separator)[1])
                }
                else if (messagepart.split(separator)[0].includes('author')) {
                    embed.setAuthor(messagepart.split(separator)[1])
                }
                else if (messagepart.split(separator)[0].includes('thumbnail')) {
                    embed.setThumbnail(messagepart.split(separator)[1])
                }
                else if (messagepart.split(separator)[0].includes('image') && !imageattachedurl) {
                    embed.setImage(messagepart.split(separator)[1])
                }
                else if (messagepart.split(separator)[0].includes('footer')) {
                    console.log(messagepart.split(separator)[1].split(innerseparator))
                    if (messagepart.split(separator)[1].split(innerseparator).length == 1) {
                        embed.setFooter(messagepart.split(separator)[1])
                    } else if (messagepart.split(separator)[1].split(innerseparator).length >= 2) {
                        embed.setFooter(messagepart.split(separator)[1].split(innerseparator)[0], messagepart.split(separator)[1].split(innerseparator)[1])
                    } else {
                        return message.reply('error en footer, ninguna parte de un embed puede ir vacia').catch(err => {})
                    }
                }
            });
            channel.send(embed).catch(err => console.log(err))
        } catch (err) {
            console.log(err)
        }
    }
    if (message.content.split(" ")[1] == "createmultiline") {
        if (message.mentions.channels.size) {
            if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
            if (message.content.includes(termseparator)) {
                var messagearr = message.content.split("\n")
                messagearr.shift()
                if (message.attachments.size) {
                    if (message.attachments.array()[0].url.includes("mp4") || message.attachments.array()[0].url.includes("webm")) {
                        return message.reply("nope, no puedes agregar un video a un embed, no sabes cuantas veces lo he intentado").catch()
                    } else if (message.attachments.array()[0].url.includes("mp3")) {
                        return message.reply("vaya, un archivo de audio, no creo que se pueda meter en un embed").catch()
                    } else if (message.attachments.array()[0].url.includes("jpg") || message.attachments.array()[0].url.includes("png") || message.attachments.array()[0].url.includes("gif")) {
                        imageattachedurl = message.attachments.array()[0].url
                    } else {
                        return message.reply('no puedo reconocer el tipo de archivo que has adjuntado, intenta que sea un jpg, png o gif').catch()
                    }
                }
                var newmessagearr = messagearr.join("\n").split(termseparator)
                console.log(newmessagearr)
                // console.log(messagearr.join("\n").split(termseparator))
                // console.log(message.mentions.channels.array()[0])
                createembed(newmessagearr, message.mentions.channels.array()[0], message, imageattachedurl)
            } else {
                messagearr = message.content.split(" ").slice(3).join(" ").split(",")
                messagearr.shift()
                if (message.attachments.size) {
                    if (message.attachments.array()[0].url.includes("mp4") || message.attachments.array()[0].url.includes("webm")) {
                        return message.reply("nope, no puedes agregar un video a un embed, no sabes cuantas veces lo he intentado").catch()
                    } else if (message.attachments.array()[0].url.includes("mp3")) {
                        return message.reply("vaya, un archivo de audio, no creo que se pueda meter en un embed").catch()
                    } else if (message.attachments.array()[0].url.includes("jpg") || message.attachments.array()[0].url.includes("png") || message.attachments.array()[0].url.includes("gif")) {
                        imageattachedurl = message.attachments.array()[0].url
                    } else {
                        return message.reply('no puedo reconocer el tipo de archivo que has adjuntado, intenta que sea un jpg, png o gif').catch()
                    }
                }
            }
            console.log(message.content.split('\n'))
        }
        else {

        }
    } else if (message.content.split(" ")[1] == "createoneline") {
        if (message.mentions.channels.size) {
            if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
            if (message.content.includes('\n')) {
                messagearr = message.content.split("\n")
                messagearr.shift()
                if (message.attachments.size) {
                    if (message.attachments.array()[0].url.includes("mp4") || message.attachments.array()[0].url.includes("webm")) {
                        return message.reply("nope, no puedes agregar un video a un embed, no sabes cuantas veces lo he intentado").catch()
                    } else if (message.attachments.array()[0].url.includes("mp3")) {
                        return message.reply("vaya, un archivo de audio, no creo que se pueda meter en un embed").catch()
                    } else if (message.attachments.array()[0].url.includes("jpg") || message.attachments.array()[0].url.includes("png") || message.attachments.array()[0].url.includes("gif")) {
                        imageattachedurl = message.attachments.array()[0].url
                    } else {
                        return message.reply('no puedo reconocer el tipo de archivo que has adjuntado, intenta que sea un jpg, png o gif').catch()
                    }
                }
                console.log(messagearr)
                // console.log(message.mentions.channels.array()[0])
                createembed(messagearr, message.mentions.channels.array()[0], message, imageattachedurl)
            } else {
                messagearr = message.content.split(" ").slice(3).join(" ").split(",")
                messagearr.shift()
                if (message.attachments.size) {
                    if (message.attachments.array()[0].url.includes("mp4") || message.attachments.array()[0].url.includes("webm")) {
                        return message.reply("nope, no puedes agregar un video a un embed, no sabes cuantas veces lo he intentado").catch()
                    } else if (message.attachments.array()[0].url.includes("mp3")) {
                        return message.reply("vaya, un archivo de audio, no creo que se pueda meter en un embed").catch()
                    } else if (message.attachments.array()[0].url.includes("jpg") || message.attachments.array()[0].url.includes("png") || message.attachments.array()[0].url.includes("gif")) {
                        imageattachedurl = message.attachments.array()[0].url
                    } else {
                        return message.reply('no puedo reconocer el tipo de archivo que has adjuntado, intenta que sea un jpg, png o gif').catch()
                    }
                }
            }
            console.log(message.content.split('\n'))
        }
        else {

        }
    }
    else if (message.content.split(" ")[1] == "createraw") {
        try{
        if (message.mentions.channels.size) {
            if (!message.mentions.channels.array()[0].permissionsFor(message.author.id).has('SEND_MESSAGES')) return message.reply('no puedes escribir en este canal')
            console.log(message.content.split("\n").slice(1).join("\n"))
            console.log(JSON.parse(message.content.split("\n").slice(1).join("\n")))
            let embed = new Discord.RichEmbed(JSON.parse(message.content.split("\n").slice(1).join("\n")))
            console.log(embed)
            message.mentions.channels.array()[0].send(embed)
            .catch(err => {
                console.log(err)
                if(err.message.includes('color')){
                    console.log(err.message.split(" ")[4].replace(/"/g,''))
                    embed.setColor(err.message.split(" ")[4].replace(/"/g,''))
                    message.mentions.channels.array()[0].send(embed).catch(error => console.log(error))
                }
            })
        }
        else {

        }
    } catch (err) {
        console.log(err)
    }
    }
    // if(message.content.split(" ").slice(1).join(" ")){
    //     description = message.content.split(" ").slice(1).join(" ")
    // } else {
    //     description = null;
    // }
    // if(message.attachments.size){
    //     arratt = message.attachments.array()
    //     if(arratt[0].url.includes("mp4") || arratt[0].url.includes("mov")){
    //         return message.reply('el formato del archivo no es compatible con un embed')
    //     } else {
    //         attach = arratt[0].url
    //     }
    // } else {
    //     image = null;
    // }
}

module.exports.data = {
    module: "utility",
    name: "embed"
}
module.exports.help = async (bot, message, transsv, nickcmds, db) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Embed")
        .setDescription('Este comando permite enviar un RichEmbed a un canal mencionado o en el canal donde es usado\nPara usar este comando necesitas el permiso **Enviar Mensajes** en el canal que quieras que aparezca')
        .addField('Opcciones de embed', 'Estos son usados despues del comando para definir que es lo que se quiere hacer\n' + "__create__: crea un nuevo embed\n__createraw__: usa un condigo embed de **discord.js** creado en una pagina\n__edit__: edita un embed ya existente\n__editraw__: usa un condigo embed de **discord.js** creado en una pagina para editar un embed ya existente\n__delete__: borra un embed enviado por mi")
        .addField('Opcciones de creación de embeds', "__title__::titulo (titulo del embed)\n__description__::descripción (descripción del embed)\n__color__::#000000 (color del embed, puedes ver mas con "
            + bot.prefix + "color)\n__thumbnail__::url de imagen/author (imagen pequeña de la esquina superior derecha, al escribir una url de una imagen se pondra ahi, si se escribe **author** se pondra la imagen del que envio el embed)\n"
            + "__footer__::pie de pagina||url de imagen/author (pie de pagina, es opcional la imagen **author**)\n__author__:texto de autor,url de imagen,url (este se ve hasta arriba de todo el embed, se puede escribir el enlace de una imagen o escribir **author** para poner la url del que envia el embed, tambien puede adjuntarse un enlace para hacer click en este texto)\n"
            + "__image__::url de imagen (permite meter una imagen mas grande que va en el centro del embed, si no se escribe, se usara la imagen adjunta en el mensaje del comando [la imagen adjunta sera prioridad])")
        .addField('Uso en una sola linea (dificil)', 'Es un poco complejo escribir esto y no olvidar un par de Plecas (| | [juntas]), un doble dos puntos(::) o un doble porcentaje (%%) recomiendo mas el uso del modo facil'
            + "```" + bot.prefix + "embed create #canal title::Titulo de embed%%description::Descripción del embed%%color::#000000%%thumbnail::author%%field::Titulo del campo||Contenido del campo" + "```" + "Si, no puedes poner espacios entre las comas")
        .addField('Uso en varias lineas (fácil)', "Este modo es mas sencillo debido a la visibilidad que tienes al escribir" + "```" + bot.prefix
            + "embed create\ntitle::Titulo de embed\ndescription::Descripción del embed\ncolor::#000000\nthumbnail::author\nfield::Titulo de campo||Contenido de campo" + "```" + "si no sabes como hacer el salto de linea prueba con shift+enter(intro en algunos lugares)")
        .addField('Uso para dioses (modo crudo[Raw])', "Este modo es utilizado para copiar y pegar codigos embed hechos en paginas, ten en cuenta que este bot esta hecho en **discord.js** asi que el objeto que escribas tiene que ser compatible con este lenguaje/libreria"
            + "```" + bot.prefix + 'embed createraw\n{\n"title":"tilulo de embed"\n"description":"descripción del embed"\n"color":234452\n}' + "```" + "En este tipo aplica el conocimiento de la libreria de **discord.js**, en este tipo no se tomara en cuenta la imagen adjunta al mensaje del comando")
        .addField('Formatos de image', '**__jpg, png y gif__**')
        .addField('Edición de embeds', "```" + bot.prefix + "removemassrole [ignoreBots,ignoreUsers(@user1,@user2)] <@Rol1> <@Rol2>" + "```")
        .setFooter(transsv.helpfooter, message.author.avatarURL)
        .setColor(bot.color);
    message.channel.send(embed).catch(err => console.log(err))
}