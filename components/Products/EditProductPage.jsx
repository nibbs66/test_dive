import {useState} from 'react';
import AccordionLayout from "../Accordion/AccordionLayout";
import Image from "next/image";
import Upload from "../icons/Upload";
import ProductPageDisplay from "./ProductPageDisplay";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
const EditProductPage = ({product}) => {
    const [activeIndex, setActiveIndex] = useState(1)
    const [index, setIndex] = useState(1)
    const [file, setFile] = useState([])
    const [inputs, setInputs] = useState({})
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [code, setCode] = useState('')
    const [barCode, setBarCode] = useState(product.barcode)
    const [subCategories, setSubCategories] = useState([])
    const [colors, setColors] = useState(product.colors)
    const [sizes, setSizes] = useState(product.sizes)
    const [newStock, setNewStock] = useState(0)
    const handleChange = (e) => {
        console.log(product.stock)
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const upDates=(data, update) => {
        let newData;
        if(update === 'barcode'){
            newData = barCode
            newData.push(data)
            setBarCode(newData)
            setCode('')
        }else if(update === 'color'){
            newData = colors
            newData.push(data)
            setColors(newData)
            setColor('')
        }else if(update === 'size'){
            newData = sizes
            newData.push(data)
            setSizes(newData)
            setSize('')
        }else if(update === 'stock'){
            newData = sizes
            newData.push(data)
            setSizes(newData)
            setSize('')
        }

    }
    const handleEdit = async() => {

        try{
            const res = await axios.put("/api/products/"+product._id, {...inputs, stock: product.stock + Number(newStock.stock), color: colors, barcode: barCode, size: sizes,})
            res.status === 201 && toast.success(`${product.name} successfully updated`)
        }catch(err){
            console.log(err)
        }
    }
    console.log(newStock)
    return (
        <ProductPageDisplay  product={product}  deleteButton={true}>
            <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
            <div className={`flex flex-col gap-5 pt-5 mt-5`}>
                <AccordionLayout
                    title={`Edit Product`}
                    bg={`${activeIndex === 1 ? 'bg-blue-600': 'bg-blue-500'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col w-full`} action="" >
                        <div className={`grid grid-cols-3 w-full my-4 mx-10 `}>
                            <div className="flex flex-col items-center justify-center w-1/2 gap-5">
                                <div className={`flex flex-col items-center gap-2`}>
                                    <button className={`bg-red-500 text-white uppercase py-1 px-2 rounded text-sm`}>Delete Img</button>
                                    <span className={`uppercase text-slate-400`}>-or-</span>
                                    <button  className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm`}>Add Img</button>
                                </div>
                                <Image className={`object-cover rounded-full items-center`} src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                                       width={100} height={100} objectFit='cover'/>
                                <div className={`flex gap-2 items-center uppercase text-sm text-slate-400 font-bold`}>

                                    <label htmlFor="">
                                        Upload Image:
                                    </label>
                                    <Upload fill={`#94a2b8`}/>
                                </div>

                                <div   className={`flex `}>
                                    {product.img.map((pic, idx)=>(
                                        <div
                                            onClick={()=>setIndex(idx)}
                                            key={idx}
                                            className={`cursor-pointer`}>
                                            <Image  src={pic} alt={''} height={100} width={100} objectFit={'contain'}/>
                                        </div>

                                    ))}
                                </div>
                            </div>
                            <div className={`flex flex-col gap-2 text-sm`}>
                                <div className={`flex flex-col gap-1 text-sm`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Manufacturer</label>
                                    <input
                                        onChange={handleChange} name={`manufacturer`}
                                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1 w-1/2 `}
                                        placeholder={product.manufacturer} type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Product Name</label>
                                    <input
                                        onChange={handleChange} name={`name`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={product.name} type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Model Id</label>
                                    <input
                                        onChange={handleChange} name={`modelId`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={product.modelId} type="text"/>


                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>cost</label>
                                    <input
                                        onChange={handleChange} name={`cost`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={`€${product.cost.toFixed(2)}`} type="text"/>


                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>price</label>
                                    <input
                                        onChange={handleChange} name={`price`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                        placeholder={`€${product.price.toFixed(2)}`} type="text"/>


                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Aanbiedingen</label>
                                    <input
                                        onChange={handleChange} name={`aanbiedingen`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `} type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Aanbiedingen Price</label>
                                    <input
                                        onChange={handleChange} name={`price`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={`€80.00`} type="text"/>


                                </div>
                            </div>
                            <div className={`flex flex-col gap-2 text-sm`}>

                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            name={`barcode`}
                                            value={code}
                                            onChange={(e) =>setCode(e.target.value)}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                            placeholder={product.barcode[0]} type="text"/>
                                        <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                            <button
                                                onClick={()=>upDates(code, 'barcode')}
                                                className={`absolute left-0.5`}>
                                                <Upload as={`button`} fill={'white'}

                                                />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>
                                    <input
                                        onChange={handleChange} name={`categories`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={product.categories} type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            name={`color`}
                                            value={color}
                                            onChange={(e) =>setColor(e.target.value)}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                            placeholder={product.color[0]} type="text"/>
                                        <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                            <button
                                                onClick={()=>upDates(color, 'color')}
                                                className={`absolute left-0.5`}>
                                                <Upload as={`button`} fill={'white'}

                                                />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>size</label>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            name={`size`}
                                            value={size}
                                            onChange={(e) =>setSize(e.target.value)}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                            placeholder={product.size[0]} type="text"/>
                                        <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                            <button
                                                onClick={()=>upDates(size, 'size')}
                                                className={`absolute left-0.5`}>
                                                <Upload as={`button`} fill={'white'}

                                                />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                    <input
                                        onChange={(e)=>setNewStock({[e.target.name]: e.target.value})} name={`stock`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                        placeholder={product.stock} type="text"/>


                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Description</label>
                                    <textarea
                                        onChange={handleChange} name={`desc`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 `}
                                        placeholder={product.desc} type="text"/>


                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center py-5`}>
                            <button
                                onClick={handleEdit}
                                className={`bg-green-500 py-1 px-2 text-white rounded uppercase font-bold`} type={`submit`}>
                                Confirm Changes
                            </button>
                        </div>
                    </div>
                </AccordionLayout>
                <AccordionLayout
                    title={`Product Information`}
                    bg={`${activeIndex === 2 ? 'bg-blue-600': 'bg-blue-500'}`}
                    text={'text-white'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`grid grid-cols-2 w-full my-4 mx-2 align-center`}>
                        <div className="flex flex-col items-center w-1/2 gap-5">
                            <Image src={product.img[index]} alt={''} height={250} width={250} objectFit={'contain'}/>
                            <div   className={`flex `}>
                                {product.img.map((pic, idx)=>(
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
                                <span>€2000.00</span>

                            </div>
                        </div>
                    </div>

                </AccordionLayout>

            </div>
        </ProductPageDisplay>
    );
};

export default EditProductPage;
