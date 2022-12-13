const PermissionsBitField = require("../util/PermissionsBitField");

module.exports = class Guild{
    constructor(data){
        this.id = data.id;

        this.name=null;
        this.icon=null;
        this.owner=null;
        this.permissions=null;

        this.#patch(data);
    }

    /**
     * Patches this guild data
     * @param {guildSchema} data 
     */
    #patch(data){
        Object.keys(guildSchema).forEach(element=>{
            if(element in data){
                this[element]=data[element];
            }
        });
    }
}


const guildSchema = {
    id: String,
    name: String,
    icon: String,
    owner: Boolean,
    permissions: PermissionsBitField,
    features: Array
}