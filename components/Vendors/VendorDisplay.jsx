import {useState, useEffect} from 'react';
import VendorPageDisplay from "./VendorPageDisplay";
import AccordionLayout from "../Accordion/AccordionLayout";
import TableDisplay from "../Table/TableDisplay";
import {VendorProductColumns} from "../../tableData";
import Image from 'next/image'
import axios from "axios";

const VendorDisplay = ({vendor}) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [data, setData] = useState([])
    console.log(vendor[0].vendor)
    useEffect(()=>{
        setData([])
        const getVendorProducts = async() => {
            try{
                const res = await axios.get(`/api/products?vendor=${vendor[0].vendor}`)
                console.log(res.data)
                res.data.map((product)=>{

                    setData((prev) => [...prev, {
                        id: product._id,
                        product: product.name,
                        cost: product.cost,
                        price: product.price,
                    }])

                })
            }catch(err){
                console.log(err)
            }
        }
        getVendorProducts()
    },[vendor])
    console.log(vendor)
    return (

        <VendorPageDisplay vendor={vendor}>
            <div className={`flex flex-col gap-5 pt-5 mt-5`}>
                <AccordionLayout
                    title={`Vendor Informaton`}
                    bg={`${activeIndex === 1 ? 'bg-slate-500': 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className="flex flex-col w-full space-y-5 items-center">
                        {vendor[0].img && <Image src={`${vendor[0].img}`} alt={``} height={50} width={200} objectFit={`cover`}/>}
                        <div className={`flex w-full justify-evenly m-auto px-10 items-start gap-x-16`}>
                            <div className={`grid grid-cols-2 gap-y-2 w-1/2 `}>
                                <span className={`flex items-start text-slate-400 uppercase`}>Vendor:</span>
                                <span>{vendor[0].vendor}</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>Website:</span>
                                <span>{vendor[0].link}</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>Address:</span>
                                <span>{vendor[0].address}</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>City:</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>{vendor[0].city}</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>Country:</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>{vendor[0].country}</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>Postal Code:</span>
                                <span className={`flex items-start text-slate-400 uppercase`}>{vendor[0].postalCode}</span>
                            </div>
                            <div className={`grid grid-cols-2 gap-y-2 w-1/2`}>
                                <span className={`flex items-start text-slate-400 uppercase`}>Contact:</span>
                                <span className={` text-slate-600`}>{vendor[0].contact}</span>
                                <span className={`text-slate-400 uppercase`}>Phone:</span>
                                <span className={`text-slate-600`}>{vendor[0].phone}</span>
                                <span className={`text-slate-400 uppercase`}>Email:</span>
                                <span className={`text-slate-600`}>{vendor[0].email}</span>
                            </div>
                        </div>

                    </div>

                </AccordionLayout>
                <AccordionLayout
                    title={`Vendor Product Line`}
                    bg={`${activeIndex === 3 ? 'bg-slate-500': 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >

                    <TableDisplay tableTitle={false} title={'order detail'} font={'text-slate-500'} textSize={'text-3xl'}
                                  rows={data} columns={VendorProductColumns}
                                  PageSize={5}/>
                </AccordionLayout>
            </div>
        </VendorPageDisplay>

    );
};

export default VendorDisplay;
