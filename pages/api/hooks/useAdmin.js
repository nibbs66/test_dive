import useSWR from "swr";
import {fetcher} from "../../../components/helper/fetcher";


export default function useRegister (){

    const {data: notifications, error, isValidating, mutate} = useSWR( `/api/messages/`, fetcher)


    return{
        notifications,
        error,
        isValidating,
        mutate
    }
}
