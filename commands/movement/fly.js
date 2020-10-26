exports.run = async (bot, message, args) => {
  const destination = bot.locations[args[0]];
  if (!(message.author.id in bot.playerdb)) {
    message.channel.createMessage({
      embed: {
        description: 'Please register an account first with `$register`',
        color: 65533
      }
    });
    return;
  }
  if (!destination) {
    message.channel.createMessage({
      embed: {
        description: `You have to provide a destination to fly to. Do \`$help fly\` for more information.`,
        color: 65533
      }
    });
    return;
  }
  bot.playerdb[message.author.id].location = destination;
  message.channel.createMessage({
    embed: {
      description: `You are now at: ${destination}.`,
      color: 65533
    }
  });
};

exports.help = {
  name: 'fly',
  aliases: [],
  usage: 'fly <location>',
  description: 'Fly to a new place.',
  permLevel: 0
};
