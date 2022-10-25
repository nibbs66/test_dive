import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {OrdersColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import toast, {Toaster} from 'react-hot-toast'
import useAdmin from '../../api/hooks/useAdmin'
import Loader from "../../../components/icons/Loader";
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
    const [type, setType] = useState([])
    const [carrier, setCarrier] = useState([])
    const [status, setStatus] = useState([])
    const [checked, setChecked] = useState('')
    const filterColumns = [
        { header: "Type", field: "type",  sortable: true },
        { header: "Carrier", field: "carrier",  sortable: true},
        { header: "Status", field: "status",  sortable: true },
    ]

    useEffect(()=>{

        setData([])
        setCarrier([])
        setType([])
        setStatus([])


        const getOrders = async()=>{
            await orders?.map((option, idx)=>{
                if(!option.amountPaid || (option.total - option.amountPaid === 0)){
                    setData( (prev)=>[...prev, {
                        id: option._id,

                        orderId: '...'+option._id.slice(-5),
                        type: option.purchaseType,
                        total: '€'+ option.total.toFixed(2),
                        carrier: option.shippingMethod.method,
                        status: option.status,
                        action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} id={option._id}/>


                    }])
                }
                setSearchList((prev)=>[...prev, {

                    type: option.purchaseType,
                    carrier: option.shippingMethod.method,
                    status: option.status,

                }])

                setType((prev)=>[...prev, option.purchaseType])
                setCarrier((prev)=>[...prev, option.shippingMethod.method])
                setStatus((prev)=>[...prev, option.status])
            })

        }
        getOrders()

    },[orders])
    useEffect(()=>{
        setFilterData([])
        const carrierSet = [...new Set(carrier)]
        carrierSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'carrier': item
            }])
        })
        const typeSet = [...new Set(type)]
        typeSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'type': item
            }])
        })
        const statusSet = [...new Set(status)]
        statusSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'status': item
            }])
        })


    },[searchList])
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

        }else {

            setData([])
            filteredOrders =  orders.filter((order)=>  order[field] === item)
        }
        filteredOrders.map((option, idx)=>{
            setData( (prev)=>[...prev, {
                id: option._id,

                orderId: '...'+option._id.slice(-5),
                type: option.purchaseType,
                total: '€'+ option.total.toFixed(2),
                carrier: option.shippingMethod.method,
                status: option.status,
                action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} id={option._id}/>


            }])

        })



    }
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`/api/orders/${id}`)
            res.status === 200 && toast.success('Order successfully deleted.')
            mutateOrder()
        }catch(err){
            console.log(err)
        }
        console.log(id)
    }
    if(validateOrder){
        return  <Loader/>
    }
    const handleReset = () =>{
        setData([])
        setChecked('')
        setActiveFilter(false)
        orders?.map((option, idx)=> {
            if (!option.amountPaid || (option.total - option.amountPaid === 0)) {
                setData((prev) => [...prev, {
                    id: option._id,

                    orderId: '...' + option._id.slice(-5),
                    type: option.purchaseType,
                    total: '€' + option.total.toFixed(2),
                    carrier: option.shippingMethod.method,
                    status: option.status,
                    action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} id={option._id}/>


                }])
            }
        })
    }

    return (
        <div className={`p-10`}>
            <Toaster toastOptions={{className: 'text-center', duration: 5000,}}/>
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
