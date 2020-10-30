const { exec } = require('child_process');

exports.run = async (bot, message, args) => {
  const code = args.join(' ');

  if (!code) {
    message.channel.createMessage({
      embed: {
        description: 'Please supply something to execute.',
        color: bot.config.colors.error
      }
    });
    return;
  }

  exec(code, (error, stdout, stderr) => {
    if (error) {
      message.channel.createMessage({
        embed: {
          title: '⚠ Error',
          description: `\`\`\`${error.toString().substr(0, 2000)}\`\`\``,
          color: bot.config.colors.error
        }
      });
      return;
    }

    if (!stdout && !stderr) {
      message.channel.createMessage({
        embed: {
          description: 'Nothing was returned.',
          color: bot.config.colors.primary
        }
      });
      return;
    }

    if (stdout) {
      message.channel.createMessage({
        embed: {
          description: `\`\`\`bash\n${stdout
            .replace(new RegExp('`', 'g'), `\`${String.fromCharCode(8203)}`)
            .substr(0, 2000)}\`\`\``,
          color: bot.config.colors.primary
        }
      });
    }

    if (stderr) {
      message.channel.createMessage({
        embed: { description: `\`\`\`${stderr.substr(0, 2000)}\`\`\``, color: bot.config.colors.error }
      });
    }
  });
};

exports.help = {
  name: 'bash',
  aliases: [],
  usage: 'bash <code>',
  description: 'Execute bash.',
  permLevel: 10
};
