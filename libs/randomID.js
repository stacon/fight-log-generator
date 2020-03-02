/**
 * @param {number} size of the returned ID. Default is 7
 * @returns {string} a random string consisted with given or size or 7
 */
module.exports = (size = 7) => Math.random().toString(36).substring(size);