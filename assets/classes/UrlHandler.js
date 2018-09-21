require('dotenv').config();

module.exports = class UrlHandler {

    constructor(urlObject) {
        //private vars
        let requestObject = {
            baseUrl: 'https://api.untappd.com',
            version: 'v4',
            requestCredentials: {
                client_id: process.env.UNTAPPD_CLIENT_ID,
                client_secret: process.env.UNTAPPD_CLIENT_SECRET
            },
            endpoint: urlObject.endpoint,
            access_token: urlObject.access_token,
            params: urlObject.params
        }

        //create the url
        this.url = this.constructRequestUrl(requestObject);
    }

    constructRequestUrl(requestObject) {

        let url = `${requestObject.baseUrl}/${requestObject.version}/${requestObject.endpoint}?access_token=${requestObject.access_token}`;
        
        if (typeof requestObject.params !== 'undefined') {

            let objectKeys = Object.keys(requestObject.params);
            for (let i = 0; i < objectKeys.length; i++) {

                url += `&${objectKeys[i]}=${requestObject.params[objectKeys[i]]}`;
            }
        }

        return url;
    }
}