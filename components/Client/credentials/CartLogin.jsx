import {useEffect, useRef,useState} from 'react';
import toast, {Toaster} from 'react-hot-toast'
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/router";



import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUser from "../../../pages/api/hooks/useUser";



const CartLogin = () => {
    const {cart,mutateCart,isValidating} = useUser()
    const [originalCart, setOriginalCart] = useState(cart)
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
            console.log('signIn info',res)

            if(res.error){
                toast.error(res.error)

            }else if(res.ok){
                const session = await getSession()
                try{
                    originalCart.items.map(async (newItem)=>{
                        await axios.put(`/api/cart?cart=${session?.id}`,

                            {  items: {
                                    productId: newItem._id,
                                    color: newItem.color,
                                    size: newItem.size,
                                    quantity: newItem.quantity,
                                    name: newItem.name,
                                    img: newItem.img,
                                    price: newItem.price,
                                    modelId: newItem.modelId
                                },
                                addToTotal: newItem.price * newItem.quantity,
                            });

                    })
                    try{
                        const remove = await axios.delete(`/api/cart/delete/${originalCart?._id}`)
                    }catch(err){
                        console.log(err)
                    }
                    toast.success(`Welcome Back!!`)
                    mutateCart()
                }catch(err){
                    console.log(err)
                }

                reset()
                //router.push(`/cart/${cart._id}`)

            }
        }catch(err){
            console.log(err)
        }
    }
    //console.log(originalCart)
    return (
        <form className='px-5 gap-3  flex flex-col w-full' onSubmit={handleSubmit(onSubmit)}>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("username")}
                   type="text" placeholder='username'/>
            <input className={`border pl-2 py-0.5 hover:bg-slate-50 text-sm rounded border-slate-500 placeholder:text-slate-300`}
                   {...register("password")}
                   type="password" placeholder='password'/>
            <div className='flex justify-center py-3'>
                <button type={`submit`} className='  py-1 px-2 uppercase rounded bg-blue-500 text-white w-1/2'>
                    Submit
                </button>
            </div>

        </form>
    );
};

export default CartLogin;
