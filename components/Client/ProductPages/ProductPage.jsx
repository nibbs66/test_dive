import {useState, useEffect} from 'react';
import useUser from "../../../pages/api/hooks/useUser";
import OrderSummary from "../../OrderSummary";
import ProductImg from "../../ProductImg";
import ClientHeader from "../../ClientHeader";
import Heart from "../../icons/Heart";
import {useRouter} from "next/router";
import Image from "next/image";
import {useSession} from "next-auth/react";
import axios from "axios";
import Select from '../../Select'
import { HeartIcon} from '@heroicons/react/24/outline'
import SingleSelect from "../../SingleSelect";
const ProductPage = ({product}) => {
    const {data: session, status} = useSession()
    const router = useRouter()
    const {components} = router
    const [disabled, setDisabled] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showOrder, setShowOrder] = useState(false)
    const [selector, setSelector] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [inputs, setInputs] = useState({})

    const [index, setIndex] = useState(0)
    const {cartId, cart, mutate, favorites, mutateCart, mutateFavorite} = useUser()



    useEffect(()=>{

        if(status === 'authenticated'){
            setDisabled(false)
        }
    },[status])

    const handleClick= async(status) => {
        mutateCart()
        try{
            if(status === 'unauthenticated'){
                if(!cart){
                    const  res = await axios.post(`/api/cart`,
                        {
                            userId: cartId,
                            items: {
                                productId: product._id,
                                color: inputs.color,
                                size: inputs.size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            purchaseType: 'Web-Shop',
                            isRegistered: false,
                            total: product.price * quantity
                        })
                    mutateCart(false)
                }else if(cart.items.length > 0){
                    const  res = await axios.put(`/api/cart?cart=${cart?.userId}`,
                        {
                            items: {
                                productId: product._id,
                                color: inputs.color,
                                size: inputs.size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            addToTotal: product.price * quantity,
                            isRegistered: false

                        });
                    mutateCart()

                }
            }else if(status === 'authenticated') {
                if (!cart) {
                    const res = await axios.post(`/api/cart`,
                        {
                            userId: session.id,
                            items: {
                                productId: product._id,
                                color: inputs.color,
                                size: inputs.size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            total: product.price * quantity,
                            purchaseType: 'Web-Shop',
                            isRegistered: true
                        });
                    mutateCart()
                } else if (cart.items.length > 0) {
                    const res = await axios.put(`/api/cart?cart=${session.id}`,

                        {
                            items: {
                                productId: product._id,
                                color: inputs.color,
                                size: inputs.size,
                                quantity,
                                name: product.name,
                                img: product.img[0],
                                price: product.price,
                                modelId: product.modelId
                            },
                            addToTotal: product.price * quantity,
                        });
                    mutateCart()
                }
            }

        }catch(err){
            console.log(err)
        }
        if(showOrder){
            setShowOrder(false)
        }

        setShowOrder(true)
    }
    const handleChange = (e) => {

     setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    }
    const handlePhoto = (idx) => {
        setIndex(idx)
    };
    //Math.max(index - 1, 0)
    const handleFavorite = async(action) => {

        if(action==='save'){
            if ( !favorites) {
                try {
                    const res = await axios.post(`/api/favorite`,
                        {
                            userId: session.id,
                            items: product
                        })
                    mutateFavorite()
                } catch (err) {
                    console.log(err)
                }
            } else if ( favorites.items.length > 0) {
                const dupSearch = await favorites.items.filter((favorite) => favorite._id === product._id)

                if (dupSearch.length === 0) {
                    try {
                        const res = await axios.put(`/api/favorite/${favorites._id}`,
                            {save: product},
                        )
                        mutateFavorite()
                    } catch (err) {
                        console.log(err)
                    }
                }
            }
        }
        if(action==='clear'){
            if (favorites?.items?.length === 1){
                try{
                    const res = await axios.delete(`/api/favorite/${favorites._id}`)
                    mutateFavorite()
                }catch (err) {
                    console.log(err)
                }
            }else{
                try{
                    const res = await axios.put(`/api/favorite/${favorites._id}`,
                        {remove: product._id},
                    )
                    mutateFavorite()
                }catch (err) {
                    console.log(err)
                }
            }
        }
    }

    return (
        <div  className="container flex flex-col  w-screen min-h-fit gap-10 ">
            <OrderSummary  product={product} showModal={showOrder} setShowModal={setShowOrder} img={product.img[index]}  size={inputs.size} color={inputs.color} quantity={quantity}/>
            <ProductImg index={index} setIndex={setIndex} product={product} selector={product.img} showModal={showModal} setShowModal={setShowModal}/>


            <ClientHeader title={product.manufacturer} lastPage={`shop/category/Regulators`}/>
            <div className="flex flex-col sm:flex-row sm:pl-10 pb-10 items-center">
                <div  className="flex items-center w-1/2 flex-col gap-10 py-5 sm:py-0">
                    <Image  src={`${product.img[index]}`} alt="" height={350} width={350}
                            objectFit="contain" onClick={(e)=>setShowModal(true)}
                            className=" h-3/4 w-3/4 object-contain rounded-md cursor-pointer"  />



                    <div className="flex  gap-2">
                        {product.img.length > 1 && product.img.map((picture, idx)=>(
                            <Image  key={idx} value={idx} src={`${picture}`} alt="" height={100} width={100} objectFit="contain" className='cursor-pointer'
                                    onClick={()=>handlePhoto(idx)}/>
                        ))}


                    </div>
                </div>
                <div className="flex flex-col gap-5 w-1/2">

                    <div className='flex flex-col gap-2 text-slate-600'>
                        {/*<span className="text-3xl font-thin uppercase">{product.manufacturer}</span>*/}
                        <span className=" text-2xl sm:text-3xl sm:font-thin text-slate-400
                                             uppercase text-center sm:text-start"
                        >
                               {product.name}
                           </span>
                    </div>
                    <div className="flex gap-2 justify-center sm:justify-start text-slate-500">
                        <span className={`font-semibold`}>Model Id:</span>
                        <span>{product.modelId}</span>
                    </div>


                    <p className='text-sm text-center sm:text-start  text-slate-500'>{product.desc}</p>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between ">
                        {product.color.length >0 &&
                            <div className='flex flex-col w-1/3'>

                                <label className='pl-1 text-slate-400' htmlFor="">Color</label>
                                <select type="select"
                                        onChange={handleChange}
                                        name={`color`}
                                        className='border border-slate-400  rounded focus:border-slate-400  focus:ring-0 focus:outline-none text-sm text-slate-500  hover:bg-slate-100'>
                                    <option value=""></option>
                                    {product.color.map((color, idx) => (
                                        <option key={idx} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>}
                        {product.size.length > 0 &&
                            <div className='flex flex-col w-1/3'>

                                <label className='pl-1 text-slate-400' htmlFor="">Size</label>

                                <select  type="select"
                                         onChange={handleChange}
                                         name={`size`}
                                         className='border border-slate-400  rounded focus:border-slate-400  focus:ring-0 focus:outline-none text-sm text-slate-500  hover:bg-slate-100'>
                                    <option value=""></option>
                                    {product.size.map((size, idx) => (
                                        <option  key={idx} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>}
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row gap-2 items-center sm:justify-between">
                        <div className="w-32 flex justify-center sm:gap-5 gap-2 " >

                            { quantity === 1 ? <span className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-red-500 text-white text-xs sm:text-base cursor-pointer uppercase">
                    X
            </span> :
                                <span onClick={()=>setQuantity(Math.max(quantity - 1, 1))} className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-gray-300 cursor-pointer">-</span>
                            }

                            <span className="font-semibold border-2 sm:px-3 px-1.5 py-0.5 sm:py-1 sm:text-sm text-xs rounded-md">{quantity}</span>
                            <span onClick={()=>setQuantity(quantity + 1)} className="sm:px-3 px-1.5 py-0.5 sm:py-1 text-sm rounded-md bg-gray-300 cursor-pointer">+</span>
                        </div>

                        <span className='text-xl text-slate-500 font-semibold'>€{product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-5 mt-5">
                        <button onClick={()=>handleClick(status)}
                                className={`bg-blue-500 text-white sm:w-1/2 w-2/3 py-2 rounded uppercase font-bold`}>add to cart</button>
                        {favorites ?
                        (favorites.items?.filter((favorite) => favorite._id === product._id).length === 0 ?
                            <button
                                onClick={()=>handleFavorite('save')}
                                className={` disabled:cursor-not-allowed disabled:opacity-30 bg-white text-red-600
                                                            border-2 border-red-600
                                                            flex items-center justify-center gap-1 sm:w-1/2 w-2/3 rounded  py-1 rounded uppercase font-bold`}
                                disabled={disabled}
                            >
                                <HeartIcon className={`h-6 w-6 text-red`}/>
                                Save
                            </button> : <button  disabled={disabled}
                                                 onClick={()=>handleFavorite('clear')}
                                                 className={`disabled:hidden bg-red-600 text-white sm:w-1/2 w-2/3 py-2 flex items-center justify-center gap-1 rounded uppercase font-bold`}>
                                <HeartIcon className={`h-6 w-6 text-white`}/>
                                Saved
                            </button>) :
                            <button
                                onClick={()=>handleFavorite('save')}
                                className={` disabled:cursor-not-allowed disabled:opacity-30 bg-white text-red-600
                                                            border-2 border-red-600
                                                            flex items-center justify-center gap-1 sm:w-1/2 w-2/3 rounded  py-1 rounded uppercase font-bold`}
                                disabled={disabled}
                            >
                                <HeartIcon className={`h-6 w-6 text-red`}/>
                                Save
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
