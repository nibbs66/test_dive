import React, {useState, useEffect} from 'react';

import {useRouter} from "next/router";

import Check from "../../../components/icons/Check";
import Edit from "../../../components/icons/Edit";
import dayjs from "dayjs";
import axios from "axios";
import {certificationColumns, orderColumns} from "../../../tableData";



import CardDisplay from "../../../components/Card/CardDisplay";
import Card from "../../../components/Card/Card";
import Accordion from "../../../components/Accordion/Accordion"
import Table from "../../../components/Table/Table"
import TableDisplay from "../../../components/Table/TableDisplay";
import ShowUser from "../../../components/User/ShowUser"
import EditUser from "../../../components/User/EditUser";
import Admin from "../../../components/layout/Admin";


const  Person = ({user, orders}) => {
    const router = useRouter()
    const {params} = router.query
    const [data, setData] = useState([])
    const [diving, setDiving] = useState([]);
    const [active, setActive] = useState(true)
    const [activeSince, setActiveSince] = useState('')
    const [section, setSection] = useState('')
    const [editInput, setEditInput] = useState('')


console.log(params[0])


    useEffect(()=>{

        setDiving([])
        user.experience.map((cert)=>{

            setDiving((prev)=>[...prev, {
                id: cert._id,
                items: [
                    cert.diverNumber,
                    cert.certificationAgency,
                    dayjs(user.experience.date).format('DD MMM YYYY'),
                    cert.instructorNumber,
                    cert.certificationLevel[0],
                ]
            }])
        })


    },[user, params])
    useEffect(()=>{
        setData([])
        orders.map((option)=>{

            setData( (prev)=>[...prev, {
                id: option._id,
                items: [
                    `${option._id.slice(0, 5)}...`,
                    dayjs(option.createdAt).format('DD MMM YYYY'),
                    option.items.length,
                    `€${option.total.toFixed(2)}`,
                ]
            }])



        })
    },[orders])

    const handleClick = (data) => {
        if(section !==data){
            setSection(data)
        }else{
            setSection('')
        }
    }
    const handleEdit = () =>{
        setActive(false)
    }


    return (
        < >
            {(params[0] === 'edit') ?  <EditUser  user={user}/>:
                <ShowUser user={user} orders={orders}/>}
        </>
    );
};

export default Person;

Person.getLayout = function getLayout(page){
    return(
        <Admin>
            {page}
        </Admin>
    )
}
export const getServerSideProps = async (ctx) =>{
    const host = ctx.req.headers.host;
    let id= ctx.params.params[1]

    const res = await axios.get(`http://`+host+`/api/users/${id}`);
    const order = await axios.get(`http://`+host+`/api/orders?id=${id}`)
    return{
        props:{
            user: res.data,
            orders: order.data

        }
    }
};

