const { loadImage, registerFont, createCanvas, Canvas } = require("canvas");
const { EmbedBuilder, AttachmentBuilder } = require("discord.js")
registerFont("./src/Fonts/black.ttf", { family: "Segoe UI Black",});
registerFont("./src/Fonts/helsinki.ttf", { family: "helsinki"})
registerFont("./src/Fonts/regular.ttf", { family: "regular"})

module.exports = {
    name: "inventario",
    description: "〔 🪐 - Rpg 〕› Veja seus itens e estatisticas.",
    options: [],

    async execute(client, interaction) {

        

    }
}