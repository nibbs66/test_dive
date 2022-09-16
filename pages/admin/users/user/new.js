import React from 'react';
import Admin from "../../../../components/layout/Admin";
import NewUser from "../../../../components/User/NewUser";
import axios from "axios";

const New = ({agency}) => {

    return (
        <div>
           <NewUser agency={agency}/>
        </div>
    );
};

export default New;
New.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;

    const res = await axios.get(`https://`+host+`/api/agency`);
    return{
        props:{

            agency: res.data

        }
    }

}
