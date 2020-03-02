/**
 * @returns a function that logs with a prefixed counter
 */
module.exports = () => {
  let counter = 0; 
  return (message) => console.log(`${++counter}. ${message}`)
}