import React from 'react';
import Admin from "../../../../components/layout/Admin";
import Month from "../../../../components/Calendar/Month";
import axios from "axios";
import {useRouter} from "next/router";

const Monthly = ({schedules}) => {
const router = useRouter()
    const {query} = router
    console.log(query)
    return (
        <div>
            <Month schedules={schedules} toShow={query.id}/>
        </div>
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
    const res = await axios.get(`http://`+host+`/api/time`);

    return {
        props: {
            schedules: res.data,



        },
    }
}
