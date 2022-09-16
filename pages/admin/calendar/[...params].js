import React from 'react';
import Admin from "../../../components/layout/Admin";
import {useRouter} from "next/router";
import Calendar from "./index";
const ShowCalendar = () => {
    const router = useRouter()
    const {query} = router

    return (
    <div>
        <Calendar cal={query.params[0]}/>
    </div>
    );
    };

    export default ShowCalendar;
    ShowCalendar.getLayout = function getLayout(page){
        return(
            <Admin>
                {page}
            </Admin>
        )
    }
