module.exports = class FPromise extends Promise{
    constructor(resolve, reject){
        this.resolve = resolve;
        this.reject = reject;
    }
}