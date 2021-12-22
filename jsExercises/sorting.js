var arr = [{
    id: 1,
    name: 'Mary',
}, {
    id: 2,
    name: 'John',
}, {
    id: 3,
    name: 'Andrew',
}];


function sortBy(arr, key) {
    sortedarr = arr;
    checked = {};
    smallest = -1;
    for (let i = 0; i < sortedarr.length; i++) {
        for (let j = i; j < sortedarr.length; j++) {
            if (sortedarr[i][key] > sortedarr[j][key]) {

                temp = sortedarr[i];
                sortedarr[i] = sortedarr[j];
                sortedarr[j] = temp;
            }
        }
    }

    return sortedarr;
}





console.log(sortBy(arr, "name"));