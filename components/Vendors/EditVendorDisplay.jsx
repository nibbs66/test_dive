import React from 'react';
import VendorPageDisplay from "./VendorPageDisplay";
import AccordionLayout from "../Accordion/AccordionLayout";
import {useState, useMemo, useEffect} from 'react'
import Image from "next/image";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import {getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject} from "firebase/storage";

import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import UploadImg from "../ImageSelectors/UploadImg";

import app from "../../lib/firebase";

const EditVendorDisplay = ({vendor}) => {
    console.log(vendor)
    const [activeIndex, setActiveIndex] = useState(4)

    const [file, setFile] = useState([])
    const [inputs, setInputs] = useState({})

    const [upload, setUpload] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)
    const [checked, setChecked] = useState('')


    const notificationMethods = [
        { id: 'add', title: 'Add Photo' },
        { id: 'delete', title: 'Delete Photo' },
    ]
    const handleChange = (e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }
    const handleDeleteImg = async(e) => {
        e.preventDefault()


        const storage = getStorage(app);
        const fileRef = ref(storage, file);
        deleteObject(fileRef).then(async() => {
            try{
                const res =  await axios.put(`/api/vendors/${vendor[0]._id}`, {removeImg: true, file})
                res.status === 201 && toast.success('Pic successfully deleted')
                setFile([])
            }catch(err){
                console.log(err)
                toast.error('Uh-oh, an error occurred!')
            }


        }).catch((error) => {
            console.log(error)
            toast.error('Uh-oh, an error occurred!')
            // Uh-oh, an error occurred!
        });

    }
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

                switch (snapshot.state) {
                    case 'paused':

                        break;
                    case 'running':

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
                    if(downloadURL){

                        setFile([])
                        try{

                            const res = await axios.put("/api/vendors/"+vendor[0]._id, {img: downloadURL})
                            toast.success('Image Saved!!')
                            setUpload(false)
                            setFile([])
                            setUpload(false)
                        }catch(err){

                        }
                    }

                });
            }
        );


    }

    const handleEdit = async() => {

        try{

            const res = await axios.put(`/api/vendors/${vendor[0]._id}`, {...inputs})
            res.status === 201 && toast.success(`${vendor[0].vendor}  successfully updated`)
            setInputs({})


            //const res = await axios.put("/api/products/"+product._id, {...inputs})


        }catch(err){
            console.log(err)
        }
    }
    console.log(vendor[0]._id)
    return (
        <div className={`flex flex-col gap-5 pt-5 mt-5`}>

            <AccordionLayout
                title={`Edit Vendor Logo`}
                bg={`${activeIndex === 0 ? 'bg-slate-500' : 'bg-slate-400'}`}
                text={'text-white'}
                mx={'mx-16'}
                bodyMargin={'mx-10'}
                index={0}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`flex items-center justify-evenly  mx-10 w-full `}>
                    <div>
                        {/*<label className="text-base font-medium text-gray-900">Edit Images</label>*/}
                        <p className="text-sm leading-5 text-slate-500">Please select Delete or Add.</p>
                        <fieldset className="mt-4">
                            <legend className="sr-only">Notification method</legend>
                            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                {notificationMethods.map((notificationMethod) => (
                                    <div key={notificationMethod.id} className="flex items-center">
                                        <input
                                            onChange={()=> {
                                                setChecked(notificationMethod.id),
                                                    setFile([]),
                                                    setUpload(false)
                                            }}
                                            id={notificationMethod.id}
                                            name="notification-method"
                                            type="radio"

                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />

                                        <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                                            {notificationMethod.title}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                </div>
                {checked === 'add' &&
                    <UploadImg upload={upload} setUpload={setUpload} handleClick={handleClick} setFile={setFile} file={file}/>
                }
                {checked === 'delete' && <div className="flex flex-col items-center justify-center w-full placeholder:text-slate-300 gap-5">

                    {/*<div className={`flex gap-2 items-center uppercase text-sm text-slate-400 font-bold`}>

                        <label htmlFor="">
                            Upload Image:
                        </label>
                        <Upload fill={`#94a2b8`}/>
                    </div>*/}
                    <Image className={`object-cover rounded-full items-center`} src={file.length !== 0
                        ? file

                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                           width={100} height={100} objectFit='cover'/>
                    {upload && <div className={`flex flex-col items-center gap-2`}>
                        <button onClick={handleDeleteImg}
                                className={`bg-red-500 text-white uppercase py-1 px-2 rounded text-sm`}>Delete Img
                        </button>
                    </div>}

                    <div className={`flex `}>

                        <div
                            onClick={() => {

                                setFile(vendor[0].img)
                                setUpload(true)
                            }}


                            className={`cursor-pointer`}>
                            <Image src={vendor[0].img} alt={''} height={100} width={100} objectFit={'contain'}/>
                        </div>


                    </div>
                </div>}
            </AccordionLayout>
            <AccordionLayout
                title={`Edit Vendor`}
                bg={`${activeIndex === 1 ? 'bg-slate-500' : 'bg-slate-400'}`}
                text={'text-white'}
                mx={'mx-16'}
                bodyMargin={'mx-10'}
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <div className={`flex flex-col w-full`} action="" >
                    <div className={`grid grid-cols-2 w-full my-4 mx-10 `}>

                        <div className={`flex flex-col gap-2 text-sm`}>
                            <div className={`flex flex-col gap-1 text-sm`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>Vendor</label>
                                <input
                                    onChange={handleChange} name={`vendor`}
                                    className={`border border-slate-400 focus:outline-none rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].vendor} type="text"/>
                            </div>
                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>Address</label>
                                <input
                                    onChange={handleChange} name={`address`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].address} type="text"/>


                            </div>
                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>city</label>
                                <input
                                    onChange={handleChange} name={`city`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300  `}
                                    placeholder={vendor[0].city} type="text"/>
                            </div>
                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>country</label>
                                <input
                                    onChange={handleChange} name={`country`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300  `}
                                    placeholder={vendor[0].country} type="text"/>
                            </div>

                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>postal code</label>
                                <input
                                    onChange={handleChange} name={`postalCode`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300  `}
                                    placeholder={vendor[0].postalCode} type="text"/>
                            </div>

                        </div>
                        <div className={`flex flex-col gap-2 text-sm`}>
                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>Website</label>
                                <input
                                    onChange={handleChange} name={`link`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].link} type="text"/>
                            </div>

                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>contact</label>
                                <input
                                    onChange={handleChange} name={`contact`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].contact} type="text"/>
                            </div>

                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>email</label>
                                <input
                                    onChange={handleChange} name={`email`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].email} type="text"/>
                            </div>

                            <div className={`flex flex-col gap-1`}>
                                <label className={`pt-1 uppercase text-slate-400 font-bold`}>phone</label>
                                <input
                                    onChange={handleChange} name={`phone`}
                                    className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                    placeholder={vendor[0].phone} type="text"/>
                            </div>


                        </div>
                    </div>
                    <div className={`flex justify-center py-5`}>
                        <button
                            onClick={handleEdit}
                            className={`bg-blue-500 hover:bg-indigo-700 py-1 px-2 text-white rounded uppercase font-bold`} type={`submit`}>
                            Confirm Changes
                        </button>
                    </div>
                </div>
            </AccordionLayout>
        </div>
    );
};

export default EditVendorDisplay;
