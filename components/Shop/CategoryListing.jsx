import {useMemo, useState, useEffect} from 'react';
import ClientHeader from "../ClientHeader";
import NewCard from "../Card/NewCard";
import NoPic from "../icons/NoPic";
import Paginate from "../Paginate/Paginate";
import Image from "next/image";
import Filters from "../Filters";


const CategoryListing = ({handleClick, cat, currentPage, setCurrentPage, category}) => {
    const [data, setData] = useState(category)
    const [activeFilter, setActiveFilter] = useState(false);
    const [checked, setChecked] = useState('')
    const [filterData, setFilterData] = useState([])
    const [filterManufacturer, setFilterManufacturer] = useState([])
    console.log(cat)
    const filterColumns = [
        { header: "Manufacturer", field: "manufacturer",  sortable: true},
        { header: "Prijs", field: "price",},
    ]
    useEffect(()=>{
        category.map(({manufacturer})=>{
            setFilterManufacturer((prev)=>[...prev, manufacturer])
        })

    },[category])
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 12;
        const lastPageIndex = firstPageIndex + 12;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data]);

    useEffect(()=>{
        setFilterData([])
        const priceFilter = ['Laag to Hoog', 'Hoog to Laag']

        const filterManufacturerSet = [...new Set(filterManufacturer)]
        filterManufacturerSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'manufacturer': item
            }])
        })

        const priceFilterSet = [...new Set(priceFilter)]
        priceFilterSet.map((item)=>{
            setFilterData((prev)=>[...prev, {
                'price': item
            }])
        })
    },[filterManufacturer])
    const handleFilter = (e, item, field) => {
        console.log(item)
        setChecked(e.target.value)
        setActiveFilter(true)
        let filteredProducts;
        if(field === 'price') {
            setData([])
            if (item === 'Laag to Hoog') {
                filteredProducts = category.sort((a, b) => (a.price < b.price ? -1 : 1))
            } else if (item === 'Hoog to Laag') {

                filteredProducts = filteredProducts = category.sort((a, b) => (a.price > b.price ? -1 : 1))
            }
        }else {

            setData([])
            filteredProducts =  category.filter((product)=>  product[field] === item)
        }

        filteredProducts.map((product, idx)=>{
            setData( (prev)=>[...prev, product])

        })
    }
    const handleReset = () =>{
        setData([])
        setChecked('')
        setActiveFilter(false)
        setData(category)
    }

    console.log(data)
    return (
        <div className=' w-screen pb-10 min-h-screen'>
            <div className="flex flex-col w-full  ">

                <div className={`space-y-4`}>
                    <ClientHeader lastPage={'shop'} title={cat}/>
                    <Filters filterColumns={filterColumns} filterData={filterData} handleReset={handleReset} checked={checked} activeFilter={activeFilter} handleFilter={handleFilter}/>
                </div>
                <div className="grid  lg:grid-cols-4 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                    {currentTableData.map((item)=>(
                        <div onClick={()=>handleClick(item._id)}  key={item._id}>
                            <NewCard>
                                <div className=' flex justify-center'>
                                    {item?.img?.length > 0 ?
                                        <Image src={`${item.img[0]}`} alt="" width={100} height={100} objectFit="contain"/>  :
                                        <NoPic height={`h-24`} width={`h-24`}/>  }
                                </div>



                                <div className='flex pt-5 pr-2 justify-center lg:justify-end'>
                                    <span className='uppercase font-bold text-slate-400'>{item.manufacturer}</span>
                                </div>
                                <div className='flex lg:pt-5 pt-1  pr-2 justify-center lg:justify-end text-end'>
                                    <span className='uppercase font-bold text-slate-400 text-xs md:text-sm'>{item.name}</span>
                                </div>
                                <div className='flex lg:pt-5 pt-1 pb-5 pr-2 justify-center lg:justify-end text-center'>
                                    <span className='uppercase font-bold text-slate-400 text-xs md:text-sm'>€{item?.price?.toFixed(2)}</span>
                                </div>



                            </NewCard>
                        </div>
                    ))}
                </div>
                <div className='pr-16 pb-10'>
                    <Paginate
                        currentPage={currentPage}
                        totalCount={category.length}
                        pageSize={12}
                        onPageChange={page => setCurrentPage(page)}

                    />
                </div>
            </div>

        </div>
    );
};

export default CategoryListing;
