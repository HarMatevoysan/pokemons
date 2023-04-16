export default class Funcs {
   static nameFirstChild (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
   }
   static addingZero (id) {
      if (id < 10) {
         return '#00' + id
      } else if (id < 100) {
         return '#0' + id
      } else {
         return '#' + id
      }
   }
}