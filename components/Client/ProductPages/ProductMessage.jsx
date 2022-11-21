import {useState} from 'react';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import phone from 'phone'
import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import axios from "axios";
const AnotherProductMessage = ({product}) => {

    const [value, setValue] = useState()
    const schema = yup.object().shape({
        fullName: yup.string().required('Required'),
        email: yup.string()
            .required('Required')
            .email('is not valid')
            .matches(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'is not valid'),
        message: yup.string().required(),
        phone: yup.string().required('Required'),
    })

    const { register, handleSubmit, setFocus, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async(data) => {
        console.log(data)
        try{
            const res = await axios.post(`/api/messages`,
                {
                    fullName: data.fullName,
                    phone: Number((data.phone).split(' ').join('')),
                    email: data.email,
                    subject: 'product',
                    regarding: product._id+',  '+product.vendor+' '+ product.name,
                    message: data.message,

                });



            if (res.status === 201) {

                reset({fullName: '', email: '',  phone: '', message: ''})
            }
        }catch(err){
            console.log(err)
            //toast.error(err.response.data)


        }
    };
    console.log(value)
    return (
        <div className={`bg-[ghostwhite] rounded drop-shadow-lg w-full`}>
            <div className={` mx-auto flex flex-col  w-full justify-center items-center   sm:py-32 mb-5`}>
                <div className={`max-w-3xl flex items-start h-full pb-10`}>
                       <span className={`sm:pl-10 px-4 text-center text-4xl tracking-tight text-slate-400 font-thin `}>
                       Heeft u een vraag over dit product?
                  </span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col  items-center ">
                    <div className="flex flex-col  items-start w-full space-y-4">


                        <input
                            type="text"
                            {...register("fullName")}
                            id="fullName"
                            autoComplete="fullName"
                            className={` block  text-slate-500 text-sm rounded-md border-slate-300 py-2 px-4 placeholder-slate-400 shadow-sm focus:outline-0 focus:border-slate-300 ${errors.fullName && 'border-2 border-red-500 placeholder:text-red-500 placeholder:font-bold'}`}
                            placeholder={`${errors.fullName ? 'Naam Verplicht' : 'Naam'}`}
                        />
                        <input
                            id="email"
                            {...register("email")}
                            type="email"
                            autoComplete="email"
                            className={`block  text-slate-500 text-sm rounded-md border-slate-300 py-2 px-4 placeholder-slate-400 shadow-sm focus:outline-0 focus:border-slate-300 ${errors.email && 'border-2 border-red-500 placeholder:text-red-500 placeholder:font-bold'}`}
                            placeholder={`${errors.email ? 'E-mailadres Verplicht' : 'E-mailadres'}`}
                        />
                        <Input   className={` cursor-pointer hover:bg-slate-50 border  rounded border-slate-600 text-sm text-slate-500 rounded-md border-slate-300 py-2 px-4 placeholder-slate-400 focus:outline-0 ${errors.phone && 'border-2 border-red-500'}`}
                                 {...register("phone")}

                                 defaultCountry={'NL'}
                                 value={value}
                                 placeholder={`${errors.email ? 'Telefoon Verplicht' : 'Telefoon'}`}
                                 onChange={setValue}/>
                        <textarea
                            id="message"
                            {...register("message")}
                            cols={40}
                            rows={4}
                            className={`block w-full text-slate-500 rounded-md text-sm border-slate-300 py-3 px-4 placeholder-slate-400 shadow-sm focus:outline-0 focus:border-slate-300 ${errors.message && 'border-2 border-red-500 placeholder:text-red-500 placeholder:font-bold'}`}
                            placeholder={`${errors.message ? 'Bericht Verplicht' : 'Bericht'}`}
                            defaultValue={''}
                        />
                        <button className={` px-4 py-2 text-white rounded bg-blue-500 focus:placeholder:text-xs hover:bg-blue-600 drop-shadow-lg`}
                                type={`submit`}>Verzenden
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AnotherProductMessage;
