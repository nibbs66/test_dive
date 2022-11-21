import {useState, useEffect} from 'react';
import TableActions from "../../Table/TableActions";
import axios from "axios";
import TableDisplay from "../../Table/TableDisplay";
import {SalesColumns} from "../../../tableData";
import useSet from "../../../hooks/useSet";
import dayjs from "dayjs-with-plugins";

const SalesPage = ({sales}) => {
    const [data, setData] = useState([])
    const [activeFilter, setActiveFilter] = useState(false);
    const [filterData, setFilterData] = useState([])
    const [searchList, setSearchList] = useState([])
    const [checked, setChecked] = useState('')

    const [source] = useSet([sales, 'purchaseType'])
    const filterColumns = [
        { header: "Source", field: "purchaseType",  sortable: true},
        { header: "Date", field: "salesDate",  sortable: true},
        { header: "Total", field: "total",  sortable: true },
    ]

    useEffect(()=>{
        setData([])
        const getSales = async() => {
            await sales.map((sale, idx)=>{

                setData((prev)=>[...prev, {
                    id: sale._id,
                    salesId: '...'+sale._id.slice(-5),
                    total: '€'+ sale.total.toFixed(2),
                    salesDate: dayjs(sale.createdAt).format('DD MMM YYYY'),
                    source: sale.purchaseType,

                    action: <TableActions key={idx} link={`/admin/sales/`} handleDelete={handleDelete} item={sale}/>,
                }])
            })
        }
        getSales()
    },[sales])
    useEffect(()=>{
        setFilterData([])
        const salesFilter =['< €100.00', '€101-300', '€301-500', '> €501.00']
        const salesDateFilter = ['< 30 days', '1-3 months', '3-6 months', '6-12 months', '>12 months']

        source.map((item)=>{
            setFilterData((prev)=>[...prev,
                item
            ])
        })
        salesFilter.map((item)=>{
            setFilterData((prev)=>[...prev,
                {'total': item}
            ])
        })
        salesDateFilter.map((item)=>{
            setFilterData((prev)=>[...prev,
                {'salesDate': item}
            ])
        })
    },[source])
    const handleDelete = async(sale) => {
        try{
            const res = await axios.delete(`/api/sales/${sale._id}`)
            res.status === 200 && toast.success('Sale successfully deleted.')

        }catch(err){
            console.log(err)
        }
    }
const handleReset = () => {
    setData([])
    setChecked('')
    setActiveFilter(false)
    sales.map((sale, idx)=>{

        setData((prev)=>[...prev, {
            id: sale._id,
            salesId: '...'+sale._id.slice(-5),
            total: '€'+ sale.total.toFixed(2),
            salesDate: dayjs(sale.createdAt).format('DD MMM YYYY'),
            source: sale.purchaseType,

            action: <TableActions key={idx} link={`/admin/sales/`} handleDelete={handleDelete} item={sale}/>,
        }])
    })
}
const handleFilter = (e, item, field) => {

    setChecked(e.target.value)
    setActiveFilter(true)
    let filteredSales;
    if(field === 'total'){
        setData([])
        if(item === '< €100.00'){
            filteredSales = sales.filter((sale)=>sale.total <= 100)

        }else if(item === '€101-300'){
            filteredSales = sales.filter((sale)=>sale.total > 100 && sale.total <= 300)

        }else if(item === '€301-500'){
            filteredSales = sales.filter((sale)=>sale.total > 301 && sale.total <= 500)
        }else if(item === '> €501.00'){
            filteredSales = sales.filter((sale)=>sale.total > 500)
        }

    }else if(field === 'salesDate'){
        setData([])
        if(item === '< 30 days'){
            filteredSales = sales.filter(date=>dayjs(date.createdAt).isSameOrAfter(dayjs().subtract(1, 'month')))
        }else if(item ===  '1-3 months'){
            filteredSales = sales.filter(date=>dayjs(date.createdAt).isBetween(dayjs().subtract(1, 'month'), dayjs().subtract(3, 'month')))
        }else if(item === '3-6 months'){
            filteredSales = sales.filter(date=>dayjs(date.createdAt).isBetween(dayjs().subtract(3, 'month'), dayjs().subtract(6, 'month')))
        }else if(item ===  '6-12 months'){
            filteredSales = sales.filter(date=>dayjs(date.createdAt).isBetween(dayjs().subtract(6, 'month'), dayjs().subtract(12, 'month')))
        }else{
            filteredSales = sales.filter(date=>dayjs(date.createdAt).isBefore(dayjs().subtract(1, 'year')))
        }
    }else{
        setData([])
        filteredSales = sales.filter((sale) => sale[field] === item )
    }

        filteredSales.map((sale, idx)=>{
            setData((prev)=>[...prev, {
                id: sale._id,
                salesId: '...'+sale._id.slice(-5),
                total: '€'+ sale.total.toFixed(2),
                salesDate: dayjs(sale.createdAt).format('DD MMM YYYY'),
                source: sale.purchaseType,

                action: <TableActions key={idx} link={`/admin/sales/`} handleDelete={handleDelete} item={sale}/>,
            }])

        })
}

    return (
        <div className={`p-10`}>
            <TableDisplay  columns={SalesColumns} tableTitle={true} showFilter={true} font={'text-slate-800'} textSize={'text-3xl'} activeFilter={activeFilter} setActiveFilter={setActiveFilter}
                           rows={data} setRows={setData} handleReset={handleReset}  title={'Sale'} checked={checked}  PageSize={10} display={`order`} handleFilter={handleFilter} filterColumns={filterColumns} filterData={filterData}
            />

        </div>
    );
};

export default SalesPage;
