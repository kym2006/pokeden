const permission = require('../utils/permission.js');

module.exports = async (bot, message) => {
  if (!message || message.author.id === bot.user.id || message.author.bot) return;

  let command;
  let args;
  const prefixes = [`<@${bot.user.id}>`, `<@!${bot.user.id}>`, bot.config.prefix];

  // eslint-disable-next-line no-restricted-syntax
  for (const prefix of prefixes) {
    if (message.content.startsWith(prefix)) {
      args = message.content.slice(prefix.length).trim().split(' ');
      command = args.shift().toLowerCase();
      break;
    }
  }

  if (!command) return;

  const cmd = bot.getCommand(command);

  if (!cmd) return;

  let permLevel = 0;
  const permOrder = permission.slice(0).sort((a, b) => (a.level < b.level ? 1 : -1));

  while (permOrder.length) {
    const currentLevel = permOrder.shift();
    if (currentLevel.check(message)) {
      permLevel = currentLevel.level;
      break;
    }
  }

  if (permLevel < cmd.help.permLevel) {
    message.channel.createMessage({
      embed: {
        title: 'Permission Denied',
        description: 'You do not have permission to use this command.',
        color: bot.config.colors.error
      }
    });
    return;
  }

  if (cmd.help.permLevel >= 9) {
    bot.createMessage(bot.config.channels.adminLog, {
      embed: {
        title: cmd.help.name,
        description: message.content,
        color: bot.config.colors.primary,
        author: {
          name: `${message.author.username}#${message.author.discriminator} (${message.author.id})`,
          icon_url: message.author.avatarURL
        },
        timestamp: new Date().toISOString()
      }
    });
  }

  message.permLevel = permLevel;

  cmd.run(bot, message, args);
};
