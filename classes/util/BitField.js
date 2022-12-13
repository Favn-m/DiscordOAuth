module.exports = class BitField{
    static Flags = {};

    /**
     * Gets an {@link Array} of bitfield names based on the bits available.
     * @param {...*} hasParams Additional parameters for the has method, if any
     * @returns {string[]}
     */
    toArray(...hasParams) {
        return Object.keys(this.constructor.Flags).filter(bit => this.has(bit, ...hasParams));
    }

    /**
     * Checks whether the bitfield has a bit, or multiple bits.
     * @param {BitFieldResolvable} bit Bit(s) to check for
     * @returns {boolean}
     */
    has(bit) {
        bit = this.constructor.resolve(bit);
        return (this.bitfield & bit) === bit;
    }
}