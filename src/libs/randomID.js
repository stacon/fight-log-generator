/**
 * Returns a random string up to 10 characters, bigger numbers will still produce 10 chars
 * @param {number} size of the returned ID. Default is 7
 * @returns {string} a random string consisted with given or size or 7
 */

exports.default = (size = 7) => Math.random().toString(36).substr(2,size > 10 ? 10 : size);