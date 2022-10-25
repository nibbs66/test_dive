import {useState, useEffect} from 'react'
import VendorPageDisplay from "./VendorPageDisplay";
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

const NewVendorPage = ({category, productColors, productSizes}) => {
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
    const [img, setImg] = useState('')
    const [upload, setUpload] = useState(false)

    /*  <div className={`relative flex w-1/2`}>
                                     <MultiSelect colors={productColors}/>
                                 </div>*/

    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleSubmit = async(e) => {
        e.preventDefault()

        try{
            const res = await axios.post(`/api/vendors`,
                inputs
            );
            res.status === 201 && toast.success('New Vendor Added!!')

        }catch(err){
            console.log(err)
        }
    }

    const handleClick = async (e) =>{

        e.preventDefault()
        if(img.length >= 3){
            toast.error('Maximum number of product images has been reached')
            setUpload(false)
            setFile([])

        }else{
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
                        setInputs(prev=>{
                            return {...prev, 'img': downloadURL}
                        })

                    });
                }
            );
        }

    }
    console.log(inputs)
    return (
        <form action=""onSubmit={handleSubmit}>
            <VendorPageDisplay product={inputs} submitButton={true}>
                <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
                <div className={`mt-10 `}>
                    <AccordionLayout
                        title={`Add Vendor`}
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



                                <div className={`flex w-full justify-center space-x-24 py-10 text-sm`}>
                                    <div className={`flex flex-col gap-1 text-sm`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Vendor</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  `}
                                               onChange={handleChange} name={`vendor`}
                                               type="text"/>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Vendor Website</label>
                                        <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `}
                                               onChange={handleChange} name={`link`}
                                               type="text"/>
                                    </div>
                                </div>


                        </div>
                    </AccordionLayout>
                </div>
            </VendorPageDisplay>
        </form>
    );
};

export default NewVendorPage;
