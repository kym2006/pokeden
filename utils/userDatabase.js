module.exports = async (bot, userID) => {
  const res = await bot.pool.query('SELECT * FROM users WHERE id=$1', [userID]);
  return res.rows.length !== 0;
};
