const me = {
    name: 'Dipesh',
    address: 'Kirtipur',
    emails: 'anonymous@gmail.com',
    interests: ['eating', 'sleeping'],
    education: [{
            name: 'National Nepali School',
            enrolledDate: 2001
        },
        {
            name: 'International Nepali School',
            enrolledDate: 2014
        },
        {
            name: 'Multinational Campus',
            enrolledDate: 2018
        }
    ]
}


var result = Object.keys(me).forEach(key => {
    if (key === "education") {
        me[key].forEach(k => {
            console.log("Name: " + k["name"] + ", Date: " + k["enrolledDate"]);
        })
    }

});