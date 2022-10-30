import {useState, useEffect} from 'react';
import axios from "axios";
import Client from "../../components/layout/Client";
import NewCard from "../../components/Card/NewCard";
import Image from "next/image";
import {useRouter} from "next/router";
import ClientHeader from "../../components/ClientHeader";
import introImg from "../../public/img/padi-shop.jpeg";
import MainReturn from "../../components/Shop/MainReturn";
const Index = ({categories, products, vendors}) => {
    const [manufacturerList, setManufacturerList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [main, setMain] = useState('categories')
    const router = useRouter()
    //<Link href={`/shop/category/${category.name}`} passHref >
    useEffect(()=>{
        products?.map((manufacturer)=>{
            setManufacturerList((prev)=>[...prev, manufacturer.manufacturer])
        },[products, categories])


    },[products])

    useEffect(()=>{

        const list = new Set(manufacturerList)
        setSearchList([...new Set(manufacturerList)])
    },[manufacturerList])
    const handleClick = (data, value) => {

        router.push(`/shop/${value}/${data}`)
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
                <ClientHeader title={'Shop By:'}/>
                <div className={`flex items-center gap-x-10 pt-10 text-slate-500 font-thin`}>
                    <button onClick={()=>setMain('categories')} className={`rounded py-3 px-4 text-white leading-none drop-shadow-lg bg-blue-500 uppercase`}>Category</button>
                    <span >-OR-</span>
                    <button onClick={()=>setMain('vendor')} className={`rounded py-3 px-4 text-white leading-none drop-shadow-lg bg-blue-500 uppercase`}>Manufacturer</button>
                </div>
                <MainReturn vendors={vendors} categories={categories} main={main} handleClick={handleClick}/>

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
    const res = await axios.get(`https://`+host+`/api/catMenu`);
    const prod = await axios.get(`https://`+host+`/api/products`);
    const vend = await axios.get(`https://`+host+`/api/vendors`)
    return {
        props: {
            categories: res.data,
            products: prod.data,
            vendors: vend.data

        },
    }
}
