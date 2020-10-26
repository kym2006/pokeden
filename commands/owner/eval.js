exports.run = async (bot, message, args) => {
  const code = args.join(' ');

  if (!code) {
    message.channel.createMessage({
      embed: {
        description: 'Please supply something to evaluate.',
        color: bot.config.colors.error
      }
    });
    return;
  }

  try {
    let evaled = await eval(`(async () => { ${code} })()`);

    if (typeof evaled !== 'string') {
      evaled = require('util').inspect(evaled);
    }

    evaled = evaled
      .replace(new RegExp(bot.token.split(' ')[1], 'g'), '--TOKEN--')
      .replace(new RegExp('`', 'g'), `\`${String.fromCharCode(8203)}`);

    message.channel.createMessage({
      embed: {
        description: `\`\`\`js\n${evaled.substr(0, 2000)}\`\`\``,
        color: bot.config.colors.primary
      }
    });
  } catch (err) {
    message.channel.createMessage({
      embed: {
        title: '⚠ Error',
        description: `\`\`\`${err.toString().substr(0, 2000)}\`\`\``,
        color: bot.config.colors.error
      }
    });
  }
};

exports.help = {
  name: 'eval',
  aliases: [],
  usage: 'eval <code>',
  description: 'Evaluate code.',
  permLevel: 10
};
