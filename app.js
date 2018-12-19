//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const accents = require('remove-accents');
const booru = require('booru')
const nani = require('nani').init('925', 'NOkmzD3T4UWRB6mAKDdY8ANyPVhBKw8bMl5f0S7n');
const Db = require('./mongo');
const mongo = new Db();
const fs  = require('fs')
const ud = require('urban-dictionary')
var mongo_url = "mongodb+srv://admin:Pokebipe1@ferrisbot-kdphf.mongodb.net/test?retryWrites=true";
var mongomeh = require('mongodb').MongoClient;
var owjs = require('overwatch-js');

//Bot's 
const token = 'MzU3ODIxNTAzMTU4NDg0OTk0.Dj6adA.hnKlEtuLqj6ZNZK7Zk1b45DAn8I';
const me = '!'

//Music player
// const requestedAudioPath = 'C:/Users/Esteban/Documents/GitHub/Ferris/audio'
// const idolPath = 'C:/Users/Esteban/Documents/GitHub/Ferris/idols/'
const requestedAudioPath = '/home/bot/Ferris/audio'
const idolPath = '/home/bot/Ferris/idols/'
const opts = {maxResults: 2, key: 'AIzaSyBkDcWtth7A-ZJIy82Wg0vIgrKtCdwFWJo'};
// const mp3Path = 'C:/Users/Esteban/Documents/GitHub/Ferris/mp3/'

//Movie search
const apikey = '&apikey=7512d6f2' 
const request = require('request');
 
//Rocket League API
const rls = require('rls-api')
var rocketLeague = new rls.Client({
    token: "PVRPFDYU3QVKGNXXXOLLQ0QJHRJBP5YF"
});

client.on('ready', () => {
  console.log('My body is ready !');
});



client.on('message', message => {
    //Définition des fonctions basiques
    const answers = {
        hotel : {
            msg : 'Trivago',
            desc : 'Hotel ?'
        },
        oishi : {
            msg :'desu neeee~~ \n https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREwlTmfj5Ydlmc_WXbo-vGShi34lSLrHvYiT3fKGUTVtRYQWIK',
            desc : 'Oishi desho ?'
        },
        //// play : {
        ////     action : 'ytPlay(message.content.substring(3))',
        ////     desc : 'Play selected music'
        //// },
        quit : {
            msg : 'k bye',
            action : 'message.member.voiceChannel.leave();',
            desc : 'Leave the voice channel'
        },
        //// stop : {
        ////     msg : 'Stopped playing',
        ////     action : 'ytStop();',
        ////     desc : 'Stop playing music'
        //// },
        //// pause : {
        ////     msg : 'Paused',
        ////     action : 'ytPause();',
        ////     desc : 'Put the music on hold'
        //// },
        //// resume : {
        ////     msg : 'Resumed',
        ////     action : 'ytResume();',
        ////     desc : 'Resume the music'
        //// },
        search : {
            action : 'movieSearch(message.content.substring(7));',
            desc : 'Search a movie/serie/anime...'
        },
        tst : {
            action : 'tst(message.content.substring(4));',
            desc : 'debug'
        },
        paku : {
            msg : 'Paku ! ( ๑ÒωÓ๑) \n https://img.fireden.net/a/image/1503/79/1503798775501.gif',
            desc : 'Nom nom'
        },
        money : {
            action :'moneyMari()',
            desc : 'Take my money !'
        },
        joke : {
            action :'joke()',
            desc : 'It\'s joke !'
        },
        fukyu : {
            action :'fukyu()',
            desc : 'Ai-chan :3'
        },
        idol : {
            action :'idol(message.content.substring(6))',
            desc : 'Ai-chan :3'
        },
        help : {
            action :'help()',
            desc : 'Display all commands'
        },
        register : {
            action :'register()',
            desc : 'Sign in into Ferris\' database'
        },
        profile : {
            action :'profile()',
            desc : 'Display someone\'s data'
        },
        booru : {
            action :'booruSearch(message.content.substring(7))',
            desc : 'Recherche d\image'
        },
        an : {
            action :'anime(message.content.substring(4))',
            desc : 'debug'
        },
        hart : {
            msg : 'https://i.kym-cdn.com/photos/images/original/001/252/990/6f4.jpg',
            desc : 'mah hart mah sole'
        }, 
        test : {
            action : 'test()',
            desc : 'debug'
        },
        steamid : {
            action : 'steamid(message.content.substring(9))',
            desc : 'Save your Steam ID so it can be used retrieve data about bla bla bla'
        },
        blizzid : {
            action : 'blizzid(message.content.substring(8))',
            desc : 'Save your Blizzard ID so it can be used retrieve data about bla bla bla'
        },
        ow : {
            action : 'ow(message.content.substring(3))',
            desc : 'Get some OverWatch data about you or a specific user'
        },
        rl : {
            action : 'rl(message.content.substring(3))',
            desc : 'Get some Rocket League data about you or a specific user'
        },
        urb : {
            action : 'urb(message.content.substring(4))',
            desc : 'Get the definition of a term from Urban Dictionnary'
        },
        rdurb : {
            action : 'rdurb()',
            desc : 'Get the definition of a random term from Urban Dictionnary'
        },
        roulette : {
            action : 'roulette(message.content.substring(9))',
            desc : 'Pick a random element from user\'s choice. A comma must be used to separate the elements.'
        },
        retard : {
            action : 'retard(message.content.substring(7))',
            desc : 'Retardify a word or sentence.'
        },
        remindme : {
            action : 'remindme(message.content.substring(9))',
            desc : 'Set a reminder. Use either seconds (s), minutes (m) or hours (h). Example : remindme post meme; 10m'
        }
    }
    
    //Définition des fonctions spéciales
    const specials = {
        mmh : {
            msg : 'https://i.kym-cdn.com/photos/images/original/001/286/730/d76.gif',
        },

        hmm : {
            msg : 'https://media1.tenor.com/images/d8ff9629ade20e3fe0d95b919bdc96f4/tenor.gif?itemid=11140147'
        },
        ayy : {
            action : 'ayy()'
        },
        yoshiko : {
            msg : 'Yohane*'
        }
    }


    //Recherche de film/série/anime
    movieSearch = query => {
        if (!message.guild) return;
        name = query.replace(' ', '+')
        request(`http://www.omdbapi.com/?t=${name}${apikey}`, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            let embed = {
                'title': body.Title,
                'color': 16213584,
                'thumbnail': {
                  'url': body.Poster
                },
                'image': {
                  'url': body.Poster
                },
                'fields': [
                    {
                      'name' : '__Genres__',
                      'value': body.Genre
                    },
                    {
                      'name' : '__Episodes__',
                      'value': body.Runtime,
                      'inline' : true
                    },
                    {
                      'name' : '__Date de publication__',
                      'value': body.Released,
                      'inline' : true
                    },
                    {
                      'name' : '__Synopsis__',
                      'value': body.Plot
                    },
                ]
              };
              message.channel.send({ embed });
        });
    }
     
    register = () => {
        if (!message.guild) return;
        message.guild.fetchMember(message.author)
        .then(member => {
        let obj = {id : member.user.id}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                console.log(result);
                if (result[0] != null){
                    message.channel.send(`You are already registered.`)
                    return
                } else {
                    let data = {id : member.user.id}
                    mongo.insert(data)
                    message.channel.send(`You've registered successfully. Some of your data will now be saved, and used later for bot purpose.`)
                }
            });
        })
    }
    
    steamid = steamId => {
        if (!message.guild) return;
        message.guild.fetchMember(message.author)
        .then(member => {
        let obj = {id : member.user.id}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                console.log(result);
                if (result[0] == null ){
                    message.channel.send('You need to register first using the command `register`')
                    return
                }  else if (result[0].steam_id != null) {
                    message.channel.send(`You've already saved your Steam ID.`)
                    return
                } else {
                    let query = {
                        steam_id : {
                            name : 'Steam ID',
                            value : steamId
                        }
                    }
                // mongo.insert(member.user.id, obj)
                mongomeh.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("ferris");
                    var newvalues = { $set: query };
                    dbo.collection("profiles").updateOne(obj, newvalues, function(err, res) {
                      if (err) throw err;
                      console.log("1 user updated");
                      db.close();
                  });
                })
                message.channel.send('Steam ID saved. You can now use the `steamStuff` commands. ')
                }
            });
        })
    }

    blizzid = blizzId => {
        if (!message.guild) return;
        message.guild.fetchMember(message.author)
        .then(member => {
        let obj = {id : member.user.id}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                console.log(result);
                if (result[0] == null){
                    message.channel.send('You need to register first using the command `register`')
                    return
                } else if (result[0].blizz_id != null) {
                    message.channel.send('You\'ve already registered your Blizzard ID')
                    return
                } else {
                    let query = {
                        blizz_id : {
                            name : 'Blizzard ID',
                            value : blizzId.trim()
                        }
                    }
                // mongo.insert(member.user.id, obj)
                mongomeh.connect(mongo_url, { useNewUrlParser: true }, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("ferris");
                    var newvalues = { $set: query };
                    dbo.collection("profiles").updateOne(obj, newvalues, function(err, res) {
                      if (err) throw err;
                      console.log("1 user updated");
                      db.close();
                  });
                })
                message.channel.send('Blizzard ID saved. You can now use Blizzard related commands. ')
                }
            });
        })
    }

    ow = blizzId => {
        if (!message.guild) return;
        if (blizzId == "" || blizzId == undefined) {
            message.guild.fetchMember(message.author)
            .then(member => {
            let obj = {id : member.user.id}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                if (result[0] == null){
                    message.channel.send('You need to register first using the command `register`')
                    return
                } else if (result[0].blizz_id == null) {
                    message.channel.send('You need to register first using the command `blizzid <Your Blizzard ID>`')
                    return
                } else {
                    
                    owjs.search(result[0].blizz_id.value)
                    // .then((data) => console.dir(data[0]))
                    .then(data => {
                        let embed = {
                            'title': data[0].name,
                            'color': 16423965,
                            'thumbnail': {
                              'url': data[0].portrait
                            },
                            'image': {
                              'url': data[0].portrait
                            },
                            'fields': [
                                {
                                  'name' : '__Level__',
                                  'value': String(data[0].tier)+String(data[0].level),
                                  //   'value': data.tier+data.level
                                },
                            ]
                        };

                        message.channel.send({embed})
                        console.log(data[0].portrait)
                    })
                }
            })
        })
    }
}

    urb = query => {
        if (!message.guild) return;
        ud.term(query).then((result) => {
            const entries = result.entries
            message.channel.send(`**${entries[0].word}**`)
            message.channel.send(entries[0].definition.replace(/[\[\]']+/g, ''))
            message.channel.send(entries[0].example.replace(/[\[\]']+/g, ''))
          }).catch((error) => {
            console.error(error.message)
          })
    }

    rdurb = () => {
        ud.random().then((result) => {
            message.channel.send(`**${result.word}**`)
            message.channel.send(result.definition.replace(/[\[\]']+/g, ''))
            message.channel.send(result.example.replace(/[\[\]']+/g, ''))
          }).catch((error) => {
            console.error(error.message)
          })
    }

    profile = () => {
        message.channel.send('pls no use, it not yet done :c')
    }

    tst = query => {
        if (!message.guild) return;
        if (query != null && query != undefined) {
            let obj = {user : query}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                console.log(result);
            })
        } else {
            message.guild.fetchMember(message.author)
            .then(member => {
                let obj = {user : member.user.id}
                mongo.select(obj, function(err, result) {
                    if (err)
                        console.log(err);
                    console.log(result);
                })
            });
        }
    }

    moneyMari = () => {
        message.channel.send(`https://imgur.com/a/FBEj60u`)
        .then(message => {
            message.pin()
            // message.delete()
          }).catch(err => {
            console.log(err);
           });
    }

    joke = () => {
        message.channel.send(`https://i.kym-cdn.com/photos/images/original/001/150/620/d71.jpg`)
        .then(message => {
            message.pin()
            // message.delete()
          }).catch(err => {
            console.log(err);
           });
    }

    booruSearch = query => {
        if (!message.guild) return;
        booru.search('gelbooru', [query.replace(' ', '_')], {limit: 1, random: true})
        .then(booru.commonfy)
        .then(images => {
            for (let image of images) {
                let embed = {
                    'color': 4886754,
                    'image': {
                    'url': image.common.file_url
                    },
                };
                message.channel.send({ embed });
            }
        })
        .catch(err => {
            if (err.name === 'BooruError') {
                console.log(err.message)
                message.channel.send(`No results for '*${query}*'`)
            } else {
                console.log(err)
            }
        })
    }

    anime = query => {
        nani.get(`${query}`)
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    idol = idolName => {
        if (!message.guild) return;
        if (message.member.voiceChannel) {
            fs.readdir(idolPath, function(err, items) {
                if (err)
                    console.log(err)
                items.forEach(idol => {
                    if (idol == `${idolName}.mp3`) {
                        message.member.voiceChannel.join()      
                        .then(connection => { 
                            var dispatcher = connection.playFile(`${idolPath}${idol}`);   
                            setTimeout(() => {
                                dispatcher
                                dispatcher.on('error', e => {
                                console.log(e);
                                });
                                dispatcher.on('end', () => {
                                    setTimeout(() => {
                                        message.member.voiceChannel.leave()
                                    }, 500);
                                });
                            }, 500);
                        }).catch(error => console.log(error));
                    }
                });
            });
        } else {
            message.channel.reply('You have to be in a voice channel to do that.'); 
        }
    }

    fukyu = () => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                .then(connection => { 
                    let i = Math.floor(Math.random() * (3 - 1+ 1) ) + 1;
                    var dispatcher = connection.playFile(`${requestedAudioPath}/fukyu${i}.mp3`);
                    dispatcher
                    dispatcher.on('error', e => {
                    console.log(e);
                    });
                    dispatcher.on('end', () => {
                        setTimeout(() => {
                            message.member.voiceChannel.leave()
                        }, 500);
                    });
                })
                .catch(error => console.log(error));
            } else {
                message.channel.reply('You have to be in a voice channel to do that.');            
            }
    }

    roulette = query => {
        if (!message.guild) return;

        if (!query.includes(',')) {
            message.channel.send(`You must separate your entries with a *comma*`);
        } else {
            message.channel.send(`And the result is...`);
            let entries = query.split(',')
            let i = Math.floor(Math.random() * entries.length);
                let winner = entries[i].trim()
                message.channel.send(`\`${winner}\``);
                return
        }
    }

    retard = query => {
        if (!message.guild) return;

        step = query.replace(/[^a-zA-Z ]/g, "")
        splitted = step.split('')
        
        for (let i = 0; i < splitted.length; i += 2) {
            splitted[i] = splitted[i].toUpperCase();
        }
        
        for (let i = 1; i < splitted.length; i += 2) {
            splitted[i] = splitted[i].toLowerCase();
        }
            message.channel.send(splitted.join(''));
    }

    remindme = query => {
        if (!message.guild) return;

        let thing = query.split(';')[0].trim()
        let time = query.split(';')[1].trim()

        let duration = Number(time.substring(0, time.length-1))

        let unit = time.split('')[time.length-1]
        
        if (unit === 'h')
            duration *= 3600 * 1000
        else if (unit === 'm')
            duration *= 60 * 1000
        else if (unit === 's')
            duration *= 1000
        else
            return 'Please use a correct unit'

        setTimeout(() => {
            message.channel.send(`Hey ${message.author}, remember that "${thing}" ?`)
        }, duration);
    }

    help = () => {

        commands = []
        fields = []

        for (key in answers) {
            let command = {}
            command.name = key
            command.desc = answers[key].desc
            commands.push(command)
        }

        let embed = {}

        commands.forEach((element, index) => {
            let tmp = {}
            tmp.name = `${me}${element.name}`
            tmp.value = element.desc
            fields.push(tmp)
        })

        embed = {fields};
        message.channel.send({ embed })
    }

    rl = steamId => {
        if (!message.guild) return;
        if (steamId == "" || steamId == undefined) {
            message.guild.fetchMember(message.author)
            .then(member => {
            let obj = {id : member.user.id}
            mongo.select(obj, function(err, result) {
                if (err)
                    console.log(err);
                if (result[0] == null){
                    message.channel.send('You need to register first using the command `register`')
                    return
                } else if (result[0].steam_id == null) {
                    message.channel.send('You need to register first using the command `steamid <Your Steam ID>`')
                    return
                } else {
                    rocketLeague.getPlayer(result[0].steam_id.value, rls.platforms.STEAM, function(status, data){
                        if(status === 200){
                            let embed = {
                                'title': `${data.displayName}'s Rocket League stats`,
                                'color': 1665988,
                                'thumbnail': {
                                  'url': 'https://vignette.wikia.nocookie.net/rocketleague/images/f/f6/Rocketleague-logo.png/revision/latest?cb=20161207070401&format=original'
                                },
                                'image': {
                                  'url': data.avatar
                                },
                                'fields': [
                                    {
                                      'name' : '__Wins__',
                                      'value': data.stats.wins,
                                      //   'value': data.tier+data.level
                                        "inline": true,
                                    },
                                    {
                                      'name' : '__Goals__',
                                      'value': data.stats.goals,
                                      //   'value': data.tier+data.level
                                        "inline": true
                                    },
                                    {
                                      'name' : '__MVP__',
                                      'value': data.stats.mvps,
                                      //   'value': data.tier+data.level
                                        "inline": true
                                    },
                                    {
                                      'name' : '__Saves__',
                                      'value': data.stats.saves,
                                      //   'value': data.tier+data.level
                                        "inline": true
                                    },
                                    {
                                      'name' : '__Shots__',
                                      'value': data.stats.shots,
                                      //   'value': data.tier+data.level
                                        "inline": true
                                    },
                                    {
                                      'name' : '__Assists__',
                                      'value': data.stats.assists,
                                      //   'value': data.tier+data.level
                                        "inline": true
                                    },
                                ]
                            };
                                message.channel.send({embed})
                            } else {
                                console.log(`Can't get any data for specified user.`);
                            }
                        });
                    }
                },
            )}
        )}
    }

    ayy = () => {
        message.channel.send(`🇱 🇲 🇦 🇴 \n https://imgur.com/a/wm4aYTY`)
        .then(message => {
            message.react('🇱')
            setTimeout(() => {
                message.react('🇲')
                setTimeout(() => {
                    message.react('🇦')        
                    setTimeout(() => {
                        message.react('🇴')
                    }, 1000);
                }, 1000);
            }, 1000);
        })
            // message.delete()
          .catch(err => {
            console.log(err);
           });
    }




    //BS

    //Embed template
    test = () => {
        
            // Get messages
            message.channel.fetchMessages()
            .then(messages => console.log(messages.filter(m => m.author.id === message.author.id)))
            .catch(console.error);

            message.channel.fetchMessage('504520923752431642')
            .then(message => console.log(message.content))
            .catch(console.error)
        
    }

    //Message parsé
    let str = accents.remove(message.content.toLowerCase())

    //Actions normales
    for(msg in answers) {
        if (str.includes(`${me}${msg}`)) {
            if (message.content.split('')[0] == me) {
                let data = {command : message.content}
                mongo.insert(data, 'commands')
                
                if (answers[msg].msg != null && answers[msg].msg != undefined) 
                    message.channel.send(answers[msg].msg);
                
                if (answers[msg].action != null && answers[msg].action != undefined) 
                    eval(answers[msg].action)
                    return
            } else
                return
            }
    }

    //Actions spéciales
    for(msg in specials) {
        if (str.includes(msg)) {
            
            if (specials[msg].msg != null && specials[msg].msg != undefined) 
                message.channel.send(specials[msg].msg);
            
            if (specials[msg].action != null && specials[msg].action != undefined) 
                eval(specials[msg].action)
            return
        }
    }
});

client.login(token);

// profile = () => {
    //     if (!message.guild) return;
    //     message.guild.fetchMember(message.author)
    //     .then(member => {
    //     let obj = {user : member.user.id}
    //     mongo.select(obj, function(err, result) {
    //         if (err)
    //             console.log(err);
    //         console.log(result);

    //         if (result[0] == null){
    //             message.channel.send('You need to register first. Use the `register` command to do so.')
    //             return
    //         } else {
                
    //             let embed = {}
    //             fields = []
        
    //             result.forEach((element, index) => {
    //                 let tmp = {}
    //                 tmp.name = Object.keys(element)[1]
    //                 tmp.value = element[tmp.name]
    //                 fields.push(tmp)
    //             })

                
        
    //             embed = {fields};
    //             embed.image = {}
    //             embed.image.url = client.users.get(member.user.id).avatarURL
    //             console.log(embed)
    //             message.channel.send({ embed })
    //         }
    //     })
    // })
    //     // message.channel.send(client.users.get('183667960160845824').avatarURL)
    // }