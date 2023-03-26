export function getPageArray (totalpages) {
   let result = []
   for (let i = 0; i < totalpages; i++) {
      result.push(i + 1)

   }
   return result
}