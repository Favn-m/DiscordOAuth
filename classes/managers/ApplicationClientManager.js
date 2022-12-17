const Client = require("../application/Client");
const CachedManager = require("./CachedManager");

module.exports = class ApplicationClientManager extends CachedManager{
    constructor(application){
        super(application, Client);
    }

    /**
     * Adds Client to the cache
     * @param {Client} client client to add
     * @returns {Client} client that was added
     */
    add(client){
        return this.cache.data.set(client.token, client).get(client.token);
    }

    /**
     * Removes Client from the cache
     * @param {string} token token of Client to remove
     * @param {string} reason why it was removed
     * @returns 
     */
    remove(token, reason){
        console.log(`Client with token ${token} was removed from cache because(reason): ${reason}`);
        return this.cache.data.delete(token);
    }
}