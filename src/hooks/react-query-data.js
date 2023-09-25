import axios from "axios";

export  async function FetchingURL () {
   try{
    const res = await axios.get('https://api.punkapi.com/v2/beers')
    
    return res.data
   } 
   catch(error){
    console.log(error)
   }
}