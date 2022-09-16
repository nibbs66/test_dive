import useSWR from "swr";
import {fetcher} from "../../../components/helper/fetcher";


export default function useRegister (){

    const {data: user, error, isValidating, mutate} = useSWR( `/api/users/`, fetcher)


    return{
        user,
        error,
        isValidating,
        mutate
    }
}
