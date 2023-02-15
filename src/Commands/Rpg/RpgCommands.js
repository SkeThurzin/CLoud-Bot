const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const Guild = require("../../DataBase/Guild.js");
const User = require("../../DataBase/User.js");

module.exports = {
  name: "rpg",
  description: "〔 🪐 - Rpg 〕› Comandos de RPG",
  options: [
    {
      name: "iniciar",
      description: "〔 🪐 - Rpg 〕› Inicie sua jornada no mundo RPG!",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "registrar",
      description: "〔 🪐 - Rpg 〕› Se registre-se para jogar para jogar!",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],

  async execute (client, interaction, emoji) {

    async function rpgCommands() {

    const Data = {
      author: await User.findOne({ idU: interaction.user.id }),
      guild: await Guild.findOne({ idS: interaction.guild.id })
    }
      
    switch (interaction.options.getSubcommand()) {
      case "registrar": {
        
      if (Data.author.registrar === false) {

        await User.findOneAndUpdate(
          { idU: interaction.user.id },
          { $set: { registrar: true }}
        )

        interaction.reply({ content: `${emoji.certo} **⇏** Você foi registrado no meu sistema, execute \`/rpg iniciar\`!`, ephemeral: true })

      } else {
        interaction.reply({ content: `${emoji.errado} **⇏** Você ja esta registrado em meu sistema!`, ephemeral: true })
      }

        break;
      }
      case "iniciar": {

        interaction.reply({ embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ extension: 'png', size: 128 })}`})
          .setDescription(`${emoji.nuvem} **⇏** Olá! ${interaction.user} Como você quer aprender sobre o meu RPG?`)
          .setColor(process.env.COLOR)
        ], components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("Guia")
            .setEmoji(emoji.guia)
            .setCustomId("guia")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setLabel(`Tutorial`)
            .setEmoji(emoji.tutorial)
            .setCustomId("tutorial")
            .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
            .setLabel(" ")
            .setDisabled(true)
            .setEmoji(emoji.home)
            .setCustomId("home")
            .setStyle(ButtonStyle.Danger),
          )
        ]})
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on("collect", async (interaction) => {
          if (interaction.customId === "guia") {
            await interaction.deferUpdate()

            interaction.editReply({ embeds: [
              new EmbedBuilder()
              .setTitle(`Bem-vindo ao meu RPG, ${interaction.user.username}`)
              .setDescription(`
              O objetivo desse jogo é **desvendar e explorar varios mundos** e para se tornar mais forte e **desbloquer novos comandos**.
              Há um total de **5** mundos e você esta na **${Data.author.area}**.
              
              __**COMO JOGAR**__

              - **Ganhe XP e COINS** com \`/quests\` e \`/hunt\` ambos ganham XP e COINS exceto o hunt que n ganha o dobro de XP. veja sua estatisticas e progresso \`/perfil\`
              
              __**ITENS E COINS**__

              - Obter itens com \`/pescar\` ou \`/hunt\`!
              - Gaste seus COINS no \`/shop\`.
              - Obetenha coins com \`/hunt\` e \`/daily\`.

              __**DUNGEONS E MUNDOS**__

              - Quando se sentir preparado utilize \`/dungeon\`! Se você derrotar o boss ira desbloquer os proximos niveis da dungeons e ficara cada vez mais dificil!
              - No total de niveis de cada dungeon existe **5** e de dungeons **10**.
              - Cada dungeon desbloqueada tera acesso a mais comandos e uma **dungeon mais dificil**.

              __**MAIS**__

              - Verifique todos os meus comando utilizando \`/help\`!

              Links: [Sevidor Oficial](https://www.google.com/) - [Discord TOS](https://discord.com/terms)
              `)
              .setColor(process.env.COLOR)
            ], components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel("Guia")
                .setEmoji(emoji.guia)
                .setCustomId("guia")
                .setDisabled(true)
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(`Tutorial`)
                .setEmoji(emoji.tutorial)
                .setCustomId("tutorial")
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(" ")
                .setEmoji(emoji.home)
                .setCustomId("home")
                .setStyle(ButtonStyle.Danger),
              )
            ]})
          } else if (interaction.customId === "tutorial") {
            await interaction.deferUpdate()

            interaction.editReply({ embeds: [
              new EmbedBuilder()
              .setColor(process.env.COLOR)
              .setTitle(`Bem-vindo ao meu RPG Tutorial, ${interaction.user.username}`)
              .setDescription("Para começar vamos lembrar seu objetivo que é subir de nivel e ficar forte e obter itens, vá ate as dungeons para completar missões e desbloquear novos mundos e comandos.\n Então vamos começar utilizando seu primeiro comando e tentar encontrar um monstro com \`/hunt\`. Boa Sorte!")
            ], components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel("Guia")
                .setEmoji(emoji.guia)
                .setCustomId("guia")
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(`Tutorial`)
                .setEmoji(emoji.tutorial)
                .setCustomId("tutorial")
                .setDisabled(true)
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(" ")
                .setEmoji(emoji.home)
                .setCustomId("home")
                .setStyle(ButtonStyle.Danger),
              )
            ]})
          } else if (interaction.customId === "home") {
            await interaction.deferUpdate()

            interaction.editReply({ embeds: [
              new EmbedBuilder()
              .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ extension: 'png', size: 128 })}`})
              .setDescription(`${emoji.nuvem} **⇏** Olá! ${interaction.user} Como você quer aprender sobre o meu RPG?`)
              .setColor(process.env.COLOR)
            ], components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setLabel("Guia")
                .setEmoji(emoji.guia)
                .setCustomId("guia")
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(`Tutorial`)
                .setEmoji(emoji.tutorial)
                .setCustomId("tutorial")
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setLabel(" ")
                .setEmoji(emoji.home)
                .setCustomId("home")
                .setStyle(ButtonStyle.Danger),
              )
            ]})
          }
        })

        break;
        }
      }
    }
    rpgCommands()
  },
};
