 import {
     HTTP
 }
 from "../lib/api.js"

 class CinemaRequest extends HTTP {

     readCityCinema(data) {
         return this.request({
             url: 'citycinema/read',
             data
         })
     }

     // createCinemaDetail(data) {
     //     return this.request({
     //         url: 'cinema/create',
     //         data
     //     })
     // }
 }

 export {
     CinemaRequest
 }