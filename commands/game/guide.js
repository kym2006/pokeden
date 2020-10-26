exports.run = async (bot, message) => {
  message.channel.createMessage({
    embed: { title: '✉ Inbox', description: `${message.author.mention} You got mail!`, color: 65425 }
  });
  const channel = await bot.getDMChannel(message.author.id);
  channel.createMessage({
    embed: {
      title: 'Guide to playing Pokébot',
      description:
        "Thank you for playing PokéBot! The game should not be too foreign to you especially if you played the actual games, but here is a brief outline of what to expect in this game.\n1. To get started, type $start.\n2. Once you get to Professor Oak's Lab, pick your starter Pokemon.\n3. Go to the first city you would encounter, which is Viridian City.\n4. Get your Pokemon to a high enough level to beat the first gym in Pewter City!\n5. Follow the instructions all around Kanto to get to the different gyms, and then finally to the Kanto Elite Four!",
      color: 65425,
      footer: {
        text: 'If you ever need this guide again, you can always type `$guide`!'
      }
    }
  });
};

exports.help = {
  name: 'guide',
  aliases: [],
  usage: 'guide',
  description: 'Displays the guide for the game in DMs.',
  permLevel: 0
};
