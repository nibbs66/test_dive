import React from 'react';
import ServiceItems from "../../../components/Admin/ServiceItems";
import Admin from "../../../components/layout/Admin";
import axios from "axios";

const Index = ({service}) => {

    return (
        <div>
            <ServiceItems serviceListing={service}/>
        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/service`);


    return{
        props: {
            service: res.data,

        }
    }


};
