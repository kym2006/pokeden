const { userInDatabase } = require('../../utils/checks.js');

exports.run = async (bot, message) => {
  if (await userInDatabase(bot, message.author.id)) {
    message.channel.createMessage({
      embed: {
        description: 'You have already registered for an account.',
        footer: {
          text: 'If you would like to restart, use the `$delete` command first.'
        },
        color: 65425
      }
    });
    return;
  }

  message.channel.createMessage({
    embed: {
      title: 'Successful Registration of Account',
      description:
        'Thank you for registering an account! Your account has been successfully registered. We hope you enjoy your time here!',
      color: 65425,
      footer: {
        text: 'To proceed, type `$next`!'
      },
      author: {
        name: 'The PokeBot Team'
      },
      image: {
        url: 'https://i.redd.it/p0j4iwha2q351.png'
      }
    }
  });
  bot.pool.query('INSERT INTO users(id, info) VALUES($1, $2)', [
    message.author.id,
    '{ "level": 0, "location": 0, "progress": 0, "region": "Kanto", "pokedex": [], "money": 0, "items": [], "quests": [] }'
  ]);
};

exports.help = {
  name: 'register',
  aliases: [],
  usage: 'register',
  description: 'Registers your account to the game.',
  permLevel: 0
};
