import {useEffect, useState} from 'react';
import Admin from "../../components/layout/Admin";
import dayjs from "dayjs";
import axios from "axios";
import Chart2 from "../../components/Admin/Charts/Chart2";
import HeaderCards from "../../components/Admin/Card/DashboardCards/HeaderCards";
import {getToken} from "next-auth/jwt";
import {DashboardOrders, DashboardUsers} from "../../tableData";
import Link from "next/link";
import TableDisplay from "../../components/Table/TableDisplay";
import {getSession} from "next-auth/react";


const Index = ({orders, income, customers, sales}) => {
    const [data, setData] = useState([])
    const [orderData, setOrderData] = useState([])

    useEffect(()=>{
        setData([])
        const tableView = customers.slice((customers.length-5))

        tableView.reverse().map((option)=>{
            setData( (prev)=>[...prev, {
                id: option._id,

                name: option.firstName+' '+option.lastName,
                email: option.personal.email,

                view: <Link  href={`/admin/users/customer/${option._id}`} style={{textDecoration: "none"}} >
                    <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>View</button>
                </Link>


            }])
        })

    },[customers])
    useEffect(()=>{
        setOrderData([])
        const orderView = orders.slice(orders.length-5)
        orderView.reverse().map((item)=>{
            let newStatus;
            let text;
            if(item.status === 0){
                newStatus = 'Received'
                text = 'text-blue-700'
            }
            if(item.status === 1){
                newStatus = 'Ready-Ship'
                text = 'text-orange-500'
            }
            if(item.status === 2){
                newStatus = 'Shipped'
                text = 'text-green-700'
            }
            if(item.status === 3){
                newStatus = 'Delivered'
                text='text-slate-700'
            }
            if(item.status === 4){
                newStatus = 'Cancelled'
                text = 'text-red-700'
            }


            setOrderData( (prev)=>[...prev, {
                id: item._id,

                customer: item._id.slice(0,5),
                date: dayjs(item.createdAt).format('DD MMM YYYY'),
                type: item.purchaseType,
                amount: <span>€{item.total.toFixed(2)}</span>,
                status: item.status,
                view: <Link  href={`/admin/orders/${item._id}`} style={{textDecoration: "none"}} passHref>
                    <button className={'bg-blue-500 font-bold uppercase text-white rounded py-1 px-2 text-xs'}>View</button>
                </Link>


            }])
        })

    },[orders])


    return (
        <div className=' container flex flex-col  gap-16 bg-slate-200/70'>
            <div className={`grid grid-cols-5`}>
                <HeaderCards data={income} orders={orders} sales={sales} title={'Web'} orderCat={`Web-Shop`}  bg={'bg-[#61828A]/50'} box={true}/>
                <HeaderCards data={income} orders={orders} sales={sales} title={'Winkel'} orderCat={`Winkel`}  bg={'bg-[rgba(0,191,255,0.5)]'} box={true}/>
                <HeaderCards data={income} orders={orders} sales={sales} title={'Huur'} orderCat={`Te Huur`} bg={'bg-[#143AA2]/40'} box={true}/>
                <HeaderCards data={income} orders={orders} sales={sales} title={'Cursus'} orderCat={`Cursus`}  bg={'bg-[rgba(102,205,170,0.5)]'} box={true}/>
                <HeaderCards data={income} orders={orders} sales={sales} title={'Service'} orderCat={`Service`} bg={'bg-[rgba(239,68,68,0.5)]'} box={true}/>
            </div>
            <Chart2 winkel={orders}/>
            <div className={`flex justify-center gap-2 mb-5 px-5`}>
                <div className={`flex`}>
                    <TableDisplay tableTitle={true} title={'New User'} font={'text-slate-500'} textSize={'lg:text-xl'} rows={data} columns={DashboardUsers}
                                  PageSize={5} />
                </div>
                <div className={`flex`}>
                    <TableDisplay tableTitle={true} title={'Recent Transaction'} rows={orderData} font={'text-slate-500'} textSize={'lg:text-xl'}  columns={DashboardOrders}
                                  PageSize={5} />
                </div>
            </div>
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
export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    if(!session){
        return{
            redirect: {
                destination: "/login",
                permanent: false,
            }
        }
    }
    else if(session){
        if(!session.isEmployee){
            return{
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            }
        }
    }
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/orders/income`);
    const range = await axios.get(`https://`+host+`/api/orders`);
    const sales = await axios.get(`https://`+host+`/api/sales`);
    const user = await axios.get(`https://`+host+`/api/users?group=customer`);
    return {
        props: {
            income: res.data,
            sales: sales.data,
            orders: range.data,
            customers: user.data,
            token: await getToken(ctx)


        },
    }
}
