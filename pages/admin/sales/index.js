import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import TableActions from "../../../components/Table/TableActions";
import SalesPage from "../../../components/Admin/Sales/SalesPage";

const Index = ({sales}) => {

    return (
        <div>
          <SalesPage sales={sales}/>
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
export async function getServerSideProps (ctx){
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/sales`);

    return {
        props: {
            sales: res.data,
        },
    }

}
