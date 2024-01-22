function except(arr1, arr2, key) {
    if (key)
        return arr1.filter(s => {
            if (arr2.find(s2 => s2[key] === s[key]) == null)
                return true;
            return false;
        });
    else
        return arr1.filter(s => {
            if (arr2.find(s2 => s2 === s) == null)
                return true;
            return false;
        });
}
function filterByKeys(arr, keys, searchValue) {
    return arr.filter(item => {
        return keys.some((column) => String(item[column]).toLowerCase().includes(searchValue));
    });
}
function sortByKey(arr, sortBy, direction) {
    return arr.sort((a, b) => {
        const order = direction === 'asc' ? 1 : -1;
        if (a[sortBy] !== b[sortBy]) {
            return a[sortBy] > b[sortBy] ? order : -order;
        }
        return 0;
    });
}
export { except, filterByKeys, sortByKey };