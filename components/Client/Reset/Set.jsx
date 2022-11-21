import {useEffect} from 'react';
import ResetLayout from "./ResetLayout";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'


import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";



const Set = ({lostItem}) => {
    console.log(lostItem[1])
    const schema = yup.object().shape({
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
        setFocus('password', {shouldSelect: true})
    },[setFocus])
    const onSubmit = async(data)=> {

        try{
            const res = await axios.put(`/api/users/${lostItem[1]}`,
                {password: data.password}
            )
            console.log(res.data)
        }catch(err){
            console.log(err)

        }

    }


    return (
        <ResetLayout onSubmit={onSubmit} handleSubmit={handleSubmit}>
            <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
            <span className={`uppercase text-slate-400 font-bold`}>Please Enter Your new password</span>
            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 text-slate-500 w-1/2  md:w-3/4`}
                   {...register("password")}
                   placeholder={`Enter password....`}
                   type="password"/>
            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 text-slate-500 w-1/2  md:w-3/4`}
                   {...register("confirmPassword")}
                   placeholder={`Re-enter password....`}
                   type="password"/>

            <button className={`bg-blue-500 rounded text-white font-bold py-1 px-2 uppercase`} type={`submit`}>submit</button>



        </ResetLayout>
    );
};

export default Set;
