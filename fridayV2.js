const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const axios = require('axios');
const cheerio = require('cheerio');


// API Key für Openweathermap
const apiKey = 'APIKey';
// Bot-Token
const token = 'token';

// Client erstellen
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Slash-Befehle erstellen
const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping-Pong!'),
  new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get the current weather for a location')
    .addStringOption(option =>
      option.setName('location')
        .setDescription('Enter a city or location')
        .setRequired(true)),
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

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'weather') return;

  const location = interaction.options.getString('location');

  try {
    if (!location) {
      await interaction.reply('Please provide a location.');
      return;
    }

    const response = await axios.get(`https://de.wttr.in/${location}?1QT`);
    const $ = cheerio.load(response.data);
    var preContent = $('pre').text();

    const message = `Weather information for ${location}:\n\`\`\`${preContent}\`\`\``;

    await interaction.reply(message);
  } catch (error) {
    await interaction.reply(error.message);
  }
});


// Bot einloggen
client.login(token);
