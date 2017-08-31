

/**
 * Returns a random item from the table
 * @param {Array} itemsTable 
 */
function randomlyPickItem(getRandomInt, itemsTable) {
  // preconditions
  if(!getRandomInt || !getRandomInt instanceof Function) {
    throw new Error("getRandomInt argument is not a function");
  }
  if (!itemsTable || !Array.isArray(itemsTable) || itemsTable.length == 0) {
    throw new Error("itemsTable argument to randomlyPickItem function MUST be an array with at least one item");
  }
  return itemsTable[getRandomInt(itemsTable.length - 1)];
}

