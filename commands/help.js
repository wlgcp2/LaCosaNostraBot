exports.run = async (bot, message, args) => {
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
              name: "*unmute",
              value: "Admin command. Remove mute rank from everybody"
            }
          ]
        }
    });
}