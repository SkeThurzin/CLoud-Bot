const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require('discord.js');
const Guild = require('../../DataBase/Guild.js');
const User = require('../../DataBase/User.js');

module.exports = {
  name: 'rpg',
  description: '〔 🪐 - Rpg 〕› Comandos de RPG',
  options: [
    {
      name: 'iniciar',
      description: '〔 🪐 - Rpg 〕› Inicie sua jornada no mundo RPG!',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'registrar',
      description: '〔 🪐 - Rpg 〕› Se registre-se para jogar para jogar!',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],

  async execute(client, interaction, emoji, lang) {
    async function rpgCommands() {
      const Data = {
        author: await User.findOne({ idU: interaction.user.id }),
        guild: await Guild.findOne({ idS: interaction.guild.id }),
      };

      switch (interaction.options.getSubcommand()) {
        case 'registrar': {
          if (Data.author.registrar === false) {
            await User.findOneAndUpdate(
              { idU: interaction.user.id },
              { $set: { registrar: true } }
            );

            interaction.reply({
              content: `${emoji.certo} **⇏** Você foi registrado no meu sistema, execute \`/rpg iniciar\`!`,
              ephemeral: true,
            });
          } else {
            interaction.reply({
              content: `${emoji.errado} **⇏** Você ja esta registrado em meu sistema!`,
              ephemeral: true,
            });
          }

          break;
        }
        case 'iniciar': {
          interaction.reply({
            embeds: [new EmbedBuilder().setDescription(lang.languageCommand.msg1)],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setLabel('BRASIL')
                  .setCustomId('br')
                  .setStyle(ButtonStyle.Success),
                new ButtonBuilder().setLabel('EUA').setCustomId('en').setStyle(ButtonStyle.Danger)
              ),
            ],
          });

          const filter = (i) => i.user.id === interaction.user.id;
          const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000,
          });

          collector.on('collect', async (interaction) => {
            if (interaction.customId === 'guia') {
              await interaction.deferUpdate();

              interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setTitle(`${lang.rpgCommand.title}, ${interaction.user.username}`)
                    .setDescription(
                      `${lang.rpgCommand.desc2}**${Data.author.area}**.
                      ${lang.rpgCommand.desc}`
                    )
                    .setColor(process.env.COLOR),
                ],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel('Guia')
                      .setEmoji(emoji.guia)
                      .setCustomId('guia')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(`Tutorial`)
                      .setEmoji(emoji.tutorial)
                      .setCustomId('tutorial')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(' ')
                      .setEmoji(emoji.home)
                      .setCustomId('home')
                      .setStyle(ButtonStyle.Danger)
                  ),
                ],
              });
            } else if (interaction.customId === 'tutorial') {
              await interaction.deferUpdate();

              interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(process.env.COLOR)
                    .setTitle(`${lang.rpgCommand.title} Tutorial, ${interaction.user.username}`)
                    .setDescription(`${lang.rpgCommand.tutorial}`),
                ],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel('Guia')
                      .setEmoji(emoji.guia)
                      .setCustomId('guia')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(`Tutorial`)
                      .setEmoji(emoji.tutorial)
                      .setCustomId('tutorial')
                      .setDisabled(true)
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(' ')
                      .setEmoji(emoji.home)
                      .setCustomId('home')
                      .setStyle(ButtonStyle.Danger)
                  ),
                ],
              });
            } else if (interaction.customId === 'home') {
              await interaction.deferUpdate();

              interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setAuthor({
                      name: `${client.user.username}`,
                      iconURL: `${client.user.displayAvatarURL({ extension: 'png', size: 128 })}`,
                    })
                    .setDescription(
                      `${emoji.nuvem} **⇏** ${lang.misc} ${interaction.user} ${lang.rpgCommand.sla}`
                    )
                    .setColor(process.env.COLOR),
                ],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel('Guia')
                      .setEmoji(emoji.guia)
                      .setCustomId('guia')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(`Tutorial`)
                      .setEmoji(emoji.tutorial)
                      .setCustomId('tutorial')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(' ')
                      .setEmoji(emoji.home)
                      .setCustomId('home')
                      .setStyle(ButtonStyle.Danger)
                  ),
                ],
              });
            } else if (interaction.customId === 'br') {
              await interaction.deferUpdate();

              await User.findOneAndUpdate(
                {
                  idU: interaction.user.id,
                },
                {
                  $set: {
                    language: 'pt-BR',
                  },
                }
              );

              interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setAuthor({
                      name: `${client.user.username}`,
                      iconURL: `${client.user.displayAvatarURL({ extension: 'png', size: 128 })}`,
                    })
                    .setDescription(
                      `${emoji.nuvem} **⇏** Olá! ${interaction.user} Como você quer aprender sobre o meu RPG?`
                    )
                    .setColor(process.env.COLOR),
                ],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel('guia')
                      .setEmoji(emoji.guia)
                      .setCustomId('guia')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(`tutorial`)
                      .setEmoji(emoji.tutorial)
                      .setCustomId('tutorial')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(' ')
                      .setDisabled(true)
                      .setEmoji(emoji.home)
                      .setCustomId('home')
                      .setStyle(ButtonStyle.Danger)
                  ),
                ],
              });
            } else if (interaction.customId === 'en') {
              await interaction.deferUpdate();

              await User.findOneAndUpdate(
                {
                  idU: interaction.user.id,
                },
                {
                  $set: {
                    language: 'en-US',
                  },
                }
              );

              interaction.editReply({
                embeds: [
                  new EmbedBuilder()
                    .setAuthor({
                      name: `${client.user.username}`,
                      iconURL: `${client.user.displayAvatarURL({ extension: 'png', size: 128 })}`,
                    })
                    .setDescription(
                      `${emoji.nuvem} **⇏** Hello! ${interaction.user} How do you want to learn about my RPG?`
                    )
                    .setColor(process.env.COLOR),
                ],
                components: [
                  new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                      .setLabel('guide')
                      .setEmoji(emoji.guia)
                      .setCustomId('guia')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(`tutorial`)
                      .setEmoji(emoji.tutorial)
                      .setCustomId('tutorial')
                      .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                      .setLabel(' ')
                      .setDisabled(true)
                      .setEmoji(emoji.home)
                      .setCustomId('home')
                      .setStyle(ButtonStyle.Danger)
                  ),
                ],
              });
            }
          });

          break;
        }
      }
    }
    rpgCommands();
  },
};
