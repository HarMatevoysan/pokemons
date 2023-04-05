import axios from 'axios';
export default class Service {



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
   static async getTypes () {
      const response = await axios.get('https://pokeapi.co/api/v2/type/')
      return response
   }
   static async getTypesByName (name) {
      const response = await axios.get('https://pokeapi.co/api/v2/type/' + name)
      return response
   }
}