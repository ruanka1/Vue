import axios from "axios";
let appKey = 'c6f6e8807f7c5e42bba17cdb31d8cd410b8976e95b8dcb909ceef85604151c7f';
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
        });
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