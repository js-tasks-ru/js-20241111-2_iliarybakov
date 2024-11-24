/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const fields = path.split(".")
    return (object) => {
      return fields.reduce((accum, field) => {
        if (accum && accum.hasOwnProperty(field)) {
            return accum[field]
          } 
        return undefined
        }
        , object)
    }
}
