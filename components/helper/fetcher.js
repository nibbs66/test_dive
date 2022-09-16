import axios from "axios";


export const fetcher = async(url) => {
    try{
        const res = await axios.get(url)

        const {data} = await res
        return data
    }catch(err){
        console.log(err)
    }
}
