# nodejs_openam





Create a file in to hold configuration values. Perhaps name it something like `./config/openam.js`. Fill it with 
OpenAM endpoints and the return point back to your application.

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
var soc_openam = require('./nodejs_openam');
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


## Work Log
2018/07/20 - Using middleware as all or nothing. If you have a valid SSO token, you're in. Otherwise, you are redirected to the SSO login. 
