module.exports = {
    name: 'mmute',
    description: 'Mass mute voice channel... !mmute ... manage_messages permission required',
	execute(message, args) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            //message.channel.send('This member can mute');
            message.member.voice.channel.members.forEach((member)=>{member.voice.setMute(true);})
            //console.log(message.member.voice.channel.members.forEach((member)=>console.log(member.voice.id)))
        }
        else{
            message.channel.send('This member can not mute');
        }
	},
}