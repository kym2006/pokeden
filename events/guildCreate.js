module.exports = async (bot, guild) => {
  bot.createMessage(bot.config.channels.botJoinLeave, {
    embed: {
      title: 'Server Join',
      description: `${guild.name} (${guild.id})`,
      color: 0x00ff00,
      footer: {
        text: `${bot.guilds.size} servers`
      },
      timestamp: new Date().toISOString()
    }
  });
};
