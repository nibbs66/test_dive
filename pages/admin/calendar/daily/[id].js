import React from 'react';
import Admin from "../../../../components/layout/Admin";
import Day from "../../../../components/Calendar/Day";
import axios from "axios";

const Daily = ({schedules}) => {
    return (
        <div>
            <Day schedules={schedules}/>
        </div>
    );
};

    export default Daily;
    Daily.getLayout = function getLayout(page){
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
