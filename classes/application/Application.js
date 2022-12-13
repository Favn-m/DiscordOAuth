module.exports = class Application{
    constructor({cacheLifeTime = 60*1000, clientId}={}){
        this.cacheLifeTime = cacheLifeTime;
        this.clientId = clientId;
    }
}