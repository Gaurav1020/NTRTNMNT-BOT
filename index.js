const express = require('express');
const port=8005;
const path = require('path');
const app = express();
let ejs = require('ejs');
app.set('view engine','ejs' );
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded());
app.use(express.static(__dirname ));//const db = require('./config/mongoose');//const {object} = require('./models/{mongoose_model_name}');
app.use('/',require('./routes/index'));
const fs = require('fs')





// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const config = require("./config/bot_config.json");
const client = new Discord.Client();
const DisTube = require('distube');
client.distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true});
// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', function(){
    client.user.setActivity("!help", {
        type: "STREAMING",
    });
    
	module.exports.client_export={client:client, distube:client.distube, autoplaymode:0};
	console.log('---------------Ready!-------------');
});

prefix=config.prefix;
//console.log(prefix);
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');
//console.log(fs.readdirSync('./commands'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
    //console.log(command.name);
}

// client.on('message', function(message){
// 	//console.log(message.content);
//     //testregex is any string of type "{prefix}ping *"
//     //console.log(message);
//     var testregex = new RegExp(`${prefix}ping *`);
//     //if (message.content === '!ping') {
//     if (testregex.test(message.content)) {
// 		message.channel.send('Pong.');
//         //console.log(JSON.parse(JSON.stringify(message.mentions.users))[0]);
//         //console.log(message.mentions.users.size);
//         //console.log(JSON.parse(JSON.stringify(message.author)));
//         //message.channel.send(JSON.parse(JSON.stringify(message.author))['username']);
//         console.log(client);
// 	}
// });
client.on('message', function(message) {
	if (!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    .on("finish", message => message.channel.send("No more song in queue"))
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("initQueue", queue => {
        queue.autoplay = false;
    })
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });
    client.distube.options.leaveOnFinish=false;

// login to Discord with your app's token
client.login(config.token);

app.listen(port, function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
        return;
    }
    else{
        console.log('Server is running on port: ',port);
    }
});
