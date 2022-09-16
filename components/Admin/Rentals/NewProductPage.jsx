import {useState} from 'react'
import ProductPageDisplay from "./ProductPageDisplay";
import AccordionLayout from "../../Accordion/AccordionLayout";
import Upload from "../../icons/Upload";
import Image from "next/image";
import Submit from "../../icons/Submit";

const NewProductPage = ({category}) => {
    const [inputs, setInputs] = useState({})
    const [activeIndex, setActiveIndex] = useState(1)
    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleSubmit = () => {
        console.log(inputs)
    }
    console.log(category)
    return (
        <form action=""onSubmit={handleSubmit}>
            <ProductPageDisplay product={inputs} submitButton={true}>
                <div className={`mt-10 `}>
                    <AccordionLayout
                        title={`Add Product`}
                        bg={`${activeIndex === 1 ? 'bg-blue-600': 'bg-blue-500'}`}
                        text={'text-white'}
                        mx={'mx-16'}
                        bodyMargin={'mx-10'}
                        index={1}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    >
                        <div className={`flex flex-col w-full`} action="">
                            <div className="flex  justify-center w-full  gap-10">
                                <div>
                                    <Image className={`object-cover rounded-full items-center`} src={"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                                           width={100} height={100} objectFit='cover'/>
                                </div>
                                <div className={`flex gap-2 items-center uppercase text-sm text-slate-400 font-bold`}>
                                    <label htmlFor="">
                                        Upload Image:
                                    </label>
                                    <Upload fill={`#94a2b8`}/>
                                </div>

                                <div className={`flex  items-center gap-2`}>
                                    <button  className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm font-bold`}>Add Img</button>
                                </div>
                            </div>
                            <div className={`grid grid-cols-2 w-full my-4 mx-10 `}>


                                <div className={`flex flex-col gap-2 text-sm`}>
                                    <div className={`flex flex-col gap-1 text-sm`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Manufacturer</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                               onChange={handleChange} name={`manufacturer`}
                                               type="text"/>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Product Name</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                               onChange={handleChange} name={`name`}
                                               type="text"/>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Model Id</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}  type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>cost</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}  type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>price</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}  type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>New</label>
                                        <select className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}  type="text">
                                            <option value=""></option>
                                            <option value="false">Nee</option>
                                            <option value="true">Ja</option>
                                        </select>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-2 text-sm`}>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>
                                        <select className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `} type="text">
                                            <option value=""></option>
                                            {category?.map((cat)=>(
                                                <option key={cat._id}  value={cat.name}>{cat.name}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}  type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <div className={`absolute left-0.5`}>
                                                    <Upload  fill={'white'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1 `}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}  type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <div className={`absolute left-0.5`}>
                                                    <Upload  fill={'white'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>size</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}  type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <div className={`absolute left-0.5`}>
                                                    <Upload  fill={'white'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`} type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Description</label>
                                        <textarea className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 `}  type="text"/>


                                    </div>
                                </div>

                            </div>

                        </div>
                    </AccordionLayout>
                </div>
            </ProductPageDisplay>
        </form>
    );
};

export default NewProductPage;
