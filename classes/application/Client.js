const User = require("../structures/User");
const RestManager = require("../util/RestManager");

module.exports = class Client{
    /**
     * @type {User}
     */
    #user;

    /**
     * @typedef ClientOptions
     * @property {String} token
     */

    /**
     * @param {ClientOptions} options 
     */
    constructor(application, options){
        this.application = application;
        if(!options.token) console.warn("No token was provided for this client! This may cause issues with feauture requests!");
        else this.token = options.token;

        /**
         * RestManager for this Client
         * @type {RestManager}
         */
        this.rest = new RestManager(this.token);

        this.#user = new User(this);
    }

    async fetchUser({force=false, withGuilds=true}={}){
        if(!this.#user) this.#user = new User(this, {});
        const result = await this.#user.fetch(force);
        this.#user = result;
        if(withGuilds) await this.#user.fetchGuilds(force);
        return result;
    }

    /**
     * @return {User} user of this client
     */
    get user(){
        return this.#user;
    }
}