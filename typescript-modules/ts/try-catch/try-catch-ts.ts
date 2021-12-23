export function tryCatchTs<T extends Function>(asyncCallback: T) {
    return async function (...args: any[]) {
        try {
            const resolve = await asyncCallback.apply(this, args);
            return [resolve, null];
        } catch (err) {
            return [null, err];
        }
    }
}