exports.userInDatabase = async (bot, userID) => {
  const res = await bot.pool.query('SELECT * FROM users WHERE id=$1', [userID]);
  return res.rows.length !== 0;
};

exports.guildInDatabase = async (bot, guildID) => {
  const res = await bot.pool.query('SELECT * FROM guilds WHERE id=$1', [guildID]);
  return res.rows.length !== 0;
};
