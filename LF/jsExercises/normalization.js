var input = {
    '1': {
        id: 1,
        name: 'John',
        children: [
            { id: 2, name: 'Sally' },
            { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry', children: [{ id: 7, name: "Mary" }] }] }
        ]
    },
    '5': {
        id: 5,
        name: 'Mike',
        children: [{ id: 6, name: 'Peter' }]
    }
};
obj = {};


function traverse(input) {
    arr = Object.keys(input);
    for (let i = 0; i < arr.length; i++) {
        if (input[arr[i]]['children'] != undefined) {
            arrchild = input[arr[i]]['children'];
            for (let j = 0; j < arrchild.length; j++) {
                normalize(arrchild[j]);
                output[input[arr[i]]['id']] = input[arr[i]];
                output[input[arr[i]]['id']]['children'][j] = input[arr[i]]['children'][j]['id'];
            }
            // console.log(arrchild);
        }
    }
}
output = {};

function normalize(child) {
    if (child.children === undefined) {
        output[child['id']] = child;
        // console.log(child);
        return;
    }

    for (let k = 0; k < child['children'].length; k++) {

        normalize(child['children'][k]);
        output[child['id']] = child;
        output[child['id']]['children'][k] = child['children'][k]['id'];


    }

}

traverse(input)
let a = Object.keys(output);
for (let i = 0; i < a.length; i++) {
    console.log(output[a[i]])
}