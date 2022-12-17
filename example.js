const Application = require("./index");

let app = new Application({clientId: 'clientId'});

async function main(){
    try{
        const client = await app.getClient('jMatgPAOUh1JrOoBUVxWaR44V3xRN1');
        console.log("Client created");
        console.log(await client.fetchUser());
    } catch(e){
        console.log(e);
    }
}
main();