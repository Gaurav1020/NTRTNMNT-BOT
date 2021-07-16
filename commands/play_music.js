module.exports = {
    //dependencies: distube, @discordjs/opus, ffmpeg, discord.js(ofcourse)
    //npmjs.com/package/distube
    name: 'm',
    description: 'Play Music- Beta...\n\t\t\t\t !m {command} songname(for "play" command only)\n\t\t\t\t Commands: **play** {song-name}, **stop**, **skip**, **loop**, **queue**, **pause**, **resume**, **autoplay**',
	async execute(message, args) {
        //const config = [10,20,30,40];
        //message.channel.send(JSON.stringify(config));
        //console.log(typeof config);
        function sleep(milliseconds) {
            const date = Date.now();
            let currentDate = null;
            do {
                currentDate = Date.now();
            } while (currentDate - date < milliseconds);
        }
		if (message.member.voice.channel) {
            const connection = message.member.voice.channel.join();
        }
        // sleep(2000);
        // connection.disconnect();
        
        const Client = require("../index");
        client=Client.client_export.client;
        distube=Client.client_export.distube;
        const command = args[0];
        args = args.slice(1,args.length);
        var autoplaymode = {
            0:"On",
            1:"Off"
        };

        // const Discord = require('discord.js');
        // const client = new Discord.Client();
        // const DisTube = require('distube');
        // client.distube = new DisTube(client, {searchSongs: false, emitNewSongOnly: true});
        // client.distube.play(message, args.join(" "));
        // client.distube.on("playSong", (message, queue, song) => message.channel.send(`Playing ${song.name}- ${song.formattedDuration}\nRequested By: ${song.user}`));
        if(message.member.voice.channel){
        if (command == "play"){
            distube.play(message, args.join(" "));
            //let mode = distube.toggleAutoplay(message);
            //message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
            //if((mode ? "On" : "Off")== autoplaymode[Client.client_export.autoplaymode]){
                //mode=distube.toggleAutoplay(message);
                //message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
            //}
        }
        if (command == "disconnect"){
            distube.play(message, args.join(" "));
            let mode = distube.toggleAutoplay(message);
            //message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
            if((mode ? "On" : "Off")== autoplaymode[Client.client_export.autoplaymode]){
                mode=distube.toggleAutoplay(message);
                //message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
            }
        }
        if (command == "pause"){
            distube.pause(message);
        }
        if (command == "autoplay") {
            if(Client.client_export.autoplaymode==0){
                Client.client_export.autoplaymode=1;
            }
            else{
                Client.client_export.autoplaymode=0;
            }
            let mode = distube.toggleAutoplay(message);
            message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        }
        if (command == "resume"){
            // Issue with resume since it invokes only after second wakeup. Resolved Issue link: https://github.com/skick1234/DisTube/issues/75
            distube.resume(message);
            distube.pause(message);
            distube.resume(message);
        }
        if (command == "shuffle"){
            distube.shuffle(message);
        }
        if (["repeat", "loop"].includes(command)){
            distube.setRepeatMode(message, parseInt(args[0]));
            message.channel.send("Looping song");
        }
        if (command == "stop") {
            let queue = distube.getQueue(message);
            if(queue){
                distube.stop(message);
                message.channel.send("Stopped the music!");
            }
            else{
                message.channel.send("No Music is Queued!");
                return console.log(message.member.voiceChannel);
            }
        }

        if (command == "skip"){
            distube.skip(message);
            message.channel.send("Skipped song");
        }
        if (command == "queue") {
            let queue = distube.getQueue(message);
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n"));
        }
    }
    else{
        return message.channel.send("You must be in a voice channel to use this command!!!");
    }  
	},
}