import React from 'react';
import Admin from "../../../components/layout/Admin";
import {useRouter} from "next/router";

import CursusDisplay from "../../../components/Admin/Cursus/CursusDisplay";
import axios from "axios";
const Cursus = ({cursus}) => {
    const router = useRouter()
    const {query} = router

    return (
    <div>
       <CursusDisplay page={query.params} cursus={cursus}/>
    </div>
    );
    };

    export default Cursus;
    Cursus.getLayout = function getLayout(page){
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
