import {useEffect, useRef,useState} from 'react';
import toast, {Toaster} from 'react-hot-toast'
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/router";



import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUser from "../../pages/api/hooks/useUser";



const CartLogin = () => {
    const {cart,mutateCart,isValidating} = useUser()
    const router = useRouter()
    const schema = yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string()
            .required('Required')
            .min(6),
    })
    const { register, handleSubmit, setFocus, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        setFocus('username', {shouldSelect: true})
    },[setFocus])

    const onSubmit = async(data)=> {

        try{
            const res = await signIn('credentials', {
                redirect: false,
                username:  data.username,
                password:   data.password,
            });

            if(res.error){
                toast.error(res.error)

            }else if(res.ok){
                toast.success(`Welcome Back!!`)
                await getSession()
                reset()
                router.push(`/cart/${cart._id}`)

            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <form className='px-5 gap-3  flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
            <input className='border-b border-slate-400  pl-1 bg-[ghostwhite] focus:outline-0'
                   {...register("username")}
                   type="text" placeholder='username'/>
            <input className='border-b border-slate-400  pl-1 bg-[ghostwhite] focus:outline-0'
                   {...register("password")}
                   type="password" placeholder='password'/>
            <div className='flex justify-center py-3'>
                <button type={`submit`} className='  py-1 px-2 uppercase rounded bg-red-500 text-white w-1/2'>
                    Submit
                </button>
            </div>

        </form>
    );
};

export default CartLogin;
