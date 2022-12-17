const CachedManager = require("./CachedManager");
const Guild = require('../structures/Guild');
const { Collection } = require("@discordjs/collection");
const Routes = require("../util/Routes");
const RestManager = require("../util/RestManager");
const Client = require("../application/Client");

module.exports = 
/**
 * @extends {CachedManager<Guild>}
 */
class UserGuildManager extends CachedManager{
    /**
     * @param {Client} client
     * @param {Array<Guild>} data 
     */
    constructor(client, data){
        super(client.application, Guild);

        this.client = client;

        super.cache.data = new Collection();
        data.forEach(element=>{
            super.cache.data.set(element.id, element);
        })
    }


    async fetch(force = false){
        if(!force&&this.cache.expires>=Date.now()&&this.cache.data.size>0) return this.cache.data;
        try{
            const result = await this.client.rest.get(Routes.guilds());
            this.cache.expires = Date.now() + this.application.cacheLifeTime;

            const cached = new Collection();

            result.forEach(element=>{
                cached.set(element.id, new Guild(element));
            })

            this.cache.data = cached;
            return cached;
        } catch(e){
            console.log("Error fetching UserGuild(s):", e);
        }
    }
}