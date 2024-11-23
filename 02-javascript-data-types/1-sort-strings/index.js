/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const sortedArray = [...arr]
    if(param === 'asc') {
        return sortedArray.sort((a,b) => a.localeCompare(b, undefined, {caseFirst: "upper"}))
    }
    return sortedArray.sort((a,b) => b.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"}))
}

console.log(sortStrings(['b', 'a', 'c'], 'asc'));
console.log(sortStrings(['b', 'a', 'c'], 'desc'));

