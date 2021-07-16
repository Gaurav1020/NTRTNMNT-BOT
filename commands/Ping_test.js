module.exports = {
    name: 'ping',
    description: 'Ping!... You ping the the bot the bot Pong you back.',
	execute(message, args) {
		message.channel.send('Pong');
	},
}