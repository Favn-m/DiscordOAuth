const RestManager = require("../util/RestManager");

module.exports = class Client{
    /**
     * @typedef ClientOptions
     * @property {String} token
     */

    /**
     * @param {ClientOptions} options 
     */
    constructor(application, options){
        this.application = application;
        if(!options.token) console.log("Warning: No token was provided for this client! This may cause issues with feauture requests!");
        else this.token = options.token;

        this.rest = new RestManager(this.token);
    }
}