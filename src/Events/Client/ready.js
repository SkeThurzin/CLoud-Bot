const chalk = require("chalk");
const { connect, set } = require("mongoose");

module.exports = {
  name: 'ready',
  once: true,
  async execute (client) {
  const Mongo = process.env.MONGO;

  let status = [
    `🌹- ୧︰Olá, eu sou o Cloud › Utilize /help.`,
    `🎆- ୧︰Estou em versão BETA, Reporte bugs in › Suporte Server.`,
  ];

  let i = 0;
  client.user.setPresence({
    activities: [{ name: `${status[i++ % status.length]}`, type: 0 }],
    status: "idle",
  });
  setInterval(() => {
    client.user.setPresence({
      activities: [{ name: `${status[i++ % status.length]}`, type: 0 }],
      status: "idle",
    });
  }, 1000 * 30);

  client.user.setStatus("idle");
  console.clear();
  if (!Mongo) {
    console.warn(chalk.gray(`${new Date().toLocaleString()}`), chalk.blue("INFO: Discord.Geteway: Error!"), chalk.redBright(`--- MongoDB token is required for initialization.`));
    process.exit();
  } else {
    set("strictQuery", false);
    connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(
      console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.blue("INFO: Success!"), chalk.whiteBright(`--- Connected on MongoDB.`)),
      console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.blue("INFO: Success!"), chalk.whiteBright(`--- Bot started successfully.`)),
      console.log(chalk.gray(`${new Date().toLocaleString()}`), chalk.blue("INFO: Success!"), chalk.whiteBright(`--- We have logged in as ${client.user.username}.`))
    );
  }

}
}
