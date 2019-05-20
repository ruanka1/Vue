import {
    HTTP
}
from "../lib/api.js"

class CityRequest extends HTTP {
    read() {
        return this.request({
            url: 'city/read'
        })
    }
}

export {
    CityRequest
}