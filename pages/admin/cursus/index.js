import React from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";

const Index = ({cursus}) => {
    return (
        <div>
            Cursus
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
    const res = await axios.get(`https://`+host+`/api/cursusDescription`);

    return{
        props: {
            cursus: res.data
        }
    }


};
