import {useState, useEffect} from 'react';
import AccordionLayout from "../Accordion/AccordionLayout";
import Image from "next/image";
import ProductPageDisplay from "./ProductPageDisplay";


const ProductPage = ({product, productSales,}) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [ytdSales, setYTDSales] = useState(0)

    const [index, setIndex] = useState(0)
    useEffect(()=>{
        const qty = []
       productSales.map((items, idx)=>{
           items.items.map((total, idx)=>{
             total.productId===product._id && qty.push(total.quantity)
               const salesQty = qty.reduce((a, b)=> a + b, 0)
                setYTDSales(salesQty * product.price)

            })
        })
    },[product, productSales])

    return (
        <ProductPageDisplay  product={product} editButton={true} deleteButton={true} >
        <div className={`flex flex-col gap-5 pt-5 mt-5`}>
            <AccordionLayout
                title={`Product Information`}
                bg={`${activeIndex === 1 ? 'bg-blue-600': 'bg-blue-500'}`}
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
                           <span>Model Id:</span>
                           <span>cost:</span>
                           <span>price</span>
                           <span>stock</span>
                           <span>ytd sales</span>

                       </div>
                        <div className={`flex flex-col items-start gap-5 text-slate-600 `}>
                            <span>{product.manufacturer}</span>
                            <span>{product._id}</span>
                            <span>{product.name}</span>
                            <span>{product.modelId}</span>
                            <span>€{product.cost.toFixed(2)}</span>
                            <span>€{product.price.toFixed(2)}</span>
                            <span>{product.stock}</span>
                            <span>€{ytdSales?.toFixed(2)}</span>

                        </div>
                    </div>
                </div>

            </AccordionLayout>
            <AccordionLayout
                title={`Sales Information`}
                bg={`${activeIndex === 2 ? 'bg-blue-600': 'bg-blue-500'}`}
                text={'text-white'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                index={2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >

            </AccordionLayout>

        </div>
        </ProductPageDisplay>
    );
};

export default ProductPage;
