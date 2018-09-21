module.exports = class User {

    /**
     * @param {object} 
     */
    constructor(retriever) {

        this.retriever = retriever;
    }

    getUserInformation() {
        //create promise
        return new Promise((resolve, reject) => {

            //get the basic userinformation
            this.retriever.getBasicUserInformation().then(userInfo => {

                resolve(this._stripUserInformation(userInfo));
            });
        })
    }

    _stripUserInformation(userObject) {

        let user = userObject.response.user;
        return {
            firstName: user.first_name,
            lastName: user.last_name,
            userAvatar: user.user_avatar_hd,
            beerCount: user.stats.total_checkins
        };
    }

}