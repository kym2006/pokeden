exports.run = async (bot, message, args) => {
  const content = args.join(' ');

  if (!content) return;

  message.channel.createMessage(content);
  message.delete();
};

exports.help = {
  name: 'echo',
  aliases: ['say'],
  usage: 'echo <message>',
  description: 'Make me say something.',
  permLevel: 9
};
