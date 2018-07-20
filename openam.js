const fetch = require('node-fetch');
const openamCongif = require('../config/openam');



module.exports = {

    // validate token 
    validate: (token) => {
        return new Promise((resolve, reject) => {

            // reject if no cookie
            if (token === undefined) {
                reject('undefined');
            }

            if (token === '') {
                reject('no value');
            }

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
                        resolve(true)
                    } else {
                        reject({token: token});
                    }
                });
        });
    }
}