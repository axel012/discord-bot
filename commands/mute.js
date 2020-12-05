const muteCommand = (self,msg,args) =>{
    if (msg.member.voice.channel) {
        const allow = !msg.member.voice.serverMute;
        let channel = msg.guild.channels.cache.get(msg.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {          
          member.voice.setMute(allow);
        }
        if(!allow){
            msg.channel.send("You may speak now");
        }else{
            msg.channel.send("Shhh!");
        }
    } else {
        msg.reply('You need to join a voice channel first!');
    }
  }
  
  module.exports = muteCommand;