import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {OrdersColumns, userColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import toast, {Toaster} from 'react-hot-toast'
const Index = ({orders}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData([])

        orders.map((option, idx)=>{
            let newStatus;
            let text;
            let newTotal;
            if(option.status === 0){
                newStatus = 'Received'
                text = 'text-blue-700'

            }
            if(option.status === 1){
                if(option.shippingMethod?.method === 'Winkel'){
                    newStatus = 'Ready'
                }else{
                    newStatus = 'Ready-Ship'
                }
                text = 'text-orange-500'
            }
            if(option.status === 2){
                newStatus = 'Shipped'
                text = 'text-green-700'
            }
            if(option.status === 3){
                newStatus = 'Delivered'
                text='text-slate-700'
            }
            if(option.status === 4){
                newStatus = 'Cancelled'
                text = 'text-red-700'
            }
            if(option.total){
                newTotal = '€'+ option.total.toFixed(2)
            }

            if(!option.amountPaid || (option.total - option.amountPaid === 0)){
                setData( (prev)=>[...prev, {
                    id: option._id,

                    orderId: <span key={idx}>{ option._id.slice(0,5)}...</span>,
                    type: option.purchaseType,
                    total: newTotal,
                    carrier: option.shippingMethod.method,
                    status: option.status,
                    action: <TableActions key={idx} link={`/admin/orders/`} handleDelete={handleDelete} id={option._id}/>


                }])
            }

        })


    },[orders])
    const handleDelete = async(id) => {
        try{
            const res = await axios.delete(`/api/orders/${id}`)
            res.status === 200 && toast.success('Order successfully deleted.')
        }catch(err){
            console.log(err)
        }
        console.log(id)
    }

    return (
        <div className={`p-10`}>
            <Toaster toastOptions={{className: 'text-center', duration: 5000,}}/>
            <TableDisplay   columns={OrdersColumns} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={data} setRows={setData}  title={'Order'}  PageSize={10}
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
export const getServerSideProps = async(ctx) => {
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/orders`);


    return{
        props: {
            orders: res.data,

        }
    }


};
