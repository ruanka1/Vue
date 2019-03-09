/**
 * 发送验证码
 * @param sendBy (phone|mail)
 * @param {string} receiver 手机或邮箱
 * @return {Promise}
 */

import api from "./api.js"
export function sendCode(sendBy, sendTo, onSend) {

    let action;

    if (sendBy == 'phone') {
        action = 'sms';
    } else {
        action = 'mail';
    }

    return api(`captcha/${action}`, {
            [sendBy]: sendTo
        })
        .then(r => {
            let code = atob(r.data.result)
            if (onSend)
                onSend(code);
            return code;
        });
}