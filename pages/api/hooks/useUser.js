import useSWR from "swr";

import {useSession} from "next-auth/react";
import {useEffect, useState} from 'react'
import {fetcher} from "../../../components/helper/fetcher";

import {getCookie} from "cookies-next";
export default function useUser () {

    const [guestId, setGuestId] = useState('')
    const{data: session, status} = useSession()


    const id = session?.id
    useEffect(()=>{
        const guestCookie =  getCookie('visitor')
        setGuestId(guestCookie)


    },[])

    const {data: user, error, isValidating, mutate} = useSWR(id && `/api/users/`+id, fetcher)
    let cartId;
    if(user){
        cartId = id
    }else if(!user){
        const guestCookie = getCookie('visitor')
        cartId =  guestCookie
    }

    const {data: cart, mutate: mutateCart, isValidating: validateCart} = useSWR( `/api/cart?cart=${cartId}` , fetcher)

    const {data: favorites, mutate: mutateFavorite} = useSWR(user && `/api/favorite?favorite=${cartId}`, fetcher)


    return {
        user,
        mutate,
        cart,
        cartId,
        validateCart,
        mutateCart,
        favorites,
        mutateFavorite,
        error,
        isValidating

    }
}
