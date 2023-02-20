const { Schema, model } = require('mongoose');

const guildSchema = new Schema({
  idS: { type: String },
  language: {
    type: String,
    default: 'pt-BR',
  },
});
module.exports = model('Guilds', guildSchema);
