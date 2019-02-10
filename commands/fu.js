exports.run = async (bot, message, args) => {
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
}