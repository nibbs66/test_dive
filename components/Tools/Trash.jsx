import React from 'react';
import useUser from "../../pages/api/hooks/useUser";
import axios from "axios";
import TrashCan from "../icons/TrashCan";
import {TrashIcon} from '@heroicons/react/24/outline'
const Trash = ({id, height, width, item, idx, shoppingCart, items, setItems, total, setTotal}) => {
    const {cart,mutateCart,isValidating} = useUser()
    const handleRemoveItem =  async(item, idx) => {
       if(shoppingCart){
           try{
               if(cart.items.length === 1){
                   const res = await axios.delete(`/api/cart/delete/${id}`)
                   //setSelected('')
                   console.log(res.data)
                   mutateCart()
               }else{
                   const res = await axios.put(`/api/cart/delete/${id}`,
                       item
                   );
                   console.log(res.data)
                   mutateCart()
               }



           }catch(err){
               console.log(err)
           }
       }else{
           const newItems = items
           console.log(items)
         setItems(newItems.filter((product, idx)=>newItems[idx] !== item))
           setTotal(total - (item.price * item.quantity))

       }

    }
    console.log(item)
    return (
        <div onClick={()=>handleRemoveItem(item, idx)}>
            <TrashIcon className={`${height} ${width}`}/>
        </div>
    );
};

export default Trash;
