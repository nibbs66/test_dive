import React from 'react';
import Admin from "../../../../components/layout/Admin";
import Week from "../../../../components/Calendar/Week";
import axios from "axios";

const Weekly = ({schedules}) => {
    return (
        <div>
            <Week schedules={schedules}/>
        </div>
    );
};

    export default Weekly;
    Weekly.getLayout = function getLayout(page){
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
