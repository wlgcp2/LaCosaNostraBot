module.exports = (bot) => {
    bot.loadCommand = (commandName) => {
        try {
            console.log(`Loading Command: ${commandName}`);
            const props = require(`../commands/${commandName}`);
            if (props.init) {
                props.init(bot);
            }
            bot.commands.set(props.help.name, props);
            // props.conf.aliases.forEach(alias => {
            //     bot.aliases.set(alias, props.help.name);
            // });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    };

    bot.unloadCommand = async (commandName) => {
        let command;
        if (bot.commands.has(commandName)) {
            command = bot.commands.get(commandName);
        } 
        // else if (bot.aliases.has(commandName)) {
        //     command = bot.commands.get(bot.aliases.get(commandName));
        // }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
    
        if (command.shutdown) {
            await command.shutdown(bot);
        }
        const mod = require.cache[require.resolve(`../commands/${commandName}`)];
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

    bot.setSchedule = async () => {
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
    };
    

};