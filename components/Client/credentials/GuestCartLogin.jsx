import  {useState, useMemo, useEffect} from 'react';
import {useRouter} from "next/router";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import phone from 'phone'
import postalCodes from 'zipcodes-regex'
import axios from "axios";
import useUser from "../../../pages/api/hooks/useUser";
import Input from '../../Input'

const GuestCartLogin = ({setGuestCheck, setActiveIndex}) => {

    const countries = useMemo(() => countryList().getData(), [])

    const router = useRouter()
    const [country, setCountry] = useState('')
    const [code, setCode] =useState(postalCodes.NL)
    const{cart, mutateCart} = useUser()
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        country: yup.string().required(),
        address: yup.string().required(),
        city: yup.string().required(),
        postalCode: yup.string().required()
            .matches({code}, 'Post Code does not match country format'),
        phone: yup.string().required('Please enter your phone number'),

    })
    const { register, handleSubmit,setFocus, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        setFocus('firstName', {shouldSelect: true})
    },[setFocus])

    const onSubmit = async(data) => {

        try{
            const res = await axios.put(`/api/cart/guest/${cart?._id}`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    city: data.city,
                    postalCode: data.postalCode,
                    country: data.country
                });
            mutateCart()

            if(res.status===200){
               setGuestCheck(true)
                setActiveIndex(0)
                reset()


            }

        }catch(err){
            console.log(err)
        }


    };

    return (
        <form className='px-5 gap-3  flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>

            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("firstName")}
                   type={`text`} placeholder='voornaam'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("lastName")}
                   type="text" placeholder='achternaam'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("email")}
                   type="text" placeholder='email'/>

            <select  className={`border pl-2 py-1 text-xs  hover:bg-slate-50 rounded border-slate-500 placeholder:text-slate-300`}
                     {...register("country")}
                     onChange={(e) => {
                         setCountry(e.target.value)
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
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("address")}
                   type="text" placeholder='straat'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("city")}
                   type="text" placeholder='stad'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("postalCode")}
                   type="text" placeholder='postal code'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("phone")}
                   type="text" placeholder='phone'/>
            <div className='flex justify-center py-3'>
                <button type={`submit`} className={`  py-1 px-2 uppercase rounded bg-blue-500 text-white w-1/2`}>Submit</button>
            </div>

        </form>
    );
};

export default GuestCartLogin;
