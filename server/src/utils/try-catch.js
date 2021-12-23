/**
 *
 * @param asyncCallback
 * @returns {Promise<(function(): Promise<[*,null]|[null,*]|null[]|undefined>)|*>}
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