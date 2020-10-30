const ReactionHandler = require('eris-reactions');
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

  const msg = await message.channel.createMessage({
    embed: {
      title: '⚠ Warning',
      description: 'Are you sure you want to continue with this? You will lose all your progress.',
      color: 65425,
      footer: {
        text: 'React with ✅ to confirm.'
      },
      author: {
        name: 'The PokeBot Team'
      }
    }
  });
  msg.addReaction('✅');

  const reaction = await ReactionHandler.collectReactions(msg, userID => userID === message.author.id, {
    maxMatches: 1,
    time: 30000
  });

  if (reaction.length === 0) {
    message.channel.createMessage({
      embed: {
        description: 'The confirmation has timed out and your account was not deleted.',
        color: bot.config.colors.primary
      }
    });
  } else if (reaction[0].emoji.name === '✅') {
    bot.pool.query('DELETE FROM users WHERE id=$1', [message.author.id]);
    message.channel.createMessage({
      embed: { description: 'Successfully deleted your account.', color: bot.config.colors.primary }
    });
  } else if (reaction.length !== 0) {
    message.channel.createMessage({
      embed: {
        description: 'You did not react with the correct emoji and your account was not deleted.',
        color: bot.config.colors.primary
      }
    });
  }
};

exports.help = {
  name: 'delete',
  aliases: [],
  usage: 'delete',
  description: 'Deletes your account.',
  permLevel: 0
};
