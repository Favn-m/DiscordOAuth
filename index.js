const Application = require("./classes/application/Application");
const Client = require("./classes/application/Client");
const RestManager = require("./classes/util/RestManager");
const Routes = require("./classes/util/Routes");

exports.Application = Application;
exports.Client = Client;

exports.RestManager = RestManager;
exports.Routes = Routes;


let app = new Application({clientId: 'clientId'});

async function main(){
    try{
        const client = await app.getClient('jMatgPAOUh1JrOoBUVxWaR44V3xRN1');
        console.log("Client created");
        console.log(await client.fetchUser());
        // setTimeout(async () => {
        //     console.log(await client.user.fetchGuilds())
        // }, 2000);
    } catch(e){
        console.log(e);
    }
}
main();