const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'userdata.json' 
);

const getUserDataFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class User {
    constructor(weight) {
        this.weight = weight;
        this.id = Math.random().toString();
    } // constructing a object with title t

    save() {
        getUserDataFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    } // storing current object in the array

    static fetchAll(cb){
        getUserDataFromFile(cb);
        //return products;
    } // it is static, it is called directly on the class no t on an instantiated object


}

// not used code