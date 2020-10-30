exports.run = async (bot, message) => {
  try {
    const start = Date.now();
    const latency = Math.round(message.channel.guild.shard.latency * 10) / 10;
    const msg = await message.channel.createMessage({
      embed: {
        description: 'Checking latency...',
        color: bot.config.colors.primary
      }
    });
    let color = 0xff0000;
    if (latency < 100) color = 0x00ff00;
    else if (latency < 250) color = 0xffff00;
    msg.edit({
      embed: {
        title: 'Pong!',
        description: `Gateway latency: ${latency}ms.\nHTTP API latency: ${Math.round(Date.now() - start)}ms.`,
        color
      }
    });
  } catch {
    await message.channel.createMessage({
      embed: {
        title: 'Command Unavailable',
        description: 'This command cannot be used in direct message.',
        color: bot.config.colors.error
      }
    });
  }
};

exports.help = {
  name: 'ping',
  aliases: [],
  usage: 'ping',
  description: 'Pong! Get my latency.',
  permLevel: 0
};
