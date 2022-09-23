import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {RentalTableColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";

const Index = ({rentals}) => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData([])

        const createRental = async() => {
            await rentals.map((product, idx)=>{


                let stockText;


                if(product.stock > 5){

                    stockText = 'text-green-700'
                }
                if(product.stock < 5){

                    stockText = 'text-red-700'
                }


                setData( (prev)=>[...prev, {
                    id: product._id,
                    items: [

                        <span key={idx}>{product.name.slice(0, 10)}...</span>,
                        product.category,
                        product.halfDayPrice,
                        product.fullDayPrice,
                        <span  key={idx} className={`${stockText} uppercase font-bold`}>{product.stock}</span>,

                        <TableActions key={idx} link={`/admin/products/product/`} editLink={`/admin/products/edit/`}  id={product._id}/>
                    ]
                }])

            })
        }
        createRental()

    },[rentals])


    return (
        <div className={`p-10`}>
            <TableDisplay   columns={RentalTableColumns} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={data} setRows={setData}  title={'Te Huur Item'}  PageSize={10}
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
    const res = await axios.get(`https://`+host+`/api/rentalProduct`);


    return{
        props: {
            rentals: res.data,

        }
    }


};
