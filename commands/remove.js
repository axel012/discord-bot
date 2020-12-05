const CommandManager = require("./manager");
const removeCommand = (self,msg,args) =>{
    console.log("remove");
    console.log(args);
    if(args.length !== 1) return;
    const name = args.pop();
    if(!name || name.length === 0) return;
    try{
    const removed = CommandManager.Instance.remove(name);
        if(removed){
            msg.channel.send(`removed command !${name}`);
        }
    }catch(e){
        console.log(e);
    }
  }
  
  module.exports = removeCommand;
  