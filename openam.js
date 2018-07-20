const fetch = require('node-fetch');
const openamCongif = require('../config/openam');



module.exports = {




    // Validate token through a Promise. Rejection includes token not 
    // existing or being blank. 
    validate: (token) => new Promise((resolve, reject) => {

        // reject if no cookie
        if (token === undefined) {
            reject('undefined');
        }

        if (token === '') {
            reject('no value');
        }

        // hit endpoint to validate token
        const validate_url = openamCongif.validate + token;
        fetch(validate_url)
            .then(result => result.text())
            .then(body => {
                console.log({
                    body: body,
                    cookie: token,
                    validate_url: validate_url
                });

                if (body.indexOf('true') >= 0) {
                    console.log('token valid')
                    resolve(true)
                } else {
                    console.log('token invalid')
                    reject(false);
                }
            });
    }),


    //Get Details 
    getDetails: (token) => new Promise((resolve, reject) => {
        fetch(openamCongif.details + token)
            .then(result => result.text())
            .then(body => {

                const bodyParts = body.split("\n");
                let bodyObject={};                
                
                let index = 1;
                while (index < bodyParts.length) {
                    let key = bodyParts[index].split('=')[1]
                    let val = bodyParts[index + 1].split('=')[1]
                    bodyObject[key]=val
                    index++;
                    index++;                    
                }
                
                resolve(bodyObject);
            })
            .catch((err)=>reject(err));
    })


}