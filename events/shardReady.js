module.exports = async (bot, id) => {
  bot.createMessage(bot.config.channels.botEvent, {
    embed: {
      title: `Shard ${id} Ready`,
      color: 0x00ff00,
      timestamp: new Date().toISOString()
    }
  });
};
