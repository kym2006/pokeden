const { userInDatabase } = require('../../utils/checks.js');

exports.run = async (bot, message) => {
  if (!(await userInDatabase(bot, message.author.id))) {
    message.channel.createMessage({
      embed: {
        description: 'You have not registered for an account yet.',
        footer: {
          text: 'To register for an account, type `$register`'
        },
        color: 65425
      }
    });
    return;
  }
  const res = await bot.pool.query('SELECT * FROM users WHERE id=$1', [message.author.id]);
  const userInfo = JSON.parse(res.rows[0].info);
  const embed = {
    title: 'Profile & Stats',
    fields: [],
    thumbnail: {
      url: message.author.avatarURL
    },
    color: bot.config.colors.primary
  };
  Object.keys(userInfo).forEach(elem => {
    if (elem === 'pokedex') {
      embed.fields.push({
        name: 'Pokédex',
        value: `${userInfo[elem].length.toString()} Pokémon`,
        inline: true
      });
    } else {
      embed.fields.push({
        name: elem.charAt(0).toUpperCase() + elem.slice(1),
        value: Array.isArray(userInfo[elem]) ? JSON.stringify(userInfo[elem]) : userInfo[elem],
        inline: true
      });
    }
  });
  message.channel.createMessage({
    embed
  });
};

exports.help = {
  name: 'profile',
  aliases: [],
  usage: 'profile',
  description: 'View your profile.',
  permLevel: 0
};
