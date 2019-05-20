import axios from "axios";

const baseData = {
    base_url: 'https://mock.biaoyansu.com/api/1/',
    appKey: '2d169d27dac998e35338bd7c4b847355f83d3eab62a369b9b5ca78f28a06f2d1',
    timestamp: Date.now()
}

class HTTP {
    request({
        url,
        data = {}
    }) {
        return new Promise((resolve, reject) => {
            axios({
                url: baseData.base_url + url,
                data,
                method: 'POST',
                headers: {
                    'BIAO-MOCK-APP-KEY': baseData.appKey,
                    'BIAO-MOCK-TIMESTAMP': baseData.timestamp,
                    'BIAO-MOCK-SIGNATURE': sign(baseData.appKey, baseData.timestamp),
                }
            }).then(r => {
                resolve(r.data)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

function sign(appKey, timestamp) {
    return btoa(appKey + timestamp);
}

export {
    HTTP
}