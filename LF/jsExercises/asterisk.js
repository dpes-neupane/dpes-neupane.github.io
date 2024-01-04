function asteriskGen(n) {

    str = "* ".repeat(n);


    for (var i = 2 * n; i > 0; i -= 2) {

        console.log(str.slice(0, i - 1));
    }

}
asteriskGen(6);