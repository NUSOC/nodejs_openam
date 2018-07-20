# nodejs_openam


Create a file in to hold values. Something like `./config/openam.js`. Fill it with 
stuff like this

```
module.exports = {
    server: 'https://your.open.am.server:443/amserver?goto=',
    return: 'http://your.url:3000',
    validate: 'https://your.open.am.server:443/amserver/identity/isTokenValid?tokenid=',
    details: 'https://your.open.am.server:443/amserver/identity/attributes?subjectid='
} 

```


In App.js, set up 
```
// module and config
var soc_openam = require('./soc_openam');
var openamConfig = require('./config/openam');

// middle ware for soc_openam
app.use((req, res, next) => {
  soc_openam.validate(req.cookies.openAMssoToken)
    .then(result => {
        console.log('DEGUG: True');
        next();
    })
    .catch(err => {
      console.log('DEBUG: false')
      res.redirect(openamConfig.server + openamConfig.return);
    });
    
});
```