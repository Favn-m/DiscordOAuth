const Application = require("./classes/application/Application");
const Client = require("./classes/application/Client");
const User = require("./classes/structures/User");

let app = new Application({clientId: 'clientId'});

// app.clients.

async function main(){
    const client = await app.getClient('-');
    console.log("Client created");
    console.log(await client.fetchUser());
}
main();