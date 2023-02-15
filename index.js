const { Collection, Client, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const User = require("./src/DataBase/User.js")
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildInvites,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
});

client.commands = new Collection();

const Arraycommands = [];
  const Folderscommands = fs.readdirSync("./src/Commands");
  for (const folders of Folderscommands) {
    const Filescommands = fs.readdirSync(`./src/Commands/${folders}`);
    for (let files of Filescommands) {
      if (!files.endsWith(".js")) return;
      const command = require(`./src/Commands/${folders}/${files}`);
      Arraycommands.push(command);
      client.commands.set(command.name, command);
    }
  }

  const eventsFolders = fs.readdirSync("./src/Events");
  for (const folders of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./src/Events/${folders}`);
    for (const files of eventsFiles) {
      if (!files.endsWith(".js")) return;
      const eventos = require(`./src/Events/${folders}/${files}`);

      if (eventos.once) {
        client.once(eventos.name, (...args) =>
          eventos.execute(...args, client)
        );
      } else {
        client.on(eventos.name, (...args) => eventos.execute(...args, client));
      }
    }
  }

  client.once("ready", () => {
    client.guilds.cache.forEach((guild) => {
      guild.commands.set(Arraycommands);
    });
  });


client.login(process.env.TOKEN);
