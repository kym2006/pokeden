module.exports = async (bot, err, id) => {
  bot.createMessage(bot.config.channels.botEvent, {
    embed: {
      title: `Shard ${id} Disconnected`,
      color: bot.config.colors.error,
      timestamp: new Date().toISOString()
    }
  });
};
