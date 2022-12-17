const { Collection } = require("@discordjs/collection");
const Application = require("../application/Application");

module.exports=
/**
 * 
 * @abstract
 * @template T
 */
class CachedStructure{
    #cache;
    
    /**
     * 
     * @param {Application} application
     * @param {T} holds 
     */
    constructor(application, holds){
        this.application = application;

        this.#cache = { expires: Date.now()+this.application.cacheLifeTime };

        if(holds) Object.defineProperty(this, '_holds', holds)
    }

    /**
     * @typedef cache
     * @property {EpochTimeStamp} expires
     * @property {T} data
     */
    
    /**
     * @returns {cache}
     * @abstract
     */
    get cache(){
        return this.#cache;
    }
}