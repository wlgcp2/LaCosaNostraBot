module.exports = async (bot, error) => {
    console.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
  };