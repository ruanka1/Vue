import {
    HTTP
}
from "../lib/api.js"

class HomeRequest extends HTTP {
    read(data) {
        return this.request({
            url: 'citymovie/read',
            data
        })
    }

    // create(data) {
    //     return this.request({
    //         url: 'movie/create',
    //         data
    //     })
    // }

    readMovieDetail(data) {
        return this.request({
            url: 'movie/read',
            data
        })
    }

    readComment(data) {
        return this.request({
            url: "comment/read",
            data
        })
    }

    createComment(data) {
        return this.request({
            url: "comment/create",
            data
        })
    }

    search(data) {
        return this.request({
            url: 'movie/read',
            data
        })
    }
}

export {
    HomeRequest
}