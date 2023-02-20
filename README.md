# Um Bot do Discord de RPG feito para Divertir!

### ❗・Requisitos:
• [Node v16.15.1+](https://nodejs.org/en/download/) <br/>
• [Discord.js v14.3.0+](https://www.npmjs.com/package/discord.js?source=post_page-----7b5fe27cb6fa----------------------) <br/>
• [Git](https://git-scm.com/)

---

### 🤖・Recursos Do Projeto:
• Comandos Slash;<br>
• Suporte MongoDB.
<br/>

---

### ➕・Criando o bot e adicionando no servidor:
- `1.` Entre no [Discord Developer Portal](https://discord.com/developers/applications) e clique na opção `Applications`;<br>
- `2.` No lado superior direito clique no botão `New Application` e nomeie seu bot (De um nome bem lindo OK);<br>
- `3.` No lado esquerdo clique na opção `Bot`, logo seguida, no lado direito clique no botão `Add Bot`;<br>
- `4.` Role para baixo e ative as três intenções de `Privileged Gateaway Intents`:<br>
    ・Elas são: (PRESENCE INTENT, SERVER MEMBERS INTENT e MESSAGE CONTENT INTENT);<br>
- `5.` No lado esquerdo clique na opção `OAuth2`, em seguida, `URL Generator`. Selecione os escopos `bot` e `application.commands`, role para baixo até <b>BOT PERMISSIONS</b>, selecione `Administrator` (para todas as permissões da guilda);<br>
- `6.` Copie o link que é gerado abaixo, abra uma nova aba do navegador, cole a URL, escolha um servidor onde ficará seu bot.
<br/>

---

### 💻・Instalação
- `1.` Baixe o projeto ou clone com:
```bash
git clone https://github.com/SkeThurzin/Cloud-Bot.git
```
- `2.` Abre a pasta do projeto;
- `3.` No terminal para instalação das dependências, execute o comando:
```bash
npm install ou npm i
```

- `4.` Acesse `.env` e altere todos os valores:
```js
TOKEN=TOKEN DO BOT AQUI    
MONGO=LINK DA MONGODB mongodb+srv:
OWNER=ID DO DONO
COLOR=COR DAS EMBEDS
```
- Tutorial como pegar o link da MongoDB (No Começo do Video)

[Dark Star](https://youtu.be/sBkra59rK9k)

- `5.` Para iniciar o bot, basta ir no terminal, executar:
```bash
node index.js
```
OU 
```bash
node .
```
<br/>

---

### 💫・Estrutura do comando:

- `1. Normal`
```js
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: "",
  description: "",
  options: [],

  async execute(client, interaction, emoji) {
    //Comando aqui.
  }
 }
```
- `2. SubCommand`
```js
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
  name: '', // Primeiro nome do subcommand
  description: '', 
  options: [
    {
      name: '', // Segundo
      description: '',
      type: ApplicationCommandOptionType.Subcommand,
      options: [],
    },
  ],

  async execute(client, interaction, emoji) {
  case "": {
     // Dentro da "" coloca o nome do segundo nome do subcommand.
    // Comando aqui.
    break;
   }
  }
 }
```

---

### 👀・Adicionais:

- `1. ` .eslintrc.json: O ESLint é uma ferramenta que analisa o código e aponta quaisquer problemas que encontrar. Ele pode encontrar bugs, áreas potencialmente problemáticas, estilos de codificação ruins e questões de estilo.
- `2. ` .prettierrc: Prettier é um formatador de código com suporte a diversos tipos de arquivos como JavaScript, JSX, Angular, Vue, TypeScript, HTML, CSS, SCSS e JSON.

---

### 📝 License

Este projeto está sob a licença MIT. Consulte o LICENSE para obter detalhes!.

### 🪐 Créditos

Feito por [SkeThur#4836](https://discord.com/users/506299442924879876) GitHub: [github.com/SkeThurzin](github.com/SkeThurzin)