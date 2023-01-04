import React from 'react';
import Admin from "../../../components/layout/Admin";
import Month from "../../../components/Calendar/Month";
import axios from "axios";
import {useRouter} from 'next/router'
import CalendarViewSelector from "../../../components/Calendar/CalendarViewSelector";
const Monthly = ({schedules, cursus}) => {
    const router = useRouter()
    const {query} = router
    console.log(query.params)
    return (
        <>
            <CalendarViewSelector schedules={schedules} cursus={cursus} viewSelector={query.params}/>
        </>
    );
};

export default Monthly;
Monthly.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/time`);
    const course = await axios.get(`https://`+host+`/api/cursusDescription`);

    return {
        props: {
            schedules: res.data,
            cursus: course.data,



        },
    }
}
