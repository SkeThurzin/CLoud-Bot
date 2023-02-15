const { EmbedBuilder } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: "ping",
  description: "Veja meu ping.",
  options: [],

  async execute (client, interaction) {
    interaction
      .reply({
        embeds: [
          new EmbedBuilder()
            .setColor(process.env.COLOR)
            .setDescription(`📶 Calculando Latência...`),
        ],
      })
      .then(() => {
        setTimeout(() => {
          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(process.env.COLOR)
                .setDescription(`📡 Meu ping está em **${client.ws.ping}ms**`),
            ],
          });
        }, 2000);
      });
  },
};
