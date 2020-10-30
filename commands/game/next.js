const getMessageFromCtx = async (userinfo, message) => {
  if (userinfo.location === 'Home') {
    if (userinfo.progress === 0) {
      const msg = await message.channel.createMessage({
        embed: {
          title: 'A new journey awaits...',
          description:
            "Child, you're now at the ripe old age of 10 years old to go and pursue your dream of being a Pokémaster. It's time for you to visit Professor Oak to get your starter Pokemon!",
          color: 65425,
          footer: {
            text: "React with ✅ to travel to Professor Oak's Lab!"
          },
          author: {
            name: 'Mum'
          }
        }
      });
      msg.addReaction('✅');
    } else if (userinfo.progress >= 1) {
      message.channel.createMessage({
        embed: { description: 'You have reached the end of the conversation at Home.', color: 65425 }
      });
    }
  } else if (userinfo.location === "Professor Oak's Lab") {
    if (userinfo.progress === 0) {
      message.channel.createMessage({
        embed: {
          title: 'Welcome young trainer!',
          description: "It's time for you to choose your starter Pokémon.",
          color: 65425,
          author: { name: 'Professor Oak' }
        }
      });
      // Implement choosing of pokemon here 'Excellent choice! Good luck on your adventure!';
    } else if (userinfo.progress === 1) {
      message.channel.createMessage('You have earned: HM01: Fly!');
    } else if (userinfo.progress >= 2) {
      message.channel.createMessage({
        embed: {
          title: 'Goodbye...',
          description: "I've done all that I can do. It is time for you to go out and fulfill your own mission.",
          color: 65425,
          author: { name: 'Professor Oak' }
        }
      });
    }
  }
};

exports.run = async (bot, message) => {
  getMessageFromCtx(bot.playerdb[message.author.id], message);
  bot.playerdb[message.author.id].progress += 1;
};

exports.help = {
  name: 'next',
  aliases: ['continue'],
  usage: 'next',
  description: 'Tells the user how to continue.',
  permLevel: 0
};
