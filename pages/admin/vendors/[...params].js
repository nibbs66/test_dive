import React from 'react';
import Admin from "../../../components/layout/Admin";
import {useRouter} from "next/router";
import Vendors from "./index";
import VendorSelector from "../../../components/Vendors/VendorSelector";
import axios from "axios";

const VendorParams = ({vendor}) => {
    const router = useRouter()
    const {query} = router
    console.log(query.params)
    return (
    <div>
     <VendorSelector page={query.params} vendor={vendor}/>
    </div>
    );
    };

    export default VendorParams;
    VendorParams.getLayout = function getLayout(page){
        return(
            <Admin>
                {page}
            </Admin>
        )
    }
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    let getVendor;
    if(ctx.params.params.length === 1 && ctx.params.params[0] !== 'new'){
        getVendor = ctx.params.params[0]
        const res = await axios.get(`https://`+host+`/api/vendors?vendor=${getVendor}`);

        return{
            props: {
                vendor: res.data
            }
        }
    }else if(ctx.params.params.length === 2){
        getVendor = ctx.params.params[1]
        const res = await axios.get(`https://`+host+`/api/vendors?vendor=${getVendor}`);

        return{
            props: {
                vendor: res.data
            }
        }
    }else{
        return{
            props: {
                vendor: 'new'
            }
        }
    }

};
