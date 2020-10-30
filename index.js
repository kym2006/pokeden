const Enmap = require('enmap');
const Eris = require('eris');
const { Pool } = require('pg');
const { readdirSync } = require('fs');
const config = require('./config.json');

const bot = new Eris(`Bot ${config.token}`, {
  compress: true,
  allowedMentions: {
    everyone: false,
    roles: true,
    users: true
  },
  getAllUsers: true,
  defaultImageFormat: 'png',
  defaultImageSize: 512,
  restMode: true
});

bot.config = config;
bot.commands = new Enmap();
bot.aliases = new Enmap();

bot.getCommand = command => {
  if (bot.commands.has(command)) {
    return bot.commands.get(command);
  }
  if (bot.aliases.has(command)) {
    return bot.getCommand(bot.aliases.get(command));
  }
  return null;
};

bot.loadCommands = () => {
  const files = readdirSync('./commands/');

  files.forEach(f => {
    if (f.startsWith('.')) return;

    const files2 = readdirSync(`./commands/${f}/`);
    files2.forEach(f2 => {
      if (f2.startsWith('.')) return;

      delete require.cache[require.resolve(`./commands/${f}/${f2}`)];
      const props = require(`./commands/${f}/${f2}`);

      bot.commands.set(props.help.name, {
        ...props,
        help: {
          category: f,
          ...props.help
        }
      });

      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
};

bot.loadEvents = () => {
  const files = readdirSync('./events/');

  files.forEach(f => {
    if (f.startsWith('.')) return;

    delete require.cache[require.resolve(`./events/${f}`)];
    const props = require(`./events/${f}`);

    const event = f.split('.')[0];
    bot.removeAllListeners(event);
    bot.on(event, props.bind(null, bot));
  });
};

bot.connectPostgres = () => {
  bot.pool = new Pool({
    connectionString: config.databaseURL
  });
};

bot.loadCommands();
bot.loadEvents();
bot.connectPostgres();

bot.connect();
