import {useState, useMemo} from 'react';
import Client from "../../components/layout/Client";
import useUser from "../api/hooks/useUser";
import {useRouter} from "next/router";
import ClientHeader from "../../components/ClientHeader";
import NewCard from "../../components/Card/NewCard";
import Image from "next/image";


const Favorites = () => {
    const {favorites, isLoggedIn, mutate, userId} = useUser()
    const router = useRouter()
    const {fav} = router.query



const handleClick = (data) => {
    router.push(`/shop/favorites/${data}`)
}
    return (
        <div className=' w-screen pb-10 min-h-screen'>
            <div className="flex flex-col w-full  ">
                <ClientHeader lastPage={'shop'} title={fav}/>
                <div className="grid  lg:grid-cols-4 gap-4 px-5 mt-5 overflow-y-auto h-3/4 w-full pb-10">
                    {favorites?.items?.map((item)=>(
                        <div onClick={()=>handleClick(item._id)}  key={item._id}>
                            <NewCard>
                                <div className=' flex justify-center'>
                                    <Image src={`/img/${item.img[0]}`} alt="" width={100} height={100} objectFit="contain"/>
                                </div>

                                <div className='flex pt-5 pr-2 justify-center lg:justify-end'>
                                    <span className='uppercase font-bold text-slate-400'>{item.manufacturer}</span>
                                </div>
                                <div className='flex lg:pt-5 pt-1 pb-5 pr-2 justify-center lg:justify-end text-center'>
                                    <span className='uppercase font-bold text-slate-400 text-xs md:text-sm'>{item.name}</span>
                                </div>


                            </NewCard>
                        </div>
                    ))}
                </div>
                <div className='pr-16 pb-10'>

                </div>
            </div>

        </div>
    );
};

    export default Favorites;
    Favorites.getLayout = function getLayout(page){
        return(
            <Client>
                {page}
            </Client>
        )
    }
