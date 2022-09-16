import React from 'react';
import Calendar from "./index";
import Admin from "../../../components/layout/Admin";
import {useRouter} from "next/router";

const SubCalendars = () => {
    const router = useRouter()
    const {id} = router.query
    console.log('query', id)
    return (
        <div>
            <div>
                <Calendar cal={id} />
            </div>
        </div>
    );
};

    export default SubCalendars;
SubCalendars.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
