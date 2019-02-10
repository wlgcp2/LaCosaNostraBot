module.exports = async bot => {
    var dt = new Date();
    var utcDate = dt.toUTCString();
    
    console.log("\n\n======= Bot loaded <" + utcDate + "> ============");

    bot.user.setActivity('Use *help')
};