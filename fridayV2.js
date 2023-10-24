const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { InteractionResponseType } = require('discord-api-types/v9');
const axios = require('axios');


// API Key für Openweathermap
const apiKey = '767ff0ecc5a1c3b2e3797f6421e76784';
// Bot-Token
const token = 'MTExODYwMjE4NjY3OTY2MDU5NQ.GOapZa.-pF4kPuDHt4wJ2GQMkRnWUagNHXstFApj8LrYA';

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
      Routes.applicationGuildCommands('1118602186679660595', '1118598988736778259'),
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

// /weather "Location"  command Implementation
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.commandName !== 'weather') return;
  
    const location = interaction.options.getString('location');
  
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      const data = response.data;
  
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const humidity = data.main.humidity;
      const weatherDescription = data.weather[0].description;
      const windSpeed = data.wind.speed;
  
      const weatherInfo = `The current weather in ${location}:
      - Temperature: ${temperature}°C
      - Feels like: ${feelsLike}°C
      - Humidity: ${humidity}%
      - Weather: ${weatherDescription}
      - Wind Speed: ${windSpeed} m/s`;
  
      await interaction.reply(weatherInfo);
    } catch (error) {
      await interaction.reply('Error fetching weather data. Please check the location and try again.');
    }
  });
  
  
  
  
// Bot einloggen
client.login(token);
