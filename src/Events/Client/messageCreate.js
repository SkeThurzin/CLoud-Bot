const User = require('../../DataBase/User.js');
const Guild = require('../../DataBase/Guild.js');
const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message, client, emoji) {
    try {
      const guild = await Guild.findOne({
        idS: message.guild.id,
      });
      let user = await User.findOne({
        idU: message.author.id,
      });

      if (!user)
        await User.create({
          idU: message.author.id,
          idS: message.guild.id,
        });

      if (!guild) await Guild.create({ idS: message.guild.id });

      user = await User.findOne({
        idU: message.author.id,
      });

      let xp = user.Exp.xp;
      let level = user.Exp.level;
      let nextLevel = user.Exp.nextLevel * level;

      if (user.Exp.id == 'null') {
        await User.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { 'Exp.id': message.author.id } }
        );
      }

      let xpGive = Math.floor(Math.random() * 50) + 1;

      await User.findOneAndUpdate(
        { idU: message.author.id },
        {
          $set: {
            'Exp.xp': xp + xpGive,
            'Exp.user': message.author.tag,
          },
        }
      );

      if (xp >= nextLevel) {
        await User.findOneAndUpdate(
          { idU: message.author.id },
          { $set: { 'Exp.xp': 0, 'Exp.level': level + 1, 'Exp.nextLevel': nextLevel + 100 } }
        );

        if (message.author === message.author) {
          message.channel.send({
            content: `**Parabéns ${message.author}!! Você acaba de subir para o nível __${
              level + 1
            }__!**`,
          });
        } else if (client.user.id) {
          return;
        } else if (message.author.bot) {
          return;
        }
      }
    } catch (err) {
      if (err) console.error(err);
    }
  },
};
