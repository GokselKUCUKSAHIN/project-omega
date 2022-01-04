const {sleep} = require("@jellybeanci/sleep");

/**
 *
 * @param asyncCallback
 * @returns {function(): Promise<[*,null]|[null,*]|null[]|undefined>}
 */
function tryCatch(asyncCallback) {
  return async function (...args) {
    try {
      const resolve = await asyncCallback.apply(this, args);
      return [resolve, null];
    } catch (err) {
      return [null, err];
    }
  }
}

module.exports = tryCatch;

// async function bomb(millis) {
//   await sleep(millis);
//   throw Error("BOOOOMMMM!!!");
// }
//
// /**
//  *
//  * @type {function(): Promise<[*,null]|[null,*]}
//  */
// const defusedBomb = tryCatch(bomb);