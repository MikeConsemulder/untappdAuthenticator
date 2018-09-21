const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const RequestHandler = require("./assets/classes/RequestHandler");

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set the port, if there is no env port use 8080 / heroku stuff,, you know
var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
var router = express.Router();
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
app.listen(port);

console.log('server started on port: ' + port);

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to my api! Now go away' });
});

router.route('/authenticateUser').get(function (req, res) {

    if (req.headers.hasOwnProperty('code')) {

        let code = req.headers.code;
        getToken(code).then(TokenObject => {

            //send the token back
            if (typeof TokenObject.response.access_token != 'undefined') {

                res.json({ token: TokenObject.response.access_token });
            } else {
                res.json({ message: TokenObject });
            }
        });
    } else {

        res.json({ message: 'no code provided' });
    }
});

function getToken(code) {

    const url = constructUrl(code);

    const urlObject = {
        method: 'GET',
        url: url
    }
    const requestHandler = new RequestHandler(urlObject);
    return requestHandler.doRequest().then(returnValues => {

        return returnValues;
    })
}

function constructUrl(code) {

    const clientId = process.env.UNTAPPD_CLIENT_ID;
    const clientSecret = process.env.UNTAPPD_CLIENT_SECRET;
    let url = 'https://untappd.com/oauth/authorize/?';
    url += `client_id=${clientId}`;
    url += `&client_secret=${clientSecret}`;
    url += '&response_type=code';
    url += '&redirect_url=http://untappd.kingmike.nl/visualize';
    url += `&code=${code}`;
    return url;
}