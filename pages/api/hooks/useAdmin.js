import useSWR from "swr";
import {fetcher} from "../../../components/helper/fetcher";


export default function useRegister (){

    const {data: messages, error, isValidating, mutate} = useSWR( `/api/messages/`, fetcher)


    return{
        messages,
        error,
        isValidating,
        mutate
    }
}
