const hasRolePermission = (msg ,roles)=>{
    try{
        console.log(roles.includes);
       
        const role = msg.guild.roles.cache.filter(x => roles.includes(x.name));
        if(role.size === 0){
            throw new Error(`Roles not found ${roles}`);
        }
        const memberRoles = msg.member.roles.cache;
        const hasRoles = memberRoles.intersect(role);
        return hasRoles.size > 0;    
    }catch(e){
        console.log(e);
        return false;
    }
}

module.exports = hasRolePermission;