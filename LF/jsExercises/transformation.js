var numbers = [1, 2, 3, 4];
console.log(numbers);

function transform(collection, tranFunc) {
    newArray = [];
    collection.forEach(element => {

        newArray.push(tranFunc(element));
    });
    return newArray;
}


console.log(transform(numbers, (e) => {
    return e * 2;
}))