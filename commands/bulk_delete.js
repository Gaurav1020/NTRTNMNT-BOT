module.exports = {
    name: 'bdel',
    description: 'Bulk delete messages in the channel... !bdel {number_of_messages}... kick_member permission required',
	execute(message, args) {
		if(!args[0]){
            return message.channel.send("Please specify amount of messages you want to delete.");
        }
        if(parseInt(args[0]>99)){
            return message.channel.send("You cannot delete more than 99 messages at once.");
        }
        if(message.member.hasPermission('KICK_MEMBERS')){
            return message.channel.bulkDelete(parseInt(args[0])+1)
        }
        else{
            message.channel.send("You do not have permission to use this command.");
        }
        return;
	},
}