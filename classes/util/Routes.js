module.exports = class Routes{
    static url = 'https://discord.com/api/v10';

    /**
     * - GET `/users/{user}`
     * @param {string} user 
     * @returns 
     */
    static user(user) { return `/users/${user}` }

    /**
     * - GET `/users/@me/guilds`
     * @returns 
     */
    static guilds() { return `/users/@me/guilds` }
}