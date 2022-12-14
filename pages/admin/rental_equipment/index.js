import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {RentalTableColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import useSet from '../../../hooks/useSet'

const Index = ({rentals}) => {
    const [data, setData] = useState([]);

    const [rentalCategory] = useSet([rentals, 'category'])

    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [checked, setChecked] = useState('')
    const filterColumns = [
        { header: "Category", field: "category",  sortable: true},
        { header: "Stock", field: "stock",},
    ]
    console.log(rentalCategory)
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


                    name: product.name.slice(0, 10)+'...',
                    category: product.category,
                    halfDayPrice: product.halfDayPrice,
                    fullDayPrice:  product.fullDayPrice,
                    stock: product.stock,

                    action: <TableActions key={idx} link={`/admin/rentals/product/`} editLink={`/admin/rentals/edit/`}  item={product}/>

                }])


            })
        }
        createRental()


    },[rentals])
    useEffect(()=>{
        setFilterData([])
        const stockFilter = ['< 10', '11-20', '21-30', '31-40', '41-50', '> 50']

        rentalCategory.map((item)=>{
            setFilterData((prev)=>[...prev,
                item
            ])
        })


        stockFilter.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'stock': item
            }])
        })

    },[rentalCategory])
    const handleFilter = (e, item, field) => {

        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredProducts;
        if(field === 'stock'){
            setData([])
            if(item === '< 10'){
                filteredProducts =  rentals.filter((product)=>product.stock <=10 || product.stock===undefined)
            }else if(item === '11-20'){

                filteredProducts =  rentals.filter((product)=>product.stock >10 && product.stock <=20)
            }else if(item === '21-30'){

                filteredProducts =  rentals.filter((product)=>product.stock >20 && product.stock <=30)
            }else if(item === '31-40'){

                filteredProducts =  rentals.filter((product)=>product.stock >30 && product.stock <=40)
            }else if(item === '41-50'){

                filteredProducts =  rentals.filter((product)=>product.stock >40 && product.stock <=50)
            }else{


                filteredProducts =  rentals.filter((product)=>product.stock >50)
            }


        }else {

            setData([])
            filteredProducts =  rentals.filter((product)=>  product[field] === item)
        }
        filteredProducts.map((product, idx)=>{
            setData( (prev)=>[...prev, {
                id: product._id,


                name: product.name.slice(0, 10)+'...',
                category: product.category,
                halfDayPrice: product.halfDayPrice,
                fullDayPrice:  product.fullDayPrice,
                stock: product.stock,

                action: <TableActions key={idx} link={`/admin/rentals/product/`} editLink={`/admin/rentals/edit/`}  item={product}/>

            }])

        })
    }
    const handleReset = () =>{
        setData([])
        setChecked('')
        setActiveFilter(false)
        rentals?.map((product, idx)=> {
            setData( (prev)=>[...prev, {
                id: product._id,


                name: product.name.slice(0, 10)+'...',
                category: product.category,
                halfDayPrice: product.halfDayPrice,
                fullDayPrice:  product.fullDayPrice,
                stock: product.stock,

                action: <TableActions key={idx} link={`/admin/rentals/product/`} editLink={`/admin/rentals/edit/`}  item={product}/>

            }])


        })
    }

    const handleDelete = async(product) => {
        try{
            const res = await axios.delete(`/api/rentals/${product._id}`)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
        console.log(id)
    }
    console.log(filterData)
    return (
        <div className={`p-10`}>
            <TableDisplay   columns={RentalTableColumns} tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={data} setRows={setData}  title={'Te Huur Item'}  PageSize={10} showFilter={true} activeFilter={activeFilter}
                            filterColumns={filterColumns} filterData={filterData} handleReset={handleReset} handleFilter={handleFilter}
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
