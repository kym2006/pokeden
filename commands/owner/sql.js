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
    const res = await bot.pool.query(code);

    if (res.rows.length === 0) {
      message.channel.createMessage({
        embed: {
          description: 'No results to fetch.',
          color: bot.config.colors.primary
        }
      });
      return;
    }

    message.channel.createMessage({
      embed: {
        description: `\`\`\`${res.rows
          .map(row => JSON.stringify(row))
          .join('\n')
          .replace(new RegExp('`', 'g'), `\`${String.fromCharCode(8203)}`)
          .substr(0, 2000)}\`\`\``,
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
  name: 'sql',
  aliases: [],
  usage: 'sql <code>',
  description: 'Evaluate SQL.',
  permLevel: 10
};
