/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if(typeof size !== 'number') return string
    const stringArray = Array.from(string)
    let countOfRepeaters = 1
    let newStringArray = stringArray.filter((item, index) => {
      if(index != 0 && stringArray[index - 1] === item && countOfRepeaters < size)  {
        countOfRepeaters++
        return item
      } else if(stringArray[index - 1] != item && size != 0) {
        countOfRepeaters = 1
        return item
      }
    })
    return newStringArray.join('')
}
