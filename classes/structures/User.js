const Client = require("../application/Client");
const UserGuildManager = require("../managers/UserGuildManager");
const Routes = require("../util/Routes");
const CachedStructure = require("./CachedStrucure");

module.exports = 
/**
 * @extends CachedStructure<User>
 * @class
 */
class User extends CachedStructure{
    #guilds;

    /**
     * 
     * @param {Client} client 
     * @param {userSchema} data 
     */
    constructor(client, data){
        super(client.application, User);
        this.client = client;
        this.application = client.application;

        this.#guilds = new UserGuildManager(client, [])

        this.id = data.id;

        this.name              = null;
        this.username          = null;
        this.avatar            = null;
        this.avatar_decoration = null;
        this.discriminator     = null;
        this.public_flags      = null;
        this.flags             = null;
        this.banner            = null;
        this.banner_color      = null;
        this.accent_color      = null;
        this.locale            = null;
        this.mfa_enabled       = null;
        this.premium_type      = null;

        this.#patch(data);
    }

    /**
     * @returns {UserGuildManager}
     */
    get guilds() {
        return this.#guilds;
    }

    /**
     * 
     * @param {boolean} force 
     * @returns {Promise<this>}
     */
    async fetch(force = false){
        if((!force&&this.cache.expires>=Date.now())&&this.cache.data) return this.cache.data;
        try{
            const result = await this.client.rest.get(Routes.user('@me'));
            this.cache.expires = Date.now() + this.application.cacheLifeTime;
            this.cache.data = result;

            this.#patch(result)
            return this;
        } catch(e){
            console.log(e);
        }
    }

    /**
     * 
     * @param {Collection<Guild>} force 
     * @returns 
     */
    async fetchGuilds(force = false){
        return await this.guilds.fetch(force);
    }

    /**
     * Patches this guild data
     * @param {userSchema} data 
     */
    #patch(data){
        Object.keys(userSchema).forEach(element =>{
            if(element in data){
                this[element] = data[element];
            }
        });
    }
}


const userSchema  = {
    id: String,
    username: String,
    avatar: String,
    avatar_decoration: Number,
    discriminator: String,
    public_flags: Number,
    flags: Number,
    banner: String,
    banner_color: String,
    accent_color: Number,
    locale: String,
    mfa_enabled: Boolean,
    premium_type: Number
}