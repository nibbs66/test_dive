import React, {useEffect, useState} from 'react';


import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";
import {userColumns} from "../../../tableData";
import Eye from "../../../components/icons/Eye";
import TrashCan from "../../../components/icons/TrashCan";


import TableDisplay from "../../../components/Table/TableDisplay"
import Admin from "../../../components/layout/Admin";
import TableActions from "../../../components/Table/TableActions";
import {getSession} from "next-auth/react";

const Customers = ({customers}) => {

    const router = useRouter()
    const {user} = router.query
    const [data, setData] = useState([]);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));

    };
    useEffect(()=>{
        setData([])
        customers.map((option, idx)=>{
            setData( (prev)=>[...prev, {
                id: option._id,
                items: [
                    option.firstName[0].toUpperCase()+option.lastName[0].toUpperCase(),
                    option.firstName+' '+option.lastName,
                    option.personal.email,
                    option.personal.phone,
                    <TableActions key={idx} link={`/admin/users/${user}/`} editLink={`/admin/users/edit/`} id={option._id}/>
                ]
            }])

        })


    },[user,customers])

    console.log(user)
    return(
        <div className={' flex p-10 '}>

            <TableDisplay   columns={userColumns} tableTitle={true} font={'text-slate-800'} textSize={'lg:text-3xl'}
                            rows={data} setRows={setData} title={user}  PageSize={10} link={`/admin/users/${user}/`}
            />
        </div>
    )
};

export default Customers;
Customers.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async(ctx) => {

    const host = ctx.req.headers.host;
    const res = await axios.get(`http://`+host+`/api/users?group=${ctx.params.user}`);

    return{
        props: {
            customers: res.data,

        }
    }


};
