module.exports = async (bot, guild) => {
  bot.createMessage(bot.config.channels.botJoinLeave, {
    embed: {
      title: 'Server Leave',
      description: `${guild.name} (${guild.id})`,
      color: 0xff0000,
      footer: {
        text: `${bot.guilds.size} servers`
      },
      timestamp: new Date().toISOString()
    }
  });
};
