var Discord = require('discord.js')
module.exports = {
    name: 'ttt',
    description: 'Tic Tac Toe Game...Eg. !ttt @1 @2 ... @1 is given X and @2 is given O',
    //https://stackoverflow.com/questions/66859482/discord-js-send-message-then-wait-until-you-reply
	async execute(message, args){
        if(args.length < 2){
            return (message.channel.send("Please tag both the challenger and contender"));
        }
        var challenger = args[0];
        var contender = args[1];
        var challenger_id = args[0].substring(3,args[0].length - 1);
        var contender_id = args[1].substring(3,args[1].length - 1);

// comment the next if statement to test agaisnt yourself

        if(challenger_id==contender_id){
            return (message.channel.send("You can't challenge yourself"));
        }
        var playboard =[['1','2','3'],['4','5','6'],['7','8','9']]
        const indices = {
            '1': [0,0],
            '2': [0,1],
            '3': [0,2],
            '4': [1,0],
            '5': [1,1],
            '6': [1,2],
            '7': [2,0],
            '8': [2,1],
            '9': [2,2]
        };
        const confirmation = await message.channel.send(`<@!${message.author.id}> generated challenge.\n${challenger} challenged ${contender} for a game of tic tac toe... Accept? (y/n).`);
        choices=['y','n'];
        const filter = function(m) {
            return (choices.includes(m.content.toLowerCase()) && m.author.id === contender_id);
        }

        
        const collector = confirmation.channel.createMessageCollector(filter,{max:1, time:60000});
        collector.on('collect',async function(m){
            if(m.content.toLowerCase()==='n'){
                return message.channel.send(`Challenge declined by ${contender}`);
            }
            if(m.content.toLowerCase()==='y'){
                message.channel.send(`${playboard[0][0]} | ${playboard[0][1]} | ${playboard[0][2]}\n${playboard[1][0]} | ${playboard[1][1]} | ${playboard[1][2]}\n${playboard[2][0]} | ${playboard[2][1]} | ${playboard[2][2]}\n`);
                user_ids=[challenger_id,contender_id];
                user_tags=[challenger, contender];
                var player = 0;
                var winner=-1;
                var X = "**X**";
                var O = "**O**";
                slots=['1','2','3','4','5','6','7','8','9'];
                for (let k = 0; k<9; k++){
                    var turn = await message.channel.send(`${user_tags[player%2]}'s turn...`);
                    var movefilter = function(m){
                        return (slots.includes(m.content) && m.author.id===user_ids[player%2]);
                    }
                    var turncollector = turn.channel.createMessageCollector(movefilter,{max:1, time:20000});
                    await new Promise(resolve =>{ turncollector.on('collect',async function(m){
                        var input_val = m.content;
                        slots[input_val-1]='?';
                        if(m.author.id===user_ids[0]){
                            playboard[indices[input_val][0]][indices[input_val][1]]=X;
                        }
                        else{
                            playboard[indices[input_val][0]][indices[input_val][1]]=O;
                        }
                        
                        for (let i=0;i<3;i++){
                            if(playboard[i][0]==playboard[i][1] && playboard[i][1]==playboard[i][2]){
                                if(playboard[i][0]==X){
                                    winner=0;
                                }
                                else{
                                    winner=1;
                                }
                            }
                            else if(playboard[0][i]==playboard[1][i] && playboard[1][i]==playboard[2][i]){
                                if(playboard[0][i]==X){
                                    winner=0;
                                }
                                else{
                                    winner=1;
                                }
                            }
                        }
                        if(playboard[0][0]==playboard[1][1] && playboard[1][1]==playboard[2][2]){
                            if(playboard[0][0]==X){
                                winner=0;
                            }
                            else{
                                winner=1;
                            }
                        }
                        else if(playboard[0][2]==playboard[1][1] && playboard[1][1]==playboard[2][0]){
                            if(playboard[1][1]==X){
                                winner=0;
                            }
                            else{
                                winner=1;
                            }
                        }
                        if(winner==0 || winner==1){
                            message.channel.send(playboard[0][0]+" | "+playboard[0][1]+" | "+playboard[0][2]+"\n"+playboard[1][0]+" | "+playboard[1][1]+" | "+playboard[1][2]+"\n"+playboard[2][0]+" | "+playboard[2][1]+" | "+playboard[2][2]+"\n");
                            k=10;
                            return resolve(message.channel.send(`${user_tags[winner]} WON!!!`));
                        }
                        player++;
                        return resolve(message.channel.send(playboard[0][0]+" | "+playboard[0][1]+" | "+playboard[0][2]+"\n"+playboard[1][0]+" | "+playboard[1][1]+" | "+playboard[1][2]+"\n"+playboard[2][0]+" | "+playboard[2][1]+" | "+playboard[2][2]+"\n"));
                    })
                    turncollector.on('end',(collected, reason) => {
                        if(reason==='time'){
                            message.channel.send(`${user_tags[player%2]}, Failed to make move in time.. Opponent wins`);
                        }
                    })
                
                
                })
                }
            }
            return(message.channel.send("Game Over"));
        });
        collector.on('end',(collected, reason) => {
            if(reason==='time'){
                message.channel.send(`${challenger}, Challenge timed out `);
            }
        })
        //console.log(message.mentions.users);
        //console.log(args);
    }
}
        