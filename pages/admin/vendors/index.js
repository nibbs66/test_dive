import {useState, useEffect} from 'react';
import Admin from "../../../components/layout/Admin";
import axios from "axios";
import {VendorColumns} from "../../../tableData";
import TableActions from "../../../components/Table/TableActions";
import TableDisplay from "../../../components/Table/TableDisplay";
import useAdmin from '../../api/hooks/useAdmin'
import Loader from "../../../components/icons/Loader";
import toast, {Toaster} from 'react-hot-toast'
import app from "../../../lib/firebase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject} from "firebase/storage";

const Index = ({vendors}) => {
    const [rows, setRows] = useState([]);
    const [filterManufacturer, setFilterManufacturer] = useState([])
    const [filterCategory, setFilterCategory] = useState([])
    const [filterIsNew, setFilterIsNew] = useState([])
    const [filterStock, setFilterStock] = useState([])
    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [checked, setChecked] = useState('')
    const [deleteProduct, setDeleteProduct] = useState(false)
    const {

        validateProduct,
        mutateProduct
    } = useAdmin()
    const filterColumns = [
        { header: "Vendor", field: "vendor", },
        { header: "Website", field: "category",  sortable: true},
        { header: "New", field: "isNew",   },
        { header: "Stock", field: "stock",   },
    ]

    useEffect(()=>{
        setRows([])
        setFilterManufacturer([])
        setFilterCategory([])
        setFilterIsNew([])
        setFilterStock([])
        //category: vendor?.categories[0],
        vendors?.map((vendor, idx)=>{

            setRows( (prev)=>[...prev, {
                id: vendor._id,
                vendor: vendor.vendor,

                link: vendor?.link,
                address: vendor?.address,
                city: vendor?.city,
                contact: vendor?.contact,
                phone: vendor?.phone,
                email: vendor?.email,
                action: <TableActions key={idx} link={`/admin/vendors/`} editLink={`/admin/vendors/edit/`} handleDelete={handleDelete}  item={vendor}/>

            }])
            setFilterManufacturer((prev)=>[...prev, vendor.vendor])
            setFilterCategory((prev)=>[...prev, vendor.category])
            setFilterIsNew((prev)=>[...prev, vendor.new])
            setFilterStock((prev)=>[...prev, vendor.stock])
        })

    },[vendors])
    useEffect(()=>{
        setFilterData([])
        const stockFilter = ['< 10', '11-20', '21-30', '31-40', '41-50', '> 50']
        const filterManufacturerSet = [...new Set(filterManufacturer)]
        filterManufacturerSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'vendor': item
            }])
        })
        const filterCategorySet = [...new Set(filterCategory)]
        filterCategorySet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'category': item
            }])
        })
        const filterIsNewSet = [...new Set(filterIsNew)]
        filterIsNewSet.map((item)=>{
            if(item !==undefined){
                setFilterData((prev)=>[...prev, {
                    'isNew': item
                }])
            }

        })
        const stockFilterSet = [...new Set(stockFilter)]
        stockFilterSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'stock': item
            }])
        })


    },[filterManufacturer])

    const handleDelete = async(vendor) => {
        console.log(vendor)
        if(vendor.img){
            const storage = getStorage(app);
            const fileRef = ref(storage, vendor.img);
            deleteObject(fileRef).then(async() =>{
                toast.success('Image Successfully Deleted')
            }).catch((error) => {

                console.log(error)
                toast.error('Uh-oh, an error occurred!')

                // Uh-oh, an error occurred!
            });
        }
        try{
            const res = await axios.delete(`/api/vendors/${vendor._id}`)
            res.status === 200 && toast.success('Vendor successfully deleted.')
            mutateProduct()
        }catch(err){
            console.log(err)
        }


    }
    const handleFilter = (e, item, field) => {

        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredProducts;
        if (field === 'category') {

            setRows([])
            filteredProducts =  vendors.filter((vendor)=>vendor.categories[0] === item)
        }else if(field === 'isNew'){
            setRows([])
            filteredProducts =  vendors.filter((vendor)=>vendor.new === item )
        }else if(field === 'stock'){
            setRows([])
            if(item === '< 10'){
                filteredProducts =  vendors.filter((vendor)=>vendor.stock <=10 || vendor.stock===undefined)
            }else if(item === '11-20'){

                filteredProducts =  vendors.filter((vendor)=>vendor.stock >10 && vendor.stock <=20)
            }else if(item === '21-30'){

                filteredProducts =  vendors.filter((vendor)=>vendor.stock >20 && vendor.stock <=30)
            }else if(item === '31-40'){

                filteredProducts =  vendors.filter((vendor)=>vendor.stock >30 && vendor.stock <=40)
            }else if(item === '41-50'){

                filteredProducts =  vendors.filter((vendor)=>vendor.stock >40 && vendor.stock <=50)
            }else{


                filteredProducts =  vendors.filter((vendor)=>vendor.stock >50)
            }


        }else {

            setRows([])
            filteredProducts =  vendors.filter((vendor)=>  vendor[field] === item)
        }
        filteredProducts.map((vendor, idx)=>{
            setRows( (prev)=>[...prev, {
                id: vendor._id,
                vendor: vendor.vendor,
                name: vendor.name.slice(0, 10)+'...',
                category: vendor.category,
                cost: vendor.cost,
                price: vendor.price.toFixed(2),
                stock: vendor.stock,
                isNew: vendor.new,
                action: <TableActions key={idx} link={`/admin/vendors/vendor/`} editLink={`/admin/vendors/edit/`} handleDelete={handleDelete}  item={vendor}/>

            }])

        })

        /*
        else if(field === 'carrier'){

                    setRows([])
                    filteredProducts =  vendors.filter((vendor)=>vendor.shippingMethod.method === item)

                }
        */

    }
    const handleReset = () =>{
        setRows([])
        setChecked('')
        setActiveFilter(false)
        vendors?.map((vendor, idx)=> {
            setRows( (prev)=>[...prev, {
                id: vendor._id,
                vendor: vendor.vendor,
                name: vendor.name.slice(0, 10)+'...',
                category: vendor.vendor,
                cost: vendor.cost,
                price: vendor.price.toFixed(2),
                stock: vendor.stock,
                isNew: vendor.new,
                action: <TableActions key={idx} link={`/admin/vendors/vendor/`} editLink={`/admin/vendors/edit/`} handleDelete={handleDelete}  item={vendor}/>

            }])

        })
    }

    return (
        <div className={`p-10`}>
            <Toaster toastOptions={{className: 'text-center', duration: 5000,}}/>
            <TableDisplay   columns={VendorColumns}  tableTitle={true} font={'text-slate-800'} textSize={'text-3xl'}
                            rows={rows} setRows={setRows}  title={'Vendor'}   handleReset={handleReset}
                            PageSize={10}
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
export async function getServerSideProps(ctx){
    const host = ctx.req.headers.host;
    const res = await axios.get(`https://`+host+`/api/vendors`)
    return{
        props: {
            vendors: res.data
        }
    }

}
