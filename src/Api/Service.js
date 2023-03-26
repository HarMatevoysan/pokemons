import axios from 'axios';
export default class Service {


   static async getAll (url, limit = 20, offset = 0) {

      const response = await axios.get(url, {
         params: {
            limit: limit,
            offset: offset,
         }
      })
      return response

   }
   static async getAlls (url, limit = 1280) {

      const response = await axios.get(url, {
         params: {
            limit: limit,

         }
      })
      return response

   }
   static async getByName (url, name) {

      const response = await axios.get(url + '/' + name)
      return response

   }



   static async getPoc (url) {
      return new Promise((resolve, reject) => {
         fetch(url)
            .then(res => res.json())
            .then(data => {
               resolve(data);
            })
      })
   }
}