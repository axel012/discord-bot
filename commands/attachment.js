const { MessageAttachment } = require('discord.js');

const attachmentCommand = (self,msg,args) =>{
    if(!self.data || self.data.length === 0) return;
    const attachment = new MessageAttachment(self.data);
    msg.channel.send(attachment);
}

module.exports = attachmentCommand;