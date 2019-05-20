import axios from "axios";
let appKey = 'd7714b51c1a9d7d68bb559a26c151af967f0bf42a1c883297b0c1fcbe2bbcfc9';
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