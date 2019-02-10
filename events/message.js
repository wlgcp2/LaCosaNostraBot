module.exports = async (bot, message) => {

  // Remove music commands 
  if ((message.content.startsWith("!") || message.content.startsWith("-")) &&  message.channel.id != "540507129962823721"){    
      setTimeout(function() {
          message.channel.bulkDelete(2);
      }, 500); 
  }

  // CHECK IF BOT MENTION
  const prefixMention = new RegExp(`^<@!?${bot.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
      let sender = message.member.user;
      return message.reply(`No fuck you ${sender}`);
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(bot.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  // Grab the command data from the client.commands Enmap
  const cmd = bot.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(bot, message, args);
};