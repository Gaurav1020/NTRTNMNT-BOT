module.exports = {
    name: 'toss',
    description: 'Coin Flip... Eg. !toss @1 @2 ... @1 is Heads and @2 is Tails',
	execute(message, args) {
		if(args.length < 2){
            return (message.channel.send("Please tag two people."));
        }
        var challenger = args[0];
        var contender = args[1];
        var challenger_id = args[0].substring(3,args[0].length - 1);
        var contender_id = args[1].substring(3,args[1].length - 1);
        message.channel.send(`${challenger} is Heads, \n${contender} is Tails.`)
        const choice = Math.random();
        if(choice<0.5){
            
            message.channel.send(`It's Heads\n ${challenger} Wins`);
        }
        else{
            message.channel.send(`It's Tails\n ${contender} Wins`);
        }

	},
}