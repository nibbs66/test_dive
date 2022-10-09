import {useState, useEffect} from 'react'
import ProductPageDisplay from "./ProductPageDisplay";
import AccordionLayout from "../Accordion/AccordionLayout";
import Upload from "../icons/Upload";
import Image from "next/image";
import Submit from "../icons/Submit";
import MultiSelect from '../MultiSelect'
import {ArrowUpTrayIcon} from '@heroicons/react/24/outline'
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../lib/firebase";
import toast, {Toaster} from 'react-hot-toast'
import SingleSelect from "../SingleSelect";
import ComboboxDisplay from "../ComboboxDisplay";

const NewProductPage = ({category, productColors, productSizes}) => {
    const [inputs, setInputs] = useState({})
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [activeIndex, setActiveIndex] = useState(1)
    const [code, setCode] = useState('')
    const [barCode, setBarCode] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [selected, setSelected] = useState('')
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [file, setFile] = useState([])
    const [img, setImg] = useState([])
    const [upload, setUpload] = useState(false)
    useEffect(()=>{
        setSubCategories([])
        category.map((cat)=>{
            setSubCategories(prev=>[...prev, cat.name])
        })
    },[category])
    /*  <div className={`relative flex w-1/2`}>
                                     <MultiSelect colors={productColors}/>
                                 </div>*/

    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleSubmit = async() => {

        try{
            const res = await axios.post(`/api/products`,
                { ...inputs, color: colors, barcode: barCode, size: sizes, }
            );
            res.status === 201 && toast.success('New Product Created!!')

        }catch(err){
            console.log(err)
        }
    }
    const handleBarCode = (e) => {
        e.preventDefault()
        setBarCode(prev=>[...prev, code])
        setCode('')
    };
    const changeColor = (e) => {
        e.preventDefault()
        setColors(prev=>[...prev, color])
        setColor('')
    };
    const changeSize = (e) => {
        e.preventDefault()
        setSizes(prev=>[...prev, size])
        setSize('')
    };
    const handleClick = async (e) =>{

        e.preventDefault()

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName)


        const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    downloadURL && toast.success('Image Saved!!')
                    setUpload(false)
                    setFile([])
                    setImg(prev=>[...prev, downloadURL])

                });
            }
        );
    }

    return (
        <form action=""onSubmit={handleSubmit}>
            <ProductPageDisplay product={inputs} submitButton={true}>
                <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
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
                            <div className="flex items-center  justify-center w-full  gap-10">
                                <div>
                                    <Image
                                        className={`object-cover rounded-full items-center`}
                                        src={ file.length !== 0
                                            ? URL.createObjectURL(file)

                                            :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt={''}
                                        width={100} height={100} objectFit='cover'
                                    />
                                </div>
                                {!upload &&  <div className={`flex items-center justify-center cursor-pointer `}>
                                    <label className={`flex items-center gap-2 text-slate-400 cursor-pointer`} htmlFor="file">
                                        Choose File: <ArrowUpTrayIcon className={`h-5 w-5`}/>
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={(e)=> {
                                            setFile(e.target.files[0])
                                            setUpload(true)
                                        }}
                                        style={{display: "none"}}
                                    />
                                </div>}

                                <div className={`flex  items-center gap-2`}>
                                    {upload && <button
                                        onClick={handleClick}
                                        className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm font-bold`}>Add
                                        Img</button>}
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
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                               onChange={handleChange} name={`modelId`}
                                               type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>cost</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                               onChange={handleChange} name={`cost`}
                                               type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>price</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                               onChange={handleChange} name={`price`}
                                               type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>New</label>
                                        <select
                                            name={`New`} onChange={handleChange}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}  type="text">
                                            <option value=""></option>
                                            <option value="false">Nee</option>
                                            <option value="true">Ja</option>
                                        </select>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Gender</label>
                                        <select
                                            name={`gender`} onChange={handleChange}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}  type="text">
                                            <option value=""></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-2 text-sm`}>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>



                                        <select className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 text-slate-400`}

                                                name={`categories`}
                                                onChange={handleChange}
                                                type="text">
                                            <option value=""></option>
                                            {category.map((cat)=>(
                                                <option key={cat._id}  value={cat.name}>{cat.name}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                                   name={`barcode`}
                                                   value={code}
                                                   onChange={(e) =>setCode(e.target.value)}
                                                   type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <button
                                                    onClick={handleBarCode}
                                                    className={`absolute left-0.5`}>
                                                    <Upload as={`button`} fill={'white'}

                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1 `}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                        <div className={` flex items-center gap-2`}>

                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                                   name={`color`}
                                                   onChange={(e) =>setColor(e.target.value)}
                                                   type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <button
                                                    onClick={changeColor}
                                                    className={`absolute left-0.5`}>
                                                    <Upload  fill={'white'}/>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>size</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}

                                                   name={`size`}
                                                   value={size}
                                                   onChange={(e) =>setSize(e.target.value)}
                                                   type="text"/>
                                            <div  className={`bg-green-500 h-7 w-7 rounded-full relative`}>
                                                <button
                                                    onClick={changeSize}
                                                    className={`absolute left-0.5`}>
                                                    <Upload  fill={'white'}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                        <input
                                            name={`stock`} onChange={handleChange}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`} type="text"/>


                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Description</label>
                                        <textarea
                                            name={`desc`} onChange={handleChange}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 `}  type="text"/>


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
