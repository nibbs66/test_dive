import {useEffect, useState, useMemo} from 'react';
import UserLayout from "./UserLayout";
import AccordionLayout from "../Accordion/AccordionLayout";
const initialUser = ['customer']
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import countryList from 'react-select-country-list'
import postalCodes from 'zipcodes-regex'
import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import axios from "axios";

const NewUser = ({agency}) => {
    const countries = useMemo(() => countryList().getData(), [])
    const [activeIndex, setActiveIndex] = useState(1)
    const [userType, setUserType] = useState(initialUser)
    const [inputs, setInputs] = useState({});
    const [isEmployee, setIsEmployee] = useState(false)
    const [agencyIndex, setAgencyIndex] = useState('')
    const [certAgency, setCertAgency] = useState({})
    const [country, setCountry] = useState('NL')
    const [phoneValue, setPhoneValue] = useState()
    const [code, setCode] =useState(postalCodes.NL)
    const [disabled, setDisabled] = useState(true)
    const [userNameError, setUserNameError] = useState(false)
    const [message, setMessage] = useState('')
    const [experience, setExperience] = useState([])
    const [countryCode, setCountryCode] = useState(getCountryCallingCode('NL'))



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
            .matches({code}, ' does not match country format'),
        phone: yup.string().required('Required'),
        dob: yup.string().required('Required'),
        password: yup.string()
            .required("Required")
            .min(8, "Must be 8 characters or more")
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number"),
        certificationAgency: yup.string(),

        emergencyFirstName: yup.string().required(),
        emergencyLastName: yup.string().required(),
        emergencyEmail: yup.string().email().required(),
        emergencyPhone: yup.string().required('Please enter your phone number for emergency'),
        diverNumber: yup.string(),
        instructorNumber: yup.string(),
        position: yup.string(),
        hireDate: yup.string(),
        date: yup.string(),

    })
    const { register, handleSubmit, setFocus,  formState: {errors}, reset, resetField } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        if(!errors){
            setDisabled(false)
        }
        setFocus('firstName', {shouldSelect: true})
    },[setFocus, errors])

    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleCertification = (e) => {
        const{checked} = e.target
        const {value, type} = e.target
        const {name} = e.target
        if(type !== 'checkbox'){
            e.target.name === 'certificationAgency' && setAgencyIndex(value)

            setCertAgency(prev=>{
                return {...prev, [name]: value}
            })
        }

        if(type === 'checkbox'){
            if(checked){
                if(certAgency[name] === undefined){
                    setCertAgency(prev=>{
                        return {...prev, [name]: [value]}
                    })
                }else if(certAgency[name] !== undefined){
                    const newLevels = certAgency[name]
                    newLevels.push(value)
                    setCertAgency(prev=>{
                        return {...prev, [name]: newLevels}
                    })
                }
            }
            if(!checked) {
                const removeItem = certAgency[name]
                const filteredLevels =  removeItem.filter((item, index) => item !== value)

                setCertAgency(prev => {
                    return {...prev, [name]: filteredLevels}
                })
            }
        }


    }
    console.log(userType)
    const onSubmit = async(data) => {
        if(userNameError){
            setUserNameError(!userNameError)
        }

        const telephone = (Number((countryCode + data.phone).split(' ').join('')))
        try {
            const res = await axios.post(`/api/users`,
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    personal: {
                        phone: telephone,
                        email: data.email,
                        username: data.username,
                        dob: data.dob,
                    },
                    address: {
                        address: data.address,
                        city: data.city,
                        postalCode: data.postalCode,
                        country: data.country
                    },
                    experience: experience,
                    emergencyContact: {
                        firstName: data.emergencyFirstName,
                        lastName: data.emergencyLastName,
                        email: data.emergencyEmail,
                        phone: data.emergencyPhone
                    },
                    employeeInfo: {
                        hireDate: data.hireDate,
                        position: data.position

                    },
                    userType,
                    isEmployee
                });

            setMessage(res.data)
            if (res.statusText === 'Created') {
                reset()
            }
        } catch (err) {
            console.log(err)
        }
    }
    console.log(experience)
    return (
        <UserLayout user={inputs}>
            <form className={`flex my-10 flex-col gap-5`}  onSubmit={handleSubmit(onSubmit)}>
                <div className={`flex justify-end mx-10`}>
                    <button type={`submit`}
                            className={` uppercase py-2 px-4 rounded font-bold text-sm bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        create user
                    </button>
                </div>
                <AccordionLayout
                    title='Personal'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >


                    <div className={`grid grid-cols-3 gap-5 items-center my-5 mx-10 w-full`}>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 pl-1 uppercase font-bold text-sm ${errors.firstName && 'text-red-500 font-bold'}`} htmlFor="voornaam">Voornaam {errors.firstName?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.firstName && 'border-2 border-red-500'}`}
                                   {...register("firstName")}
                                   onChange={handleChange} name={`firstName`} type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 uppercase font-bold text-sm pl-1 ${errors.lastName && 'text-red-500 font-bold'}`} htmlFor="achternaam">Achternaam {errors.lastName?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 ${errors.lastName && 'border-2 border-red-500'}`}
                                   {...register("lastName")}
                                   onChange={handleChange} name={`lastName`} type="text"/>
                        </div>

                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.username && 'text-red-500 font-bold'}`} htmlFor="">Username {errors.username?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.username && 'border-2 border-red-500'}`} type="text"
                                   {...register("username")}
                                   onChange={handleChange} name={`username`}/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.password && 'text-red-500 font-bold'}`} htmlFor="">Password {errors.password?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.password && 'border-2 border-red-500'}`}
                                   {...register("password")}
                                   onChange={handleChange} name={`password`}type="password"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.country && 'text-red-500 font-bold'}`} htmlFor="">Country {errors.country?.message}</label>
                            <select  className={`border rounded border-slate-400 text-sm text-slate-500 p-1 focus:outline-0 w-3/4 
                                    ${errors.country && 'border-2 border-red-500'}`}
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
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.address && 'text-red-500 font-bold'}`} htmlFor="">Address {errors.address?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.address && 'border-2 border-red-500'}`}
                                   {...register("address")}
                                   onChange={handleChange} name={`address`}type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.city && 'text-red-500 font-bold'}`} htmlFor="">City {errors.city?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.city && 'border-2 border-red-500'}`}
                                   {...register("city")}
                                   onChange={handleChange} type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.postalCode && 'text-red-500 font-bold'}`} htmlFor="">Postal Code {errors.postalCode?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.postalCode && 'border-2 border-red-500'}`}
                                   {...register("postalCode")}
                                   onChange={handleChange} type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.email && 'text-red-500 font-bold'}`} htmlFor="">email {errors.email?.message}</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.email && 'border-2 border-red-500'}`}
                                   {...register("email")}
                                   onChange={handleChange}type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.phone && 'text-red-500 font-bold'}`} htmlFor="">phone {errors.phone?.message}</label>
                            <Input className={`border rounded border-slate-400 text-sm text-slate-500 p-1 w-3/4 focus:outline-0 ${errors.phone && 'border-2 border-red-500'}`}
                                   {...register("phone")}

                                   defaultCountry={country}
                                   value={phoneValue}
                                   onChange={setPhoneValue}/>

                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 font-bold text-sm uppercase pl-1 ${errors.dob && 'text-red-500 font-bold'}`} htmlFor="">birthday {errors.dob?.message}</label>
                            <input  className={`border border-slate-400 text-slate-500 focus:outline-0 rounded text-sm p-1 w-3/4 ${errors.dob && 'border-2 border-red-500'}`}
                                    {...register("dob")}
                                    onChange={handleChange} type="date"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`font-bold text-sm uppercase text-slate-400`} htmlFor="">Employee?</label>

                            <div className={`flex items-center gap-5`}>
                                <label className={`text-slate-400`} htmlFor="">Ja</label>
                                <input type="checkbox" onChange={()=>{
                                    setIsEmployee(!isEmployee)
                                    !userType.includes('employee') && !isEmployee && setUserType(prev=>[...prev, 'employee'])
                                    userType.includes('employee') && isEmployee  && setUserType(userType.slice(0,1))

                                }}/>
                            </div>
                        </div>


                    </div>

                </AccordionLayout>
                <AccordionLayout
                    title='Certifications'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col  content-center my-5 mx-10 w-full`}>
                        <div className={`grid grid-cols-3 gap-5 items-center `}>

                            <div className={`flex flex-col gap-2 h-full`}>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Agency</label>
                                    <select className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="select"
                                            name='certificationAgency'
                                            {...register("certificationAgency")}
                                            onChange={handleCertification}

                                    >
                                        <option value=""></option>
                                        {agency.map((name, idx)=>(
                                            <option key={idx}  name='certificationAgency' value={name.name}>{name.name}</option>

                                        ))}
                                    </select>
                                </div>
                                <div className={`flex flex-col gap-1 `}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Diver Number</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"
                                           {...register("diverNumber")}
                                           onChange={handleCertification}
                                    />
                                </div>

                            </div>
                            <div className={`flex flex-col gap-2 h-full`}>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Certification Date</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"
                                           {...register("date")}
                                           onChange={handleCertification}/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Instructor</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"
                                           {...register("instructorNumber")}
                                           onChange={handleCertification}/>
                                </div>
                            </div>

                            <div className={`flex flex-col gap-1 h-full`}>
                                <label className={`text-slate-400 font-bold text-sm uppercase pl-1 pb-2`} htmlFor="">Levels</label>
                                { agency[agency.findIndex(index => index.name === agencyIndex)]?.levels?.map((level,idx)=>(
                                    <div key={idx} className={`flex content-center justify-between w-full`}>
                                        <label className={`text-sm text-slate-400`} htmlFor="">{level}</label>
                                        <div className={`flex justify-end`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 items-start w-full`}
                                                   type="checkbox"
                                                   id={idx}
                                                   value={level}
                                                   {...register("certificationLevel")}
                                                   onClick={handleCertification}/>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                        <div className={`flex justify-center mt-10`}>
                            <button
                                onClick={()=>{
                                    setExperience(prev=>[...prev, {certAgency}])
                                    resetField('diverNumber')
                                    resetField('instructorNumber')
                                    resetField('certificationAgency')
                                    resetField('date')
                                    resetField("certificationLevel")
                                }}
                                className={`bg-green-500 rounded uppercase text-white font-bold text-sm py-1 px-2`}>
                                Submit Cert
                            </button>
                        </div>


                    </div>
                </AccordionLayout>
                <AccordionLayout
                    title='Emergency Contact'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`grid grid-cols-2 gap-5 items-center my-5 mx-10 w-full`}>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 pl-1 uppercase font-bold text-sm`} htmlFor="voornaam">Voornaam</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange} {...register("emergencyFirstName")}  type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 uppercase font-bold text-sm pl-1`} htmlFor="achternaam">Achternaam</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange} {...register("emergencyLastName")}  type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 pl-1 uppercase font-bold text-sm`} htmlFor="email">email</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange} {...register("emergencyEmail")}  type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 uppercase font-bold text-sm pl-1`} htmlFor="phone">phone</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange} {...register("emergencyPhone")}  type="text"/>
                        </div>

                    </div>

                </AccordionLayout>
                {isEmployee && <AccordionLayout
                    title='Employment'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    index={4}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`grid grid-cols-3 gap-5 items-center my-5 mx-10 w-full`}>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 pl-1 uppercase font-bold text-sm`} htmlFor="doh">Date of Hire</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`}
                                   {...register("hireDate")}
                                   onChange={handleChange}  type="text"/>
                        </div>
                        <div className={`flex flex-col gap-1`}>
                            <label className={`text-slate-400 uppercase font-bold text-sm pl-1`} htmlFor="position">position</label>
                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`}
                                   {...register("position")}
                                   onChange={handleChange} type="text"/>
                        </div>

                    </div>

                </AccordionLayout>}

            </form>
        </UserLayout>
    );
};

export default NewUser;
