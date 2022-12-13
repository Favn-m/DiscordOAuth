const { Collection } = require("@discordjs/collection");
const Application = require("../application/Application");

/**
 * 
 * @abstract
 * @template T
 */
class CachedManager{
    #cache;
    
    /**
     * 
     * @param {Application} application
     * @param {T} holds 
     */
    constructor(application, holds){
        this.application = application;

        this.#cache = { expires: Date.now()+this.application.cacheLifeTime, data: new Collection() };

        if(holds) Object.defineProperty(this, '_holds', holds)
    }

    /**
     * @typedef cache
     * @property {EpochTimeStamp} expires
     * @property {Collection<String, T>} data
     */
    
    /**
     * @returns {cache}
     * @abstract
     */
    get cache(){
        return this.#cache;
    }
}

module.exports=CachedManager;