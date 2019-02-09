const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
var schedule = require('node-schedule');
 
var dt = new Date();
var utcDate = dt.toUTCString();

bot.on("ready", () => {
  console.log("\n\n======= Bot loaded <" + utcDate + "> ============");
  bot.user.setActivity('Use *help')
});


bot.on("message", (message) => {

  // CHECK IF MUSIC COMMAND
  if ((message.content.startsWith("!") || message.content.startsWith("-")) &&  message.channel.id != "540507129962823721"){    
    setTimeout(function() {
      message.channel.bulkDelete(2);
    }, 500); 
  }

  // CHECK IF BOT MENTION
  if(message.mentions.users.first() == bot.user) {
    let sender = message.member.user;
    message.channel.send(`No fuck you ${sender}`);
  }

  // CHECK FOR PREFIX
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // PARSE INPUT
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {

    //#############################################
    //# MANTRA COMMAND
    //#############################################
    case "mantra":
      message.channel.send({embed: {
          color: 3447003,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          title: "La Cosa Nostra Till I Die.",
          description: "I'm not in the mood for the toys, or games, or kidding. I'm not in the mood for clans. I'm not in the mood for gangs. I'm not in the mood for none of that stuff there. This is gonna be La Cosa Nostra 'til I die. Be it an hour from now, or be it tonight, or a hundred years from now when I'm in jail. It's gonna be La Cosa Nostra. This ain't gonna be a bunch of your friends, they're gonna be friends of ours. It's gonna be the way I say it's gonna be, La Cosa Nostra. A Cosa Nostra. You might say, because a guy's nice to you, and I'm not talking about you, I'm just sayin' you might think it makes him a good guy. It makes him a motherfucker to me. It don't make him a good guy. It makes him a good guy if he's one of us and he proves he's part of us. And I'm the best judge of that, I think, right now. So you got a reason Lorenzo, say it. I love you, say it, but that's not the point. This thing here, I'm not so sure of the five guys that I'm puttin' in are the first five guys that should be going in. What can you do? I'm doing it because I want this thing to be proper. We got some guys that can preserve it and they'll be there forever. They won't be having secret fuckin' parties where people won't be allowed. That we don't want and that we don't need, that's for sure. I wanna see an effort. I gotta see an effort for a Cosa Nostra. How many of these guys come, come tell me I feel sorry you got trouble. I don't, I don't need that. I ain't got no trouble, I ain't got no trouble at all. I'm gonna be all right. They the ones who got the fuckin' trouble. And I don't mean the cops, I mean the people. The people who coulda made this a joke, you know what I mean. That's not a fuckin' joke guys. Even, even, even some guys, some people downstairs now who I know whose fucking stomach is rotten. I know whose stomach ain't rotten. I could smell it the way a dog senses when a guy's got fear."
        }
      });

      break;
    //#############################################
    

    //#############################################
    //# FUCK YOURSELF COMMAND
    //#############################################
    case "fu":
      if (!args.length) break;

      //const userID = message.author.id
      //const messageId = message.channel.fetchMessage();
      const targetUser = message.mentions.users.first();
      let srcChannel = message.channel;

      if (!targetUser) {
        message.channel.send(`Hey you`);
      }
      else {
        message.channel.send(`Hey ${targetUser}`);
      }

      message.delete();
      
      setTimeout(function() {
        srcChannel.send("Go fuck yaself");
      }, 3000);

      break;
    //#############################################


    //#############################################
    //# NOTIFY COMMAND
    //#############################################
    case "notify":
      if (message.member.hasPermission("ADMINISTRATOR")) {
        for (counter = 0; counter < 2; counter++) { 
          bot.channels.get("533975990301491202").send({embed: {
            color: 3447003,
            description: "@everyone Shit startin up. Join voice!"
          }});
        }
      }
      else {
        message.channel.send("Must be admin to use this command");
      }

      message.delete();
    
      break;
    //#############################################


    //#############################################
    //# MUTE COMMAND
    //#############################################
    case "mute":
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        const members = channel.members;
        const muteRole = message.guild.roles.find(role => role.name === "Mute");

        members.forEach(function(user) {
          if (!user.hasPermission("ADMINISTRATOR")) {
            user.addRole(muteRole).catch(console.error);
            user.setVoiceChannel("540540766125293569");
            user.setVoiceChannel(channel);
          }
        });
      }
      else {
        message.channel.send("Must be admin to use this command");
      }
    
      break;
    //#############################################


    //#############################################
    //# UNMUTE COMMAND
    //#############################################
    case "unmute":
      if (message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        const muteRole = message.guild.roles.find(role => role.name === "Mute");
        const membersWithRole = message.guild.roles.get(muteRole.id).members;

        membersWithRole.forEach(function(user) {
          user.removeRole(muteRole).catch(console.error);
          user.setVoiceChannel("540540766125293569");
          user.setVoiceChannel(channel);
        });
      }
      else {
        message.channel.send("Must be admin to use this command");
      }
    
      break;
    //#############################################


    //#############################################
    //# MY NAMA JEFF COMMAND
    //#############################################
    // case "jeff":
    // var audioPath = '/srv/discord/bot/audio/jeff.mp3'
    // playAudio(message, audioPath);
    
    //   break;
    //#############################################


    //#############################################
    //# HELP COMMAND
    //#############################################
    case "help":
      message.channel.send({embed: {
        color: 3447003,
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          title: "FamigliaBot Help",
          description: "Use * to execute a command.",
          fields: [{
              name: "*mantra",
              value: "La Cosa Nostra Till I Die."
            },
            {
              name: "*fu @user",
              value: "Go fuck yaself"
            },
            {
              name: "*notify",
              value: "Admin command. @everyone to get on"
            },
            {
              name: "*mute",
              value: "Admin command. Mute all members in your channel"
            },
            {
              name: "*mute",
              value: "Admin command. Remove mute rank from everybody"
            }
          ]
        }
      });

      break;
    //#############################################
    
    default:

      break;
  }
});


//#############################################
//# NOTIFICATION SCHEDULE
//#############################################
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(4, 6)];
rule.hour = 5;
rule.minute = 30;


var notify = schedule.scheduleJob(rule, function(){
  for (counter = 0; counter < 5; counter++) { 
    bot.channels.get("533975990301491202").send({embed: {
      color: 3447003,
      description: "@everyone Shit startin up. Join voice!"
    }});
  }
});
//#############################################
  
bot.login(config.token);