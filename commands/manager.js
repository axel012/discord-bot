const hasRolePermission = require("../utils");
const fs = require("fs");

class CommandManager {

    static get Instance() {
        if (!CommandManager._instance) {
            CommandManager._instance = new CommandManager();
        }
        return CommandManager._instance;
    }

    constructor() {
        this._commands = {};
        this.handlers = require("./index");
    }

    load(){
        try{
            if(!fs.existsSync("./saved/commands")) return;
            const cmds = JSON.parse(fs.readFileSync("./saved/commands"));
            this._commands = cmds;
        }catch(e){            
        }
    }

    register({name, execute, data=null, roles=[], readonly=false, description}) {
        const isNew = this._commands[name] === undefined;
        if (!isNew) {
            const command = this._commands[name];
            if (command.readonly) {
                throw new Error(`Command ${name} is readonly`);
            }
        }
        const cmd = {
            name,
            execute,
            data,
            roles,
            readonly,
            description
        };

        this._commands[name] = cmd;
        fs.writeFileSync("./saved/commands",JSON.stringify(this._commands));
        return isNew;
    }

    remove(name) {
        console.log("called remove with ",name);
        const command = this._commands[name];
        if (command) {
            if (command.readonly) {
                throw new Error(`Command ${name} is readonly`);
            }
            delete this._commands[name];
            fs.writeFileSync("./saved/commands",JSON.stringify(this._commands));
            return true;
        }
        return false;
    }

    handle(msg){
        const args = msg.content.split(/ +/);
        let command = args.shift().toLowerCase();
        const {author} = msg;
        if(author.bot) return;
        if(!command.startsWith("!")) return;
        command = command.substring(1);   
        const cmd = this._commands[command];
        if(!cmd) return;
        console.info(`Called command: ${command}`);
        console.log(cmd.roles.length);
        if(cmd.roles.length > 0) {
            if(!hasRolePermission(msg,cmd.roles)){
                msg.reply("You don't have permissions to use this command :sunglasses:");
                return;
            }
        }
        const executor = this.handlers[cmd.execute]
        if(executor){
            executor(cmd,msg,args);
        }
    }
}

module.exports = CommandManager;

