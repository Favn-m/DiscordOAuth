const Application = require("./classes/application/Application");

let app = new Application({clientId: 'clientId'});

async function main(){
    try{
        const client = await app.getClient('authToken');
        console.log("Client created");
        console.log(await client.fetchUser());
    } catch(e){
        console.log(e);
    }
}
main();