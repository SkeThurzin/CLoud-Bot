const User = require('../../DataBase/User');
const Guild = require('../../DataBase/Guild');
const chalk = require('chalk');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const commandName = interaction.commandName;
      const command = client.commands.get(commandName);

      if (command) {
        if (command.requireDatabase) {
          interaction.guild.db =
            (await client.db.guilds.findById(interaction.guild.id)) ||
            new client.db.guilds({ idS: interaction.guild.id });
        }

        const guild = await Guild.findOne({ idS: interaction.guild.id });
        const user = await User.findOne({ idU: interaction.user.id });

        if (!guild) {
          await Guild.create({ idS: interaction.guild.id });
        } else if (!user) {
          await User.create({ idU: interaction.user.id }, { $set: { registro: true } });
        } else if (user.registrar === false) {
          interaction.reply(
            `Opss! Não posso executar meu comandos pq você não esta registrado. Utilize </rpg registrar:1066897272790601828>`
          );
        }
        const lang = require(`../../languages/${guild.language}`);
        const emoji = require('../../utils/emojis.js');
        console.log(
          chalk.blue(
            `User: ${interaction.user.tag} - UserID: ${interaction.user.id} - Server: ${interaction.guild} - ServerID: ${interaction.guild.id} - Comando: ${command.name}`
          )
        );
        if (!command) return;
        command.execute(client, interaction, emoji, lang);
      }
    }
  },
};
