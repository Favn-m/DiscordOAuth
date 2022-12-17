const Routes = require("./Routes");

module.exports = class RestManager {
    constructor(token){
        this.token = token;
    }

    /**
     * 
     * @param {URL|Strig} path 
     * @param {URLSearchParams|Object} params 
     */
    async get(path, params){
        path = this.resolvePath(path);
        params = this.resolveParams(params);
        console.log(path);
        return new Promise(async (resolve, reject)=>{
            const result = await fetch(path+params.toString(), {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).catch(reject);
            const responce = await result.json();
            if(result.status==401) {
                console.warn('Token is invalid or expired!');
                return reject(responce);
            }
            if(!result.ok||result.status!==200) return reject(responce);
            return resolve(responce);
        })
    }

    /**
     * 
     * @param {URL|String} path 
     */
    resolvePath(path){
        if(path.endsWith('/')) path.slice(0, -1);
        if(path.startsWith('http')) return path;
        else if(path.startsWith('/')) return Routes.url+path;
        return null;
    }

    /**
     * 
     * @param {URLSearchParams|Object} params 
     * @returns {URLSearchParams}
     */
    resolveParams(params){
        if(typeof params == 'URLSearchParams') return params;
        else if(typeof params == 'object') {
            const result = new URLSearchParams();
            for(let key in params){
                result.append(key, params[key]);
            }
            return result;
        } else return new URLSearchParams(params);
    }
}