const BitField = require("./BitField");
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = class PermissionsBitField extends BitField{
    static Flags = PermissionFlagsBits;
}