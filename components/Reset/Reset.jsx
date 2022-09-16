import {useEffect, useState} from 'react';

import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import {signIn, getSession} from "next-auth/react";
import {useRouter} from "next/router";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ResetLayout from "./ResetLayout";

const Reset = ({lostItem}) => {
    const schema = yup.object().shape({
        email: yup.string().required('Required'),

    })
    const { register, handleSubmit, setFocus, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(()=>{
        setFocus('email', {shouldSelect: true})
    },[setFocus])
    const onSubmit = async(data)=> {

        try{
            const res = await axios.post(`/api/reset`, {email: data.email, request: `${lostItem}`})
            toast.success(res.data)
            reset({email: ''})
        }catch(err){
            console.log(err)
        }

    }


    return (
      <ResetLayout onSubmit={onSubmit} handleSubmit={handleSubmit}>
          <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
              <span className={`uppercase text-slate-400  font-bold`}>Please Enter Your Email Address</span>
              <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 text-slate-500 w-1/2  md:w-3/4`}
                     {...register("email")}
                     type="text"/>
              <button className={`bg-blue-500 rounded text-white font-bold py-1 px-2 uppercase`} type={`submit`}>submit</button>



      </ResetLayout>
    );
};

export default Reset;
