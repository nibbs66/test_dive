import React from 'react';
import useUser from "../pages/api/hooks/useUser";
import axios from "axios";
import TrashCan from "./icons/TrashCan";
import {TrashIcon} from '@heroicons/react/24/outline'
const Trash = ({id, height, width, item, idx, setSelected}) => {
    const {cart,mutateCart,isValidating} = useUser()
    const handleRemoveItem =  async(item, idx) => {

        try{
            if(cart.items.length === 1){
                const res = await axios.delete(`/api/cart/delete/${id}`)
                setSelected('')
            }else{
                const res = await axios.put(`/api/cart/delete/${id}`,
                    item
                );
            }
            mutateCart()
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div onClick={()=>handleRemoveItem(item, idx)}>
            <TrashIcon className={`${height} ${width}`}/>
        </div>
    );
};

export default Trash;
