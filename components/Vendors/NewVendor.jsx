import {useState} from 'react'
import VendorPageDisplay from "./VendorPageDisplay";
import AccordionLayout from "../Accordion/AccordionLayout";
import Image from "next/image";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import useUploadImg from "../../hooks/useUploadImg";

const NewVendorPage = () => {
    const [inputs, setInputs] = useState({})
    const [activeIndex, setActiveIndex] = useState(1)
    const [file, setFile] = useState(null)
    const [upload, setUpload] = useState(false)

    /*  <div className={`relative flex w-1/2`}>
                                     <MultiSelect colors={productColors}/>
                                 </div>*/
    const handleNewPic = (e) => {
        if(uploadedImage.length >= 3) {
            toast.error('Maximum number of product images has been reached')
            setFile(null)
        }else{
            setFile(e.target.files[0])
        }
    }
    const {uploadedImage, setUploadedImage, err} = useUploadImg(file, setFile)
    console.log(file)
    console.log(uploadedImage)

    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post(`/api/vendors`,
                {...inputs, img: uploadedImage[0]}
            );
            res.status === 201 && toast.success('New Vendor Added!!')
            setInputs({})
            setUploadedImage([])

        }catch(err){
            console.log(err)
        }
    }
    return (
        <div action=""onSubmit={handleSubmit}>
            <VendorPageDisplay product={inputs} handleSubmit={handleSubmit} submitButton={true}>
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
                                        src={ file !== null
                                            ? URL.createObjectURL(file)

                                            :  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                        alt={''}
                                        width={100} height={100} objectFit='cover'
                                    />
                                </div>
                                {!upload &&  <div className={`flex items-center justify-center cursor-pointer `}>

                                    <input
                                        className={`file:bg-[#3b81f6] file:text-white file:mr-4 file:py-2 text-sm text-slate-400
                                    file:uppercase file:text-sm file:px-4 file:rounded-full file:border-0
                                    file:cursor-pointer
                                    `}
                                        type="file"
                                        id="file"
                                        onChange={handleNewPic}

                                    />
                                </div>}

                                <div className={`flex  items-center gap-2`}>
                                    {upload && <button

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
        </div>
    );
};

export default NewVendorPage;
