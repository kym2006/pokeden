module.exports = async (bot, id) => {
  bot.createMessage(bot.config.channels.botEvent, {
    embed: {
      title: `Shard ${id} Resumed`,
      color: bot.config.colors.primary,
      timestamp: new Date().toISOString()
    }
  });
};
