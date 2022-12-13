const Application = require("./classes/application/Application");
const Client = require("./classes/application/Client");
const User = require("./classes/structures/User");

let app = new Application({clientId: '1'});

let client = new Client(app, {token: 'jMatgPAOUh1JrOoBUVxWaR44V3xRN1'});

// async function main(){
    (new User(client, {})).fetch().then(user=>user.guilds.fetch()).then(console.log);
// }
// main();