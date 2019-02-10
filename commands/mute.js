exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        const members = channel.members;
        const muteRole = message.guild.roles.find(role => role.name === "Mute");

        members.forEach(function(user) {
          if (!user.hasPermission("ADMINISTRATOR")) {
            user.addRole(muteRole).catch(console.error);
            user.setVoiceChannel("540540766125293569").catch(console.error);
            user.setVoiceChannel(channel).catch(console.error);
          }
        });
      }
      else {
        message.channel.send("Must be admin to use this command");
      }
}