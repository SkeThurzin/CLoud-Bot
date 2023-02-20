const { loadImage, registerFont, createCanvas, Canvas } = require('canvas');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
registerFont('./src/fonts/black.ttf', { family: 'Segoe UI Black' });
registerFont('./src/fonts/helsinki.ttf', { family: 'helsinki' });
registerFont('./src/fonts/regular.ttf', { family: 'regular' });

module.exports = {
  name: 'inventario',
  description: '〔 🪐 - Rpg 〕› Veja seus itens e estatisticas.',
  options: [],

  async execute(client, interaction) {
    
  },
};
