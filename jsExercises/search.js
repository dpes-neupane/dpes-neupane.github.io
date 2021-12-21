var fruits = [
    { id: 1, name: 'Banana', color: 'Yellow' },
    { id: 2, name: 'Apple', color: 'Red' }
]

function searchByName(arr, searchValue) {
    arr.forEach((value, index) => {
        let val = value.name.toLowerCase();
        if (val == searchValue) {

            console.log(value);
        }
    })


}


function searchByKey(arr, searchKey, searchValue) {
    arr.forEach((val, index) => {
        let key = Object.keys(val).filter((keys) => { return keys.toLowerCase() === searchKey.toLowerCase() });
        if (val[key].toLowerCase() === searchValue.toLowerCase()) {
            console.log(val);
        };
    })
}


searchByName(fruits, "apple");
searchByKey(fruits, 'name', 'apple');