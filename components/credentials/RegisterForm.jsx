import {useState, useMemo, useEffect} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
const initialUser = ['customer']
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import phone from 'phone'
import postalCodes from 'zipcodes-regex'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import PhoneInput2 from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const RegisterForm = () => {
    const router = useRouter()
    const countries = useMemo(() => countryList().getData(), [])
    const [country, setCountry] = useState('NL')
    const [userType, setUserType]= useState(initialUser)
    const [number, setNumber] = useState('')
    const [value, setValue] = useState()

    const [userNameError, setUserNameError] = useState(false)
    const [code, setCode] =useState(postalCodes.NL)


    const schema = yup.object().shape({
        firstName: yup.string().required('Required'),
        lastName: yup.string().required('Required'),
        username: yup.string()
            .required('Required'),
        email: yup.string()
            .required('Required')
            .email('is not valid')
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'is not valid'),
        country: yup.string().required(),
        address: yup.string().required('Required'),
        city: yup.string().required('Required'),
        postalCode: yup.string().required('Required')
            .matches({code}, 'does not match country'),
        phone: yup.string().required('Required'),
        password: yup.string()
            .required("Required")
            .min(8, "must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        confirmPassword: yup.string()
            .required('Required')
            .oneOf([yup.ref("password"), null], "Passwords must match"),



    })

    const { register, handleSubmit, setFocus, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
   useEffect(()=>{
       setFocus('firstName', {shouldSelect: true})
   },[setFocus])
    const onSubmit = async(data) => {
       if(userNameError){
           setUserNameError(false)
       }

        try{
            const res = await axios.post(`/api/users`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    personal: {
                        phone: Number((data.phone).split(' ').join('')),
                        email: data.email,
                        username: data.username
                    },
                    address: {
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        country: data.country
                    },
                    userType,
                });
            console.log(res)


            if (res.statusText === 'Created') {
                toast.success(res.data)
                reset({username: '', password: ''})
            }
        }catch(err){
            console.log(err)
             //toast.error(err.response.data)
            setUserNameError(true)

        }
    };
const handleClick = () => {
    router.push('/login')
}


    return (
        <div className={`h-screen  pt-2  md:p-16`}>
            <Toaster toastOptions={{className: 'text-center', duration: 5000,}}/>
            <div className={`flex flex-col items-center `}>
                <div className={`flex justify-center `}>
                    <span className={`text-3xl text-slate-400 uppercase`}>Register</span>
                </div>
                <div className={`flex justify-center md:my-5 text-sm gap-2`}>
                    <span>Already have an account?</span><span  onClick={handleClick} className={`text-blue-500 cursor-pointer`}>Log In!</span>
                </div>
                <form className={`flex flex-col xl:w-1/2  w-3/4 items-center py-10 mx-5 md:border rounded md:shadow-xl text-slate-400`} onSubmit={handleSubmit(onSubmit)}>
                    <div  className={`grid md:grid-cols-2 gap-x-10 md:gap-y-2 pb-5  h-full content-around`}>
                        <div className={`flex flex-col `}>
                            <label className={`${errors.firstName && 'text-red-500 font-bold'}`} htmlFor="">Voornaam {errors.firstName?.message}</label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1  focus:outline-0 ${errors.firstName && 'border-2 border-red-500'}`}
                                   {...register("firstName")} type="text"
                            />
                            {/*<span>{errors.firstName?.message}</span>*/}

                        </div>
                        <div className={`flex flex-col `}>
                            <label className={`${errors.lastName && 'text-red-500 font-bold'}`} htmlFor="">Achternaam {errors.lastName?.message}</label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1  focus:outline-0 ${errors.lastName && 'border-2 border-red-500'}`}
                                   {...register("lastName")} type="text"
                            />

                        </div>
                        <div className={`flex flex-col `}>
                            <label className={`${errors.username  && 'text-red-500 font-bold'} ${userNameError === true && 'text-red-500 font-bold'} `}htmlFor="">
                                Username {errors.username?.message} {userNameError === true && <span>taken. Must be unique.</span>}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.username && 'border-2 border-red-500'}`}
                                   {...register("username")} type="text"
                            />

                        </div>
                        <div className={`flex flex-col   `}>
                            <label className={`${errors.email && 'text-red-500 font-bold'}`} htmlFor="">Email {errors.email?.message}</label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.email && 'border-2 border-red-500'}`}
                                   {...register("email")} type="email"
                            />

                        </div>
                        <div className={`flex flex-col  `}>
                            <label className={`${errors.password && 'text-red-500 font-bold'}`} htmlFor="">
                                Password {errors.password?.message}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.password && 'border-2 border-red-500'}`}
                                   {...register("password")} type="password"
                            />

                        </div>
                        <div className={`flex flex-col   `}>
                            <label className={`${errors.confirmPassword && 'text-red-500 font-bold'}`} htmlFor="">
                                Confirm Password {errors.confirmPassword?.message}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.confirmPassword && 'border-2 border-red-500'}`}
                                   {...register("confirmPassword")} type="password"
                            />

                        </div>
                        <div className={`flex flex-col `}>
                            <label className={`${errors.country && 'text-red-500 font-bold'}`} htmlFor="">
                                Country{errors.country?.message}
                            </label>
                            <select  className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.country && 'border-2 border-red-500'}`}
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
                        </div>
                        <div className={`flex flex-col`}>
                            <label className={`${errors.phone && 'text-red-500 font-bold'}`} htmlFor="">
                                Phone {errors.phone?.message}
                            </label>
                            <PhoneInput className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.phone && 'border-2 border-red-500'}`}
                                        {...register("phone")}

                                        placeholder="Enter phone number"
                                        defaultCountry={country}
                                        value={value}
                                        onChange={setValue}/>


                        </div>

                        <div className={`flex flex-col   `}>
                            <label className={`${errors.address && 'text-red-500 font-bold'}`} htmlFor="">
                                Address {errors.address?.message}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.address && 'border-2 border-red-500'}`}
                                   {...register("address")} type="text"
                            />
                        </div>
                        <div className={`flex flex-col   `}>
                            <label className={`${errors.city && 'text-red-500 font-bold'}`} htmlFor="">
                                City {errors.city?.message}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.city && 'border-2 border-red-500'}`}
                                   {...register("city")} type="text"
                            />
                        </div>
                        <div className={`flex flex-col   `}>
                            <label className={`${errors.postalCode && 'text-red-500 font-bold'}`} htmlFor="">
                                Postal Code {errors.postalCode?.message}
                            </label>
                            <input className={`border rounded border-slate-600 text-sm text-slate-500 p-1 focus:outline-0 ${errors.postalCode && 'border-2 border-red-500'}`}
                                   {...register("postalCode")} type="text"
                            />
                        </div>
                    </div>

                    <div className={``}>
                        <button className={`bg-blue-500 uppercase text-white rounded py-1 mt-5 px-4`} type={`submit`}>Submit</button>
                    </div>
                </form>



            </div>
        </div>
    );
};

export default RegisterForm;
