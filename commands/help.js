const fs = require('fs');
module.exports = {
    name: 'help',
    description: 'Commands Help',
	execute(message, args) {
        var op= `***Command's Help***\n`;
		const commandFiles = fs.readdirSync('./commands');
        for (const file of commandFiles) {
            var filereq = require(`./${file}`);
            op = op+`!${filereq.name}:\t`+ filereq.description+`\n`;
        }
        return message.channel.send(op);
        // console.log(map);
	},
}