exports.run = async (bot, message, args) => {
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        const muteRole = message.guild.roles.find(role => role.name === "Mute");
        const membersWithRole = message.guild.roles.get(muteRole.id).members;

        membersWithRole.forEach(function(user) {
          user.removeRole(muteRole).catch(console.error);
          user.setVoiceChannel("540540766125293569").catch(console.error);
          user.setVoiceChannel(channel).catch(console.error);
        });
    }
    else {
        message.channel.send("Must be admin to use this command");
    }
}