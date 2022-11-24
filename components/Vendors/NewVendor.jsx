import {useState, useMemo, useEffect} from 'react'
import VendorPageDisplay from "./VendorPageDisplay";
import AccordionLayout from "../Accordion/AccordionLayout";
import Image from "next/image";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import useUploadImg from "../../hooks/useUploadImg";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import countryList from 'react-select-country-list'
import postalCodes from 'zipcodes-regex'
import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import SingleSelect from "../Tools/SingleSelect";
import SingleSelectWithSearch from "../Tools/SingleSelectWithSearch";
const NewVendorPage = () => {
    const [inputs, setInputs] = useState({})
    const [activeIndex, setActiveIndex] = useState(1)
    const [file, setFile] = useState(null)
    const [upload, setUpload] = useState(false)
    const [countryCode, setCountryCode] = useState(getCountryCallingCode('NL'))
    const countries = useMemo(() => countryList().getData(), [])
    const [country, setCountry] = useState('NL')
    const [code, setCode] =useState(postalCodes.NL)
    const [value, setValue] = useState()
    const [addItem, setAddItem] = useState(false)
    const [showMessage, setShowMessage] = useState(false)

    const schema = yup.object().shape({
        contact: yup.string().required('Required'),
        vendor: yup.string().required('Required'),
        link: yup.string().required('Required'),
     address: yup.string().required('Required'),
        city: yup.string().required('Required'),
        postalCode: yup.string().required('Required')
            .matches({code}, ' does not match country format'),
        country: yup.string().required(),
        phone: yup.string().required('Required'),
        email: yup.string()
                .required('Required')
                .email('is not valid')
                .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'is not valid'),
        })
        //address: yup.string().required('Required'),
        //city: yup.string().required('Required'),
        /*postalCode: yup.string().required('Required')
            .matches({code}, ' does not match country format'),*/
    //phone: yup.string().required('Required'),

    /*email: yup.string()
           .required('Required')
           .email('is not valid')
           .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'is not valid'),*/
    console.log(country)
    const { register, handleSubmit, setFocus,  formState: {errors}, reset, resetField, control } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        setFocus('contact', {shouldSelect: true})
    },[setFocus])
    const onSubmit = async(data) => {
        console.log(data)
        const telephone = (Number((countryCode + data.phone).split(' ').join('')))
        try {
            const res = await axios.post(`/api/vendors`,
                {

                        vendor: data.vendor,
                        phone: telephone,
                        email: data.email,
                        link: data.link,
                        contact: data.contact,
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        country: data.country

                });


            if (res.statusText === 'Created') {
                reset()
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleNewPic = (e) => {
        if(uploadedImage.length >= 3) {
            toast.error('Maximum number of product images has been reached')
            setFile(null)
        }else{
            setFile(e.target.files[0])
        }
    }
    const {uploadedImage, setUploadedImage, err} = useUploadImg(file, setFile)


    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    /*const handleSubmit = async(e) => {
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
    }*/
//submitButton={true}
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VendorPageDisplay product={inputs}  submitButton={true}>
                <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
                <div className={`mt-10 `}>
                    <AccordionLayout
                        title={`Add Vendor`}
                        bg={`${activeIndex === 1 ? 'bg-slate-500': 'bg-slate-400'}`}
                        text={'text-white'}
                        mx={'mx-16'}
                        bodyMargin={'mx-10'}
                        index={1}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    >
                        <div className={`flex flex-col w-full`} >
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



                            <div className={`grid grid-cols-2 w-full my-4 mx-10 `}>
                                <div className={`flex flex-col gap-2 text-sm`}>
                                       <div className={`flex flex-col gap-1  text-sm`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.vendor && 'text-red-500 font-bold'}`}>Vendor {errors.vendor?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1  ${errors.vendor && 'border-2 border-red-500'}`}
                                                  onChange={handleChange}  {...register("vendor")}
                                                  type="text"/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.link && 'text-red-500 font-bold'}`}> Website {errors.link?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.link && 'border-2 border-red-500'}`}
                                                  onChange={handleChange} {...register("link")}
                                                  type="text"/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.address && 'text-red-500 font-bold'}`}>Address {errors.address?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.address && 'border-2 border-red-500'}`}
                                                  onChange={handleChange} {...register("address")}
                                                  type="text"/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.city && 'text-red-500 font-bold'}`}>City {errors.city?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.city && 'border-2 border-red-500'}`}
                                                  onChange={handleChange} {...register("city")}
                                                  type="text"/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.country && 'text-red-500 font-bold'}`}>Country {errors.country?.message}</label>

                                           <div>
                                               <select  className={`border w-1/2 rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.country && 'border-2 border-red-500'}`}
                                                        {...register("country")}
                                                        onChange={(e) => {
                                                            setCountry(e.target.value)
                                                            setCountryCode(getCountryCallingCode(e.target.value))
                                                            setCode(postalCodes[e.target.value])
                                                        }}
                                               >
                                                   <option value="NL">NL</option>
                                                   <option value="DE">DE</option>
                                                   <option value="BE">BE</option>
                                                   {countries.map((country, idx)=>(
                                                       <option key={idx} value={country.value}>{country.value}</option>
                                                   ))}
                                               </select>
                                           </div>

                                       </div>
                                </div>
                                <div className={`flex flex-col gap-2 text-sm`}>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.postalCode && 'text-red-500 font-bold'}`}>Postal Code {errors.postalCode?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.postalCode && 'border-2 border-red-500'}`}
                                                  onChange={handleChange} {...register("postalCode")}
                                                  type="text"/>
                                       </div>

                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.contact && 'text-red-500 font-bold'}`}>Contact {errors.contact?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.contact && 'border-2 border-red-500'}`}
                                                  {...register("contact")}
                                                  type="text"/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.phone && 'text-red-500 font-bold'}`}>Contact Phone {errors.phone?.message}</label>
                                           <Input   className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.phone && 'border-2 border-red-500'}`}
                                                    {...register("phone")}

                                                    defaultCountry={country}
                                                    value={value}
                                                    onChange={setValue}/>
                                       </div>
                                       <div className={`flex flex-col gap-1`}>
                                           <label className={`pt-1 uppercase text-slate-400 font-bold ${errors.email && 'text-red-500 font-bold'}`}>Contact Email {errors.email?.message}</label>
                                           <input className={`border w-1/2 border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.email && 'border-2 border-red-500'}`}
                                                  onChange={handleChange} {...register("email")}
                                                  type="text"/>
                                       </div>
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
