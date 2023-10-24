# Friday Discord Bot

The Friday Discord Bot offers useful features for your Discord server, including a Ping-Pong game and the ability to fetch the current weather forecast for a specified location.

## Commands

### Ping-Pong
- The `ping` command allows users to play a ping-pong game with the bot.

  Syntax: 
```bash
/ping
```

### Weather Forecast
- The `weather` command provides the option to retrieve the current weather forecast for a specified location.

Syntax:
```bash 
/weather [location]
```

Example:
```bash 
/weather Berlin
```

## Installation

1. Ensure that [Node.js](https://nodejs.org/) is installed on your system.

2. Clone this repository or download the `fridayV2.js` file.

3. Run the following command in your project directory to install the required dependencies:
```bash
npm install discord.js discord-api-types axios
```

4. Configure the bot and API key settings:
- Replace `'APIKey'` in the `fridayV2.js` file with your OpenWeatherMap API key.
- Replace `'token'` in the `fridayV2.js` file with your Discord bot token.

5. Register the slash commands on your Discord server:
- Replace `'Application-ID'` and `'Server-ID'` in the `fridayV2.js` file with the corresponding IDs of your Discord bot and server.
- Run the script to register the commands:

```bash
node fridayV2.js
```

6. Start the bot with the following command:

```bash
node fridayV2.js
```

## Usage

Once the bot is running, you can use the commands on your Discord server.

- Use `/ping` to play the ping-pong game.
- Use `/weather [Location]` to retrieve the weather forecast for a location.

## Customization

You can customize the bot according to your preferences and add more features. The examples in this repository provide a foundation for your own extensions.



