module.exports = {
    name: 'munmute',
    description: 'Mass unmute voice channel... !munmute ... You need to have "manage messages" permission to mute/unmute',
	execute(message, args) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            //message.channel.send('This member can unmute');
            message.member.voice.channel.members.forEach((member)=>{member.voice.setMute(false);})
            //console.log(message.member.voice.channel.members.forEach((member)=>console.log(member.voice.id)))
        }
        else{
            message.channel.send('This member can not mute');
        }
	},
}