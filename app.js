//Dependencies
const Discord = require('discord.js');
const client = new Discord.Client();
const search = require('youtube-search');
const accents = require('remove-accents');
const Downloader = require("./downloader");
const dl = new Downloader();
const booru = require('booru')
const nani = require('nani').init('925', 'NOkmzD3T4UWRB6mAKDdY8ANyPVhBKw8bMl5f0S7n');
const moment = require('moment')
const Db = require('./mongo');
const mongo = new Db();
const ObjectID = require('mongodb').ObjectID
//Bot's 
const token = 'MzU3ODIxNTAzMTU4NDg0OTk0.Dj6adA.hnKlEtuLqj6ZNZK7Zk1b45DAn8I';
const me = '!'

//Music player
const mp3Path = 'C:/Users/redru/Documents/Discord/mp3/'
const opts = {maxResults: 2, key: 'AIzaSyBkDcWtth7A-ZJIy82Wg0vIgrKtCdwFWJo'};

//Movie search
const apikey = '&apikey=7512d6f2' 
const request = require('request');
 

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
        play : {
            action : 'ytPlay(message.content.substring(3))',
            desc : 'Play selected music'
        },
        quit : {
            msg : 'k bye',
            action : 'message.member.voiceChannel.leave();',
            desc : 'Leave the voice channel'
        },
        stop : {
            msg : 'Stopped playing',
            action : 'ytStop();',
            desc : 'Stop playing music'
        },
        pause : {
            msg : 'Paused',
            action : 'ytPause();',
            desc : 'Put the music on hold'
        },
        resume : {
            msg : 'Resumed',
            action : 'ytResume();',
            desc : 'Resume the music'
        },
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
        japanize : {
            action : 'japanizer(message.content.substring(9))',
            desc : 'debug'
        },
        money : {
            action :'moneyMari()',
            desc : 'Take my money !'
        },
        fukyu : {
            action :'fukyu()',
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
        '@Ima Test#8227' : {
            msg : 'Nani nani ?'
        } 
    }

    const consonnes = ['z','r','t','p','q','s','d','f','g','h','j','k','l','m','w','x','c','v','b','n']

    
    ytPlay = query => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                .then(connection => { 
                    search(query, opts, function(err, results) {
                        if(err) return console.log(err);
                        console.log(results[0], results[1]);
                        
                        let videoID = results[1].id 
                        let videoTitle = results[1].title
                        message.channel.send(videoTitle + " found")
                        dl.getMP3({videoId: videoID, name: `${videoTitle}.mp3`}, function(err,res){
                            if(err)
                                throw err;
                            else{
                                var dispatcher = connection.playFile(mp3Path + videoTitle +'.mp3');
                                dispatcher
                                dispatcher.on('error', e => {
                                console.log(e);
                                });
                            }
                        });
                    })
                })
                .catch(console.log);
            } else {
                message.channel.send('@everyone Soit pas con, rejoint un salon.');            
            }
    };

    ytStop = () => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                    var dispatcher = connection.playFile();
                    dispatcher.end()
                    message.member.voiceChannel.leave();
                })
                .catch(console.log);
            } else {
                message.channel.send('T\'es qui dans l\'game pour arrêter la musique sans être dans un salon ?');            
            }
    };  

    ytPause = () => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                    var dispatcher = connection.playFile();
                    dispatcher.pause()
                })
                .catch(console.log);
            } else {
                message.channel.send('Nice try, boi');            
            }
    };

    ytResume = () => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                    .then(connection => { // Connection is an instance of VoiceConnection
                    var dispatcher = connection.playFile();
                    dispatcher.destroyed()
                })
                .catch(console.log);
            } else {
                message.channel.send('Nice try, boi');            
            }
    };

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
    }//Recherche de film/série/anime
    
    
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
    
    steamid = (steamId) => {
        if (!message.guild) return;
        message.guild.fetchMember(message.author)
        .then(member => {
            let obj = {
                    steam_id : {
                        name : 'Steam ID',
                        value : steamId
                    }
                }
            mongo.insert(member.user.id, obj)
            message.channel.send('Steam ID saved. You can now use the `steamStuff` commands. ')
        })
    }

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
        let embed = {
            'image' : {
                'url' : 'https://imgur.com/a/FBEj60u'
            }
        }
        // message.channel.send('<a:money:475848031724503041>')
        message.channel.send(embed)
        .then(message => {
            message.react('a:money:475848031724503041')
            message.pin()
            // message.delete()
          }).catch(err => {
            console.log(err);
           });
    }

    booruSearch = query => {
        if (!message.guild) return;
        booru.search('gelbooru', [query], {limit: 1, random: true})
        .then(booru.commonfy)
        .then(images => {
        //Log the direct link to each image
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
            //It's a custom error thrown by the package
            console.log(err.message)
        } else {
            //This means I messed up. Whoops.
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

    fukyu = () => {
        if (!message.guild) return;
            if (message.member.voiceChannel) {
                message.member.voiceChannel.join()
                .then(connection => { 
                    let i = Math.floor(Math.random() * (3 - 1+ 1) ) + 1;
                    var dispatcher = connection.playFile(`${mp3Path}fukyu${i}.mp3`);
                    dispatcher
                    dispatcher.on('error', e => {
                    console.log(e);
                    });
                    dispatcher.on('end', () => {
                        message.member.voiceChannel.leave()
                    });
                })
                .catch(console.log);
            } else {
                message.channel.send('@everyone Soit pas con, rejoint un salon.');            
            }
    };

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
            tmp.name = `!${element.name}`
            tmp.value = element.desc
            fields.push(tmp)
        })

        embed = {fields};
        console.log(embed)
        message.channel.send({ embed })
    }








    //BS

    //Embed template
    test = () => {
        const embed = {
            "title": "title ~~(did you know you can have markdown here too?)~~",
            "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
            "url": "https://discordapp.com",
            "color": 16213584,
            "timestamp": "2018-08-06T05:25:18.835Z",
            "footer": {
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
              "text": "footer text"
            },
            "thumbnail": {
              "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "image": {
              "url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "author": {
              "name": "author name",
              "url": "https://discordapp.com",
              "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
            },
            "fields": [
              {
                "name": "🤔",
                "value": "some of these properties have certain limits..."
              },
              {
                "name": "😱",
                "value": "try exceeding some of them!"
              },
              {
                "name": "🙄",
                "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
              },
              {
                "name": "<:thonkang:219069250692841473>",
                "value": "these last two",
                "inline": true
              },
              {
                "name": "<:thonkang:219069250692841473>",
                "value": "are inline fields",
                "inline": true
              }
            ]
          };
          message.channel.send("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```", { embed });
    }

    japanizer = str => {
        consonnes.forEach(element => {
            str.replace(element, `${element}u`)
            if (element == 'r')
                str.replace(element, 'lu')
                console.log(str);
                
        })
        setTimeout(() => {
            message.channel.send(str)
        }, 100);

    }

    //Message parsé
    let str = accents.remove(message.content.toLowerCase())

    //Actions normales
    for(msg in answers) {
        if (str.includes(`${me}${msg}`)) {
            
            if (answers[msg].msg != null && answers[msg].msg != undefined) 
                message.channel.send(answers[msg].msg);
            
            if (answers[msg].action != null && answers[msg].action != undefined) 
                eval(answers[msg].action)
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