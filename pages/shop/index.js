import React from 'react';
import axios from "axios";
import Client from "../../components/layout/Client";
import NewCard from "../../components/Card/NewCard";
import Image from "next/image";
import {useRouter} from "next/router";
import ClientHeader from "../../components/ClientHeader";
import introImg from "../../public/img/padi-shop.jpeg";
const Index = ({categories}) => {
    const router = useRouter()
    //<Link href={`/shop/category/${category.name}`} passHref >
    const handleClick = (data) => {
        router.push(`/shop/category/`+data)
    }

    return (
        <div className='flex min-h-fit w-screen pt-1  pb-10'>
           <div className="flex flex-col w-full  items-center">
               <div className={'relative flex  h-auto md:h-1/6 overflow-hidden'}>
                   <Image className=' flex' src={introImg} alt='' layout='intrinsic' objectFit={'cover'}/>
                   <div className={'flex absolute  left-16 top-16 sm:top-64 text-white sm:font-thin  text-xl font-bold sm:text-5xl uppercase'}>
                       webshop
                   </div>
               </div>
               <ClientHeader title={'Choose a Category:'}/>
               <div className="grid  lg:grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                   {categories.map((category)=>(
                       <div  key={category._id}  onClick={()=>handleClick(category.name)}>
                              <NewCard >
                                  <div className=' md:flex justify-center'>
                                      <Image  src={category.img}   alt="" width={300} height={350} objectFit="contain"/>
                                  </div>
                                 <div className='px-5 flex flex-col items-center text-center sm:items-end sm:text-end gap-5'>

                                         <span className='uppercase text-slate-500 font-bold sm:text-slate-400 sm:text-lg'>{category.name}</span>


                                         <span className='hidden sm:flex sm:text-base sm:uppercase sm:font-bold sm:text-slate-500'>{category.desc}</span>

                                 </div>
                              </NewCard>
                          </div>

                   ))}

               </div>

           </div>



        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
export async function getServerSideProps(ctx) {
    const host = ctx.req.headers.host;
    const res = await axios.get(`http://`+host+`/api/catMenu`);
    return {
        props: {
            categories: res.data,


        },
    }
}
