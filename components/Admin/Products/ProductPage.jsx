import {useState, useEffect} from 'react';
import AccordionLayout from "../../Accordion/AccordionLayout";
import Image from "next/image";
import ProductPageDisplay from "./ProductPageDisplay";
import dayjs from "dayjs-with-plugins";
import {ProductSubType,} from '../../../tableData'
import TableDisplay from "../../Table/TableDisplay";

const ProductPage = ({product, orders}) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [ytdSales, setYTDSales] = useState(0)
    const [index, setIndex] = useState(0)
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([])
    const [filterColor, setFilterColor] = useState([])
    const filterColumns = [
        { header: "Size", field: "size",},
        { header: "Category", field: "category",  sortable: true},
        { header: "Color", field: "color",},
    ]
    const stockFilter = ['< 10', '11-20', '21-30', '31-40', '41-50', '> 50']
    //dayjs().startOf('year')
    //Array.from(new Set(holder))
    const nine = [
        { header: "Barcode", field: "barcode", sortable: true },
        { header: "Sub Id", field: "modelId", sortable: true },
        { header: "Color", field: "color", sortable: true },
        { header: "Size", field: "size", sortable: true },
        { header: "Stock", field: "stock", sortable: true },
    ]//messageData.name.charAt(0).toUpperCase() + messageData.name.slice(1)
    useEffect(()=>{
        setColumns([])
        setData([])
        setFilterColor([])
        const qty = []
        const cols = []
        const YTDOrders = orders.filter((sale) => dayjs(sale.createdAt).isBetween(dayjs().startOf('year'), dayjs()))
        YTDOrders.map((order)=>{
            order.items.map((total)=>{
                total.productId===product._id && qty.push(total.quantity)
                const salesQty = qty.reduce((a, b)=> a + b, 0)
                setYTDSales(salesQty * product.price)

            })

        })

        product.productSubType.map((type, idx)=>{

            cols.push(Object.keys(type))
            setData((prev) => [...prev, {
                id: type._id,
                barcode: type.barcode,
                modelId: type.modelId,
                color: type.color,
                size: type.size,
                stock: type.stock

            }])
            setFilterColor((prev)=>[...prev, type.color])
        })
        console.log(cols)
        cols[0].map((item)=>{
            if(item !=='_id'){
                if(item === 'modelId'){
                    setColumns((prev)=>[...prev,  { header: "Sub Id", field: item, sortable: true },])
                }else{
                    setColumns((prev)=>[...prev,  { header: item.charAt(0).toUpperCase() + item.slice(1), field: item, sortable: true },])
                }
            }

        })

    },[product, orders])
    console.log(product)
    return (
        <ProductPageDisplay  product={product} editButton={true} >



            <div className={`flex flex-col gap-5 pt-5 mt-5`}>

                <AccordionLayout
                    title={`Product Information`}
                    bg={`${activeIndex === 1 ? 'bg-slate-500': 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`grid grid-cols-2 w-full my-4 mx-2 align-center`}>
                        <div className="flex flex-col items-center w-1/2 gap-5">
                            {product.img.length >0 ?
                                <Image src={product.img[index]} alt={''} height={250} width={250} objectFit={'contain'}/>
                                :
                                <Image className={`object-cover rounded-full items-center`} src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                                       width={200} height={200} objectFit='contain'/>

                            }
                            <div   className={`flex `}>
                                {product.img && product.img.map((pic, idx)=>(
                                    <div
                                        onClick={()=>setIndex(idx)}
                                        key={idx}
                                        className={`cursor-pointer`}>
                                        <Image  src={pic} alt={''} height={100} width={100} objectFit={'contain'}/>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <div className={`flex gap-5`}>
                            <div className={`flex flex-col items-start gap-5 uppercase text-slate-400 `}>
                                <span>Manufacturer:</span>
                                <span>Product Id:</span>
                                <span>Product Name:</span>

                                <span>cost:</span>
                                <span>price</span>

                                <span>ytd sales</span>

                            </div>
                            <div className={`flex flex-col items-start gap-5 text-slate-600 `}>
                                <span>{product.vendor}</span>
                                <span>{product._id}</span>
                                <span>{product.name}</span>

                                <span>€{product.cost.toFixed(2)}</span>
                                <span>€{product.price.toFixed(2)}</span>

                                <span>€{ytdSales?.toFixed(2)}</span>

                            </div>
                        </div>
                    </div>

                </AccordionLayout>
                <AccordionLayout
                    title={`Addtl Information`}
                    bg={`${activeIndex === 2 ? 'bg-slate-500': 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <TableDisplay tableTitle={false} title={'order detail'} font={'text-slate-500'} textSize={'text-3xl'}
                                  rows={data} setRows={setData} columns={ProductSubType} showFilter={true} title={'Product Type'} tableTitle={true}
                                  PageSize={5} />
                </AccordionLayout>
                <AccordionLayout
                    title={`Sales Information`}
                    bg={`${activeIndex === 3 ? 'bg-slate-500': 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >

                </AccordionLayout>

            </div>
        </ProductPageDisplay>
    );
};

export default ProductPage;
