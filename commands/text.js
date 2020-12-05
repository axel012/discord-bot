const textCommand = (self,msg,args) =>{
    if(!self.data || self.data.length === 0) return;
    msg.channel.send(self.data);
}

module.exports = textCommand;