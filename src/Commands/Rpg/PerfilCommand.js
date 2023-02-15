const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Guild = require('../../DataBase/Guild.js');
const User = require('../../DataBase/User.js');

module.exports = {
  name: 'perfil',
  description: '〔 🪐 - Rpg 〕› Comandos de RPG',
  options: [
    {
      name: 'ver',
      description: '〔 🪐 - Rpg 〕› Inicie sua jornada no mundo RPG!',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user',
          description: 'Informe o user',
          type: ApplicationCommandOptionType.User,
        },
      ],
    },
  ],

  async execute(client, interaction, emoji) {
    async function petCommands() {
      const Data = {
        author: await User.findOne({ idU: interaction.user.id }),
        guild: await Guild.findOne({ idS: interaction.guild.id }),
      };

      switch (interaction.options.getSubcommand()) {
        case 'ver': {
          const user = interaction.options.getUser('user') || interaction.user;

          const USER = await User.findOne({ idU: user.id });

          let ataque = USER.ataque;
          let defesa = USER.defesa;
          let life = USER.life;

          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(`${user.username} - Perfil`)
                .setDescription(
                  `
            __**ESTATÍSTICAS:**__
            - Força: **${ataque}**
            - Defesa: **${defesa}**
            - Vida: **${life}/100**
            __**PROGRESSO:**__
            - Nivel: **${Data.author.Exp.level}**
            - Xp: **${Data.author.Exp.xp}/${Data.author.Exp.nextLevel}**
            - Mundo: **${Data.author.area}**
            __**RIQUEZA**__
            - Coins* **${Data.author.coins}**
            - Cristais: **${Data.author.cristais}
            `
                )
                .setThumbnail(user.displayAvatarURL({ extension: 'png', size: 128 })),
            ],
          });

          break;
        }
      }
    }
    petCommands();
  },
};
