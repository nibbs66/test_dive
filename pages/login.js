import {useEffect, useRef,useState} from 'react';
import toast, {Toaster} from 'react-hot-toast'
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/router";



import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Client from "../components/layout/Client";
import Link from "next/link";

const Login = () => {

    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)

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
                reset({username: '', password: ''})
               await router.push('/')

                /*if(location === 'home'){
                    router.push('/')
                }*/

                /* {
                     if (location === 'checkout') {
                         router.push(`/cart/${cart.cartId}`)
                     }
                 }*/



            }
        }catch(err){
            console.log(err)
        }
    }

    return (

        <div className={`h-screen  p-16`}>
            <div className={`flex flex-col items-center`}>
                <Toaster toastOptions={{className: 'text-xl text-center', duration: 5000,}}/>
                <div className={`flex h-1/4`}>
                    <span className={`text-3xl text-slate-400  pb-5 uppercase`}>Login</span>
                </div>
                <form className={`flex flex-col items-center gap-4 w-1/3 py-10 md:border rounded-md md:shadow-xl text-slate-400`} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col`}>
                        <label className={`px-1 ${errors.username && 'text-red-500 font-bold'}`} htmlFor="username">Username</label>
                        <input className={`border rounded border-slate-600 p-1 text-sm focus:outline-0 text-slate-500`} {...register("username")}/>
                        <div className={`flex justify-end text-slate-400 font-thin text-xs cursor-pointer`}>
                            <Link  href='/reset/password' passHref>
                            <span>Forgot Password?</span>
                            </Link>
                        </div>

                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`px-1 ${errors.password && 'text-red-500 font-bold'}`} htmlFor="">Password</label>
                        <input className={`border rounded border-slate-600 p-1 text-sm focus:outline-0 text-slate-500`}  {...register("password")}
                               type={'password'}/>
                        <div className={`flex justify-end text-slate-400 font-thin text-xs cursor-pointer`}>
                            <Link  href='/reset/username' passHref>
                            <span>Forgot Username?</span>
                            </Link>
                        </div>
                    </div>





                    <div className={`flex items-center justify-center`}>
                        <button className={`bg-blue-500 uppercase text-white rounded py-1 px-4`} type='submit'>Login</button>
                    </div>
                </form>
                <div className={`flex justify-center mt-5 text-sm gap-2`}>
                    <span>Don&apos;t have an account?</span>
                    <Link  href='/register' passHref>
                    <span  className={`text-blue-500 cursor-pointer`}>
                        Sign Up!
                    </span>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Login;
Login.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
