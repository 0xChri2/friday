const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');

// Bot-Token
const token = 'ODI4MTg0MDUyNjI3NTM3OTUw.Gcgeaa.EOtIrTxOM8ef4KCkMrtQSTSbVkwEhuDrs64Pl0';

// Client erstellen
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Slash-Befehle erstellen
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping-Pong!'),
].map(command => command.toJSON()); // Hier kein toJSON()

// Slash-Befehle auf dem Server registrieren
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Starte Slash-Befehle Registrierung...');

    await rest.put(
      Routes.applicationGuildCommands('Application-ID', 'Server-ID'),
      { body: commands },
    );

    console.log('Slash-Befehle erfolgreich registriert!');
  } catch (error) {
    console.error('Fehler bei der Registrierung der Slash-Befehle:', error);
  }
})();

// Event, das beim Start des Bots ausgeführt wird
client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

// Event, das auf Interaktion mit Slash-Befehlen reagiert
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

// Bot einloggen
client.login(token);
