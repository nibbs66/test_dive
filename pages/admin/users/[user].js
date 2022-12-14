import React, {useEffect, useState} from 'react';



import axios from "axios";
import {useRouter} from "next/router";
import {userColumns} from "../../../tableData";



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

                avatar: <div className={`flex w-full justify-center`}><span className={`flex   items-center justify-center h-8 w-8 bg-blue-500/40 drop-shadow-lg text-slate-600 font-bold rounded-full `}>{option.firstName[0].toUpperCase() + option.lastName[0].toUpperCase()}</span></div>,
                name: option.firstName+' '+option.lastName,
                email: option.personal.email,
                phone: option.personal.phone,
                action: <TableActions key={idx} link={`/admin/users/${user}/`} editLink={`/admin/users/edit/`} item={option}/>

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
    const session = await getSession(ctx)
    if(!session.isAdmin){
        return{
            redirect: {
                destination: "/admin",
                permanent: false,
            }
        }
    }

    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/users?group=${ctx.params.user}`);

    return{
        props: {
            customers: res.data,

        }
    }


};
