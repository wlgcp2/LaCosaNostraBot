const Discord = require("discord.js");
const { promisify } = require("util");
const Enmap = require("enmap");
const readdir = promisify(require("fs").readdir);

const bot = new Discord.Client();
const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
bot.config = config;

require("./modules/functions.js")(bot);

bot.commands = new Enmap();

client.settings = new Enmap({name: "settings"});

const init = async () => {

    // LOAD COMMAND FILES
    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(cmdFile => {
        if (!cmdFile.endsWith(".js")) return;
        const response = bot.loadCommand(cmdFile);
        if (response) console.log(response);
    });


    // LOAD EVENT FILES
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(evtFile => {
        const eventName = evtFile.split(".")[0];
        console.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${evtFile}`);
        // Bind the client to any event, before the existing arguments
        // provided by the discord.js event. 
        // This line is awesome by the way. Just sayin'.
        bot.on(eventName, event.bind(null, bot));
    });

    bot.setSchedule();

    // LOGIN BOT
    bot.login(bot.config.token);
    
};

init();