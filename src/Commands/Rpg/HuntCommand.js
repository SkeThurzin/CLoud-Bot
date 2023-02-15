const { EmbedBuilder } = require("discord.js");
const { extend } = require('dayjs');
const duration = require('dayjs/plugin/duration');
extend(duration);
const Day = require('dayjs')
const Guild = require("../../DataBase/Guild.js");
const User = require("../../DataBase/User.js");

module.exports = {
  name: "hunt",
  description: "〔 🪐 - Rpg 〕› Caçe monstros e ganhe recompensas.",
  options: [],

  async execute(client, interaction, emoji) {

  async function huntCommand() {

  const Data = {
    author: await User.findOne({ idU: interaction.user.id }),
    guild: await Guild.findOne({ idS: interaction.guild.id }),
  };
  
  let cooldown = 3.6e+6;
  let hunt = Data.author.hunt;
  let time = cooldown - (Date.now() - hunt);

  if (hunt !== null && cooldown - (Date.now() - hunt) > 0) {
    return interaction.reply({ content: `${emoji.errado} **⇏** Você ja fez uma caça hoje, aguarde **${Day.duration(time).format("HH:mm:ss")}.**`, ephemeral: true });
  } else {

  if (Data.author.life <= 0) {
    interaction.reply({ content: `${emoji.errado} **⇏** Infelizmente você esta morto.`, ephemeral: true })
  } else {

  let randX = Math.floor(Math.random() * 100);
  let randC = Math.floor(Math.random() * 1000);

  function random(min, max) {
    const r = Math.random() * (max - min) + min;
    return Math.floor(r);
  }

  let randH = random(10, 50);
    
  sortear = [
    'Goblin',
    'Mímico',
    'Urso-Coruja',
    'Lich',
    'Drow',
    'Aranha gigante',
  ];

  mob = sortear[Math.floor(Math.random() * sortear.length)]

  var lifeAtual = Data.author.life;
  var coinsAtual = Data.author.coins;

  if (Data.author.life <= 10) {

  await User.findOneAndUpdate(
    { idU: interaction.user.id },
    { $set: { life: lifeAtual - 10 } },
  )

  interaction.reply({ content: `${emoji.errado} **⇏** **${interaction.user.username}** Encontro um ${mob} mais perdeu a luta por falta de **HP**`, ephemeral: false })
  interaction.channel.send({ embeds: [
    new EmbedBuilder()
    .setColor(process.env.COLOR)
    .setAuthor({ name: `${interaction.user.username} - Dica.`, iconURL: `${interaction.user.displayAvatarURL({extension: 'png', size: 128 })}` })
    .setDescription(`Como pode notar você acabou de **Morrer**, para se curar compre uma \`LifePotion\` em \`/shop\``)
    ]})
  } else {

  await User.findOneAndUpdate(
    { idU: interaction.user.id },
    { $set: { life: lifeAtual - randH, coins: coinsAtual + randC, hunt: Date.now() } },
  )

  const embed = new EmbedBuilder()
  .setTitle(`${interaction.user.username} Encontrou um(a) ${mob}`)
  .setDescription(`${emoji.certo} **⇏** Caçada concluida com sucesso veja suas perdas e recompensas.\n
  - Mob Name: **${mob}**
  - Recompensas: **${randC}** Coins e **${randX}** XP
  - Perdas: **${randH}** HP, Restam **${Data.author.life <= 0 ? "Morto" : Data.author.life}/100**`)
  .setColor(process.env.COLOR)
  .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ extension: 'png', size: 128 })}`})

  interaction.reply({ embeds: [embed] })
};
};
};
};
huntCommand()
},
};