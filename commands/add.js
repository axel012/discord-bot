

const addCommand = (self,msg,args) =>{
  console.log("add");
  if(args.length < 2) return;
  const name = args.shift();
  const data = args.join(" ");
  if(!data || data.length === 0) return;
  const isValidURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  try {
    let isNew = true;
    if(isValidURL.exec(data) !== null){
        const url = new URL(data).href;
        isNew = addAttachmentCommand(name,url);
    }else{
        isNew = addTextCommand(name,data);
    }    
    if(isNew){
        msg.channel.send(`registered command !${name}`);
    }else{
        msg.channel.send(`updated command !${name}`);
    }
   
  }catch(e){
    console.log(e);
    return;
  }
}


module.exports = addCommand;

const CommandManager = require("./manager");
const addAttachmentCommand = (name,data) => {
  return CommandManager.Instance.register({name,execute:"attachmentCommand",data});
}

const addTextCommand = (name,data) => {
  return CommandManager.Instance.register({name,execute:"textCommand",data});
}