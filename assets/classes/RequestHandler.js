let request = require("request");
module.exports = class RequestHandler {

    /**
     * @param {object} 
     */
    constructor(urlObject) {

        this.method = urlObject.method;
        this.url = urlObject.url;
    }

    /**
     * Do the request
     */
    doRequest() {

        return new Promise((resolve, reject) => {
            request({
                method: this.method,
                uri: this.url,
            }, function (error, response, body) {

                if (!error) {
                    //return the parsed body
                    resolve(JSON.parse(body));
                } else {

                    console.log('error');
                    console.log(response, body, error);

                    reject(error);
                }
            });
        });
    }
}