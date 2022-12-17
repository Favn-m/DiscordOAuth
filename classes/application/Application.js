const ApplicationClientManager = require("../managers/ApplicationClientManager");
const Client = require("./Client");

module.exports = class Application{
    /**
     * @type {ApplicationClientManager}
     */
    #clients;

    constructor({cacheLifeTime = 60*1000, clientId, secret}={}){
        this.cacheLifeTime = cacheLifeTime;
        this.clientId = clientId;
        this.secret = secret;

        this.#clients = new ApplicationClientManager(this);
    }

    /**
     * 
     * @returns {ApplicationClientManager}
     */
    get clients(){
        return this.#clients;
    }

    async createClient(token){
        return new Promise(async (resolve, reject)=>{
            const result = new Client(this, {token: token});
            try{
                const user = await result.fetchUser();
                if(user.id) return resolve(this.#clients.add(result));
                reject({error:'Can\'t find user with this token', code:404});
            } catch(e){
                reject(e);
            }
        });
    }

    /**
     * 
     * @param {String} token 
     * @param {{createIfNotExists: boolean}} param1 
     * @returns {Client}
     */
    async getClient(token, {createIfNotExists = true}={}){
        return this.#clients.cache.data.get(token) ?? createIfNotExists ? await this.createClient(token) : null;
    }
}