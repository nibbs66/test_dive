import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {OrdersColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import toast, {Toaster} from 'react-hot-toast'
import useAdmin from '../../api/hooks/useAdmin'
import Loader from "../../../components/icons/Loader";
import useSet from "../../../hooks/useSet";
const Index = () => {
    const {
        orders,
        validateOrder,
        mutateOrder
    } = useAdmin()

    const [activeFilter, setActiveFilter] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([])
    const [searchList, setSearchList] = useState([])
    const [type] = useSet([orders, 'purchaseType', 'type'])
    const [carrier] = useSet([orders, 'shippingMethod', 'method', 'carrier'])
    const [status] = useSet([orders, 'status'])
    const [checked, setChecked] = useState('')

    const filterColumns = [
        { header: "Type", field: "type",  sortable: true },
        { header: "Carrier", field: "carrier",  sortable: true},
        { header: "Status", field: "status",  sortable: true },
        { header: "Paid", field: "paid",  sortable: true },
    ]

    useEffect(()=>{

        setData([])


        const getOrders = async()=>{
            let paymentStatus;
            await orders?.map((option, idx)=> {

                setData((prev) => [...prev, {
                    id: option._id,

                    orderId: '...' + option._id.slice(-5),
                    type: option.purchaseType,
                    total: '€' + option.total.toFixed(2),
                    carrier: option.shippingMethod.method,
                    status: option.status,
                    paid: option.total - option.amountPaid,
                    action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} item={option}/>


                }])

            })

        }
        getOrders()

    },[orders])
    useEffect(()=>{
        setFilterData([])

        carrier.map((item)=>{

            setFilterData((prev)=>[...prev,
                item
            ])
        })

        type.map((item)=>{
            setFilterData((prev)=>[...prev,
                item
            ])
        })

        status.map((item)=>{

            setFilterData((prev)=>[...prev,
                item
            ])
        })
        setFilterData((prev)=>[...prev, {paid: 'Paid'}, {paid: 'Unpaid'}])

    },[carrier, type, status])

    const handleFilter = (e, item, field) => {

        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredOrders;
        if (field === 'type') {

            setData([])
            filteredOrders =  orders.filter((order)=>order.purchaseType === item)
        }else if(field === 'carrier'){

            setData([])
            filteredOrders =  orders.filter((order)=>order.shippingMethod.method === item)

        }else if(field === 'paid'){
            setData([])
            if(item === 'Paid'){

                filteredOrders =  orders.filter((order)=> order.total-order.amountPaid === 0 )


            }else if(item === 'Unpaid'){

                filteredOrders =  orders.filter((order)=> order.total-order.amountPaid > 0)

            }
        }else {

            setData([])
            filteredOrders =  orders.filter((order)=>  order[field] === item)
        }
        console.log(filteredOrders.length)
        filteredOrders.map((option, idx)=>{
            setData( (prev)=>[...prev, {
                id: option._id,

                orderId: '...'+option._id.slice(-5),
                type: option.purchaseType,
                total: '€'+ option.total.toFixed(2),
                carrier: option.shippingMethod.method,
                status: option.status,
                paid: option.total - option.amountPaid,
                action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} item={option}/>


            }])

        })




    }
    const handleDelete = async(order) => {
        try{
            const res = await axios.delete(`/api/orders/${order._id}`)
            res.status === 200 && toast.success('Order successfully deleted.')
            mutateOrder()
        }catch(err){
            console.log(err)
        }

    }

    const handleReset = () =>{
        setData([])
        setChecked('')
        setActiveFilter(false)

        orders?.map((option, idx)=> {

            setData((prev) => [...prev, {
                id: option._id,

                orderId: '...' + option._id.slice(-5),
                type: option.purchaseType,
                total: '€' + option.total.toFixed(2),
                carrier: option.shippingMethod.method,
                status: option.status,
                paid: option.total - option.amountPaid,
                action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} item={option}/>


            }])

        })
    }

    if(validateOrder){
        return  <Loader/>
    }

    return (
        <div className={`p-10`}>

            <TableDisplay  columns={OrdersColumns} tableTitle={true} showFilter={true} font={'text-slate-800'} textSize={'text-3xl'} activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                           rows={data} setRows={setData} handleReset={handleReset}  title={'Order'} checked={checked}  PageSize={10} display={`order`} handleFilter={handleFilter} filterColumns={filterColumns} filterData={filterData}
            />

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
