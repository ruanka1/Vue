import axios from "axios";
let appKey = '698087d1454e28e01c74d6f072cdafc2da99b463adcd3c1cc6c011addef376a6';
export default function api(url, data) {
    let timestamp = Date.now();
    return axios.post(`https://mock.biaoyansu.com/api/1/${url}`, data, {
            headers: {
                'BIAO-MOCK-APP-KEY': appKey,
                'BIAO-MOCK-TIMESTAMP': timestamp,
                'BIAO-MOCK-SIGNATURE': sign(appKey, timestamp),
            }
        })
        .then(r => {
            return r.data
        })
}

/**
 * 签名
 * @param appKey 
 * @param timestamp 
 * @return {string}
 */
function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}