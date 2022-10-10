import {useMemo, useState, useEffect, useRef} from "react";

import Modal from '../Modal/Modal'
import axios from "axios";
import monkey from  '../../public/img/494.jpg'

import CategoryDisplay from "./CategoryDisplay";
import ModalCard from "../Modal/ModalCard";
import Paginate from "../Paginate/Paginate";
import Quantity from "../Quantity";
import CustomerSearch from "./CustomerSearch";
import FindUser from '../FindUser'
import PosLayout from "./PosLayout";
//import useUser from "../../pages/api/hooks/useUser";
import useEmployee from "../../pages/api/hooks/useEmployee";



const Pos = ({categories, products}) => {
    //const {cart,mutateCart, user} = useUser()
    const {user, error, isValidating} = useEmployee()
    const inputRef = useRef(null)
    const [customer, setCustomer] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState(categories)
    const [checkoutItem, setCheckoutItem] = useState([])
    const [active, setActive] = useState('catMenu')
    const [manufacturerList, setManufacturerList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [barcode, setBarcode] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [dataIndex, setDataIndex] = useState(1)
    const [product, setProduct] = useState({})
    const [first, setFirst] = useState(0)
    const[option, setOption] = useState({})
    console.log(user)
    useEffect(()=>{

        products?.map((manufacturer)=>{
            inputRef.current.focus()
           setManufacturerList((prev)=>[...prev, manufacturer.manufacturer])
        })


    },[products])
    useEffect(()=>{
        const list = new Set(manufacturerList)
        setSearchList([...new Set(manufacturerList)])
    },[manufacturerList])
    const handleQuantity = async(idx, item, dec) => {

        const {productId, price, quantity} = item
        let newQuant;
        const {id} = query
        if(dec==='inc'){
            newQuant = quantity + 1
        }
        if(dec==='dec'){
            newQuant = (Math.max(quantity - 1, 1))
        }
       // console.log(newQuant)
        const difference = newQuant - quantity
        try{
            const res = await axios.put(`/api/cart/${id}`,
                {
                    newQuant,
                    id,
                    productId,
                    addToTotal: (price * difference),
                });
           // console.log(res.data)
            mutateCart()
        }catch(err){
            console.log(err)
        }
        setFirst(newQuant)
    }




    const getData = async(data) => {
       // console.log(data)
        setActive(data)
        try{
            const res = await axios.get(`/api/${data}`);
            setSearch(res.data)
            setDataIndex(1)
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = async(bData) => {
        setBarcode(bData)
        const scannedCode = await products.filter((item)=>{
           item.barcode.filter((codes)=>{
              if(codes == bData){
                  setCheckoutItem((prev)=>[...prev,  {
                      id: item._id,
                      name: item.name,
                      img: item.img[0],
                      price: item.price,
                      size: item.size,
                      color: item.color,
                      quantity: 1,
                  }])
                  setBarcode('')
                  inputRef.current.focus()
              }
           })

        })

    }
    const handleOption = (e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })

    }
    const handleClick = async(data, idx, id) => {

        setSearch(null)

       if(idx !==3){
           try{
               const res = await axios.get(`/api/products?category=${data}`);

               setSearch(res.data)
               setDataIndex(idx)
           }catch(err){
               console.log(err)
           }
       }else{
           try{
               const res = await axios.get(`/api/products/${id}`);

               setSearch(categories)
               setCheckoutItem((prev)=>[...prev,  {
                   id: res.data._id,
                   name: res.data.name,
                   img: res.data?.img[0],
                   price: res.data.price,
                   size: res.data.size,
                   color: res.data.color,
                   quantity: 1,
               }])
               setDataIndex(1)

           }catch(err){
               console.log(err)
           }
       }
    }

    const getProduct = (data) =>{
       // console.log(data)
    }
console.log('barcode', checkoutItem)



  return (
    <div className="container mb-10 mx-auto px-5  ">
        <CustomerSearch showModal={showModal} setShowModal={setShowModal} />

       <div className="flex lg:flex-row flex-col-reverse shadow-lg">

            <div className="w-full lg:w-3/5 min-h-screen shadow-lg ">

                <div className="flex flex-col justify-start items-start px-5 ">
                    <span className='pl-2'>Barcode</span>
                    <div className="text-gray-800">
                        <input
                            ref={inputRef}
                            value={barcode}
                            onChange={(e) => handleChange(e.target.value)}
                            className={`border border-gray-400 text-sm px-2 py-1 rounded focus:outline-none`}
                            type="text"
                        />
                    </div>
                </div>

                <div className="mt-5 flex  justify-center text-sm">

            <span
                onClick={() => getData('catMenu')}
                className={`uppercase px-5 py-1 ${active === 'catMenu' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}
            >
              Winkel
            </span>
                    <span
                        className={`uppercase px-5 py-1 ${active === "rental" ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Te Huur
            </span>
                    <span
                        className={`uppercase px-5 py-1 ${active === 'service' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Service
            </span>
                    <span
                        className={`uppercase px-5 py-1 ${active === 'cursus' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Cursus
            </span>
                </div>
                  <div className=" flex justify-center text-gray-800 pt-2">
                    <select className='border border-gray-400  px-2 rounded-md focus:outline-0 focus:border-gray-700 text-sm px-8'>
                        <option value="1" disabled selected>Search by Manufacturer</option>
                        <option value=""></option>
                        {searchList.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))}


                    </select>
                </div>


                    {search === null ?
                        <div className='flex items-center  justify-center  mt-16 rounded-lg shadow-lg p-5 mx-10 bg-white'>
                            <span className='uppercase text-xl font-bold'>Loading...</span>
                        </div> :
                        <>
                            <PosLayout handleClick={handleClick} getProduct={getProduct} search={search}
                                       dataIndex={dataIndex} product={product}/>


                        </>
                    }


            </div>

            <div className="w-full lg:w-2/5 ">

                <div className="flex flex-row items-center justify-between px-5  uppercase">
                    <div className="font-bold text-xl">Order</div>
                    <div className="font-semibold ">
                        <span className="px-4 py-1 rounded-md bg-red-100 text-red-500 cursor-pointer">Clear All</span>

                    </div>
                </div>

                <div className="px-5 py-4 mt-5 overflow-y-auto h-64 ">
                    {checkoutItem.map((item, idx) => (
                        <div key={item._id} className={`flex flex-col mb-2 `}>
                            <div className="flex flex-row justify-between items-center mb-4 ">
                                <div className="flex flex-row items-center w-2/5">
                                    {item.img &&
                                        <img src={`/img/${item.img}`} className="w-10 h-10 object-cover rounded-md"
                                             alt=""/>}
                                    <span className={`ml-4 font-semibold text-sm text-slate-400`}>{item.name}</span>
                                </div>
                                <Quantity trash={true} showX={true} quantity={item.quantity} idx={idx}
                                          setQuantity={setQuantity} height={20} width={20} id={item._id} item={item} handleQuantity={handleQuantity}/>
                                <div className={`font-semibold text-sm w-16 text-center text-slate-500`}>
                                    €{item.price}
                                </div>
                            </div>
                            <div className={`flex justify-center gap-2 text-sm`}>
                                {item.size.length > 0 &&
                                    <div className={`flex gap-2 items-center`}>
                                        <label className={`pl-1 text-slate-400 text-sm`} htmlFor="">Size</label>
                                        <select type="select"
                                                onChange={(e)=>setOption({...option, [e.target.name]: e.target.value})}
                                                name={`size`}
                                                className='border border-gray-700 rounded focus:outline-none uppercase text-xs text-slate-500'>
                                            <option value=""></option>
                                            {item.size.map((size, idx) => (
                                                <option key={idx} value={size}>{size}</option>
                                            ))}
                                        </select>
                                    </div>
                                }
                                {item.color.length > 0 &&
                                    <div className={`flex gap-2 items-center`}>
                                        <label className={`pl-1 text-slate-400 text-sm`} htmlFor="">Color</label>
                                        <select type="select"
                                                onChange={(e)=>setOption({...option, [e.target.name]: e.target.value})}
                                                name={`color`}
                                                className='border border-gray-700 rounded focus:outline-none text-xs text-slate-500 uppercase'>
                                            <option value=""></option>
                                            {item.color.map((color, idx) => (
                                                <option key={idx} value={color}>{color}</option>
                                            ))}
                                        </select>
                                    </div>
                                }
                            </div>
                            <div className={`w-full border-b-2 border-slate-300  py-2`}></div>
                        </div>
                    ))}


                </div>

                <div className="px-5 mt-5 ">
                    <div className="py-4 rounded-md shadow-lg ">
                        <div className=" px-4 flex justify-between ">
                            <span className="font-semibold text-sm">Subtotal</span>
                            <span className="font-bold">$35.25</span>
                        </div>
                        <div className=" px-4 flex justify-between ">
                            <span className="font-semibold text-sm">Discount</span>
                            <span className="font-bold">- $5.00</span>
                        </div>
                        <div className=" px-4 flex justify-between ">
                            <span className="font-semibold text-sm">Sales Tax</span>
                            <span className="font-bold">$2.25</span>
                        </div>
                        <div className="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                            <span className="font-semibold text-2xl">Total</span>
                            <span className="font-bold text-2xl">$37.50</span>
                        </div>
                    </div>
                </div>


                <div className="px-5 mt-5">
                    <div
                        className=" uppercase px-4 py-4 rounded-md shadow-lg text-center bg-[#5eaf81] text-white font-bold cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        Check Out
                    </div>
                </div>

            </div>

        </div>
    </div>

  );
};

export default Pos;
