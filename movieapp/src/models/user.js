import {
    HTTP
}
from "../lib/api.js"

class UserRequest extends HTTP {

    loginValidate(data) {
        return this.request({
            url: 'user/first',
            data
        })
    }


    validateExist(data) {
        return this.request({
            url: 'user/exists',
            data
        })
    }

    createUser(data) {
        return this.request({
            url: 'user/create',
            data
        })
    }

    sendCaptcha(data) {
        return this.request({
            url: 'captcha/sms',
            data
        }).then(r => {
            let code = atob(r.data.result)
            return code;
        });
    }
}


export {
    UserRequest
}