const { Schema, model } = require("mongoose");

let userSchema = new Schema({
	idU: { type: String },

	registro: { type: Boolean, default: false },
  /* Misc */
  registrar: { type: Boolean, default: false },
  /* Economia */
  coins: { type: Number, default: 0 },
  daily: { type: Number, default: 0 },
  Ecoins: { type: Number, default: 0 },
  /* Insignias */
  beta: { type: String, default: "" },
  /* RPG */
  hunt: { type: Number, default: 0 },
  area: { type: Number, default: 1 },
  life: { type: Number, default: 100 },
  ataque: { type: Number, default: 1 },
  defesa: { type: Number, default: 1 },
  Exp: {
    xp: { type: Number, default: 1 },
    level: { type: Number, default: 1 },
    nextLevel: { type: Number, default: 100 },
    id: { type: String, default: "null" },
    user: { type: String, default: "null" },
  },
  /* Pets */
  coruja: { type: Number, default: 100 },
  pet: { type: Boolean, default: false },
  petname: { type: String, default: "Não possui" }

  

})
module.exports = model('Users', userSchema);