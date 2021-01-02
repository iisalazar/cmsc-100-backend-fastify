const { readFileSync } = require('fs');
/**
 * 
 * @param {string} filename 
 * @param {string} encoding 
 * @returns {[ { done: boolean, id: string, text: string }] }
 */

exports.getTodos = async (filename, encoding) => {

  const databaseStringContent = readFileSync(filename, encoding);
  const database = JSON.parse(databaseStringContent);
  const { todos } = database;
  
  console.log("TODOS FOUND");
  return todos;
}