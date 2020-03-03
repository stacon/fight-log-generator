/**
 * @returns a function that logs with a prefixed counter
 */
exports.default = () => {
  let counter = 0; 
  return (message) => console.log(`${++counter}. ${message}`)
}