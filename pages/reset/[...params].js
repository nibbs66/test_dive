import {useState} from 'react';
import axios from "axios";
import Client from "../../components/layout/Client";
import Reset from "../../components/Reset/Reset";
import {useRouter} from "next/router";
import Set from "../../components/Reset/Set";

const Lost = () => {
    const router = useRouter()
    const {query} = router
    const [email, setEmail] = useState({})
    const [success, setSuccess] = useState('')
    console.log(query.params)
    return (
        <div>
            {query.params?.length === 1  ? <Reset lostItem={query.params[0]}/> :
                query.params?.length === 2 ? <Set lostItem={query.params}/> :
                    <>
                    <span>something went wrong</span>
                    </>

            }
        </div>
    );
};

export default Lost;
Lost.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
