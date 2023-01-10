import {useMemo, useState, useEffect, useRef} from "react";


import axios from "axios";
import {useRouter} from "next/router";
import CustomerSearch from "./CustomerSearch";
import dayjs from "dayjs-with-plugins";
import PosLayout from "./PosLayout";

import useEmployee from "../../../pages/api/hooks/useEmployee";
import NoPic from "../../icons/NoPic";
import PosProductModal from "./POSProductModal";
import {CurrencyEuroIcon} from '@heroicons/react/24/outline'
import Trash from "../../Tools/Trash";

import PosRadio from "./PosRadio";


const Pos = ({categories, products}) => {

    const router = useRouter()
    const {user, error, isValidating} = useEmployee()
    const inputRef = useRef(null)
    const [index, setIndex] = useState(0)
    const [customer, setCustomer] = useState({})
    const [showPosModal, setShowPosModal] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [search, setSearch] = useState([])
    const [items, setItems] = useState([])
    const [posProductItem, setPosProductItem] = useState([])
    const [active, setActive] = useState('catMenu')
    const [manufacturerList, setManufacturerList] = useState([])
    const [searchList, setSearchList] = useState([])
    const [barcode, setBarcode] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [dataIndex, setDataIndex] = useState(1)
    const [product, setProduct] = useState({})
    const [total, setTotal] = useState(0)
    const[success, setSuccess] = useState(0)
    const [disabled, setDisabled] = useState(true)
    const [purchaseOption, setPurchaseOption] = useState('takeAway')
    const [barCodeColor, setBarCodeColor] = useState('')
    const [barCodeSize, setBarCodeSize] = useState('')
    const [amountPaid, setAmountPaid] = useState(null)
    const [number, setNumber] = useState(0)
    const [sku, setSku] = useState('')
    const [subType, setSubType] = useState('')
    const {user: medewerker} = useEmployee()



    useEffect(()=>{
        setSearch([])
        setSearch(categories)
        products?.map((manufacturer)=>{

            setManufacturerList((prev)=>[...prev, manufacturer.manufacturer])
            inputRef.current?.focus()
        },[products, categories])


    },[products])

    useEffect(()=>{
        if(customer.name === undefined && !showModal){
            setIndex(0)
        }

    },[customer, showModal])




    const getData = async(data) => {

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
        products.map((value)=>{
            value.productSubType.map((item)=>{
                if(item.barcode === bData){
                    setBarCodeColor(item.color)
                    setBarCodeSize(item.size)
                    setPosProductItem(value)
                    setBarcode('')
                    inputRef.current.focus()
                    setShowPosModal(true)
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
                setItems((prev)=>[...prev,  {
                    id: res.data._id,
                    modelId: res.data.modelId,
                    //manufacturer: res.data.manufacturer,
                    name: res.data.name,
                    img: res.data?.img[0],
                    price: res.data.price,
                    size: res.data.size,
                    color: res.data.color,
                    quantity: 1,
                }])
                setDataIndex(1)
                setShowPosModal(true)

            }catch(err){
                console.log(err)
            }
        }
    }


    const getProduct = async(data) =>{

        try{
            const res = await axios.get(`/api/products/${data}`);

            setSearch(categories)
            setPosProductItem(res.data)

            setDataIndex(1)
            setShowPosModal(true)

        }catch(err){
            console.log(err)
        }
        setShowPosModal(true)
    }
    const submitOrder = async() => {

        try{
            if(total-amountPaid === 0 && purchaseOption ==='takeAway'){

                const res = await axios.post(`/api/sales`,
                    {
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        userId: customer.id,
                        items,
                        purchaseType: 'Winkel',
                        orderDate: dayjs(),
                        purchaseOption: purchaseOption,
                        total: total,
                        amountPaid: amountPaid
                    })
                console.log(res.data)
                if(res.status === 201){
                    items.map(async(product)=>{
                        const inv = await axios.put(`/api/products/${product.productId}`, {inventory: true, update: product.subTypeId, quantity: product.quantity})


                    })

                    res.status === 201 && router.push(`/admin/invoice/order/${res.data._id}/${medewerker._id}`)
                }
                //res.status === 201 && router.push(`/admin/checkout/${res.data._id}`)
                //res.status === 201 && await router.push(`/admin/invoice/sale/${res.data._id}/${medewerker._id}`)
                //router.push(`/admin/invoice/${res.data._id}`)
                //${res.data._id}
            }else{

                const res = await axios.post(`/api/orders`,
                    {
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        userId: customer.id,
                        items,
                        purchaseType: 'Winkel',
                        purchaseOption: purchaseOption,
                        shippingMethod: {method: 'Winkel', price: 0.00},
                        total: total,
                        amountPaid: amountPaid
                    })

                const{status} = res
                if(status === 201){
                    items.map(async(product)=>{
                        const inv = await axios.put(`/api/products/${product.productId}`, {inventory: true, update: product.subTypeId, quantity: product.quantity})


                    })

                    status === 201 && router.push(`/admin/invoice/order/${res.data._id}/${medewerker._id}`)
                }
            }

        }catch(err){
            console.log(err)
        }

    }



    return (
        <div className="container mb-10 mx-auto px-5  ">

            <CustomerSearch showModal={showModal} index={index} setIndex={setIndex} inputRef={inputRef}
                            setShowModal={setShowModal} customer={customer} setCustomer={setCustomer}/>
            <PosProductModal
                showModal={showPosModal} setShowModal={setShowPosModal} product={posProductItem} setBarCodeColor={setBarCodeColor}
                quantity={quantity} setQuantity={setQuantity} inputRef={inputRef} sku={sku} setSku={setSku} setBarCodeSize={setBarCodeSize}
                subType={subType} setSubType={setSubType} number={number} setNumber={setNumber} barCodeColor={barCodeColor} barCodeSize={barCodeSize}
                setDataIndex={setDataIndex} setItems={setItems} setTotal={setTotal} total={total}
            />

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
                            onClick={() => getData('cursusDescription')}
                            className={`uppercase px-5 py-1 ${active === 'cursusDescription' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Cursus
            </span>
                    </div>
                    <div className=" flex justify-evenly text-slate-500 pt-4">

                        <PosRadio id={`takeAway`} label={`Take Away`} index={purchaseOption} onChange={() => {
                            setPurchaseOption(`takeAway`)

                        }}/>

                        <PosRadio id={`order`} label={`Order`} index={purchaseOption} onChange={() => {
                            setPurchaseOption(`order`)

                        }}/>
                        {/*<select
                          className='border border-gray-400  px-2 rounded-md focus:outline-0 focus:border-gray-700 text-sm px-8'>
                          <option value="1" disabled defaultValue={`Search by Manufacturer`}>Search by Manufacturer
                          </option>
                          <option value=""></option>
                          {searchList.map((item, idx) => (
                              <option key={idx} value={item}>{item}</option>
                          ))}


                      </select>*/}
                    </div>


                    {search === null ?
                        <div className='flex items-center  justify-center  mt-16 rounded-lg shadow-lg p-5 mx-10 bg-white'>
                            <span className='uppercase text-xl font-bold'>Loading...</span>
                        </div> :
                        <>
                            <PosLayout setShowPosModal={setShowPosModal} handleClick={handleClick} getProduct={getProduct}
                                       search={search}
                                       dataIndex={dataIndex} product={product} active={active}/>


                        </>
                    }


                </div>

                <div className="w-full lg:w-2/5 ">

                    <div className="flex flex-row items-center justify-center space-x-5 px-5 ">
                        <div className="font-bold text-lg text-slate-500 uppercase">
                            {customer.name === undefined ? 'Please Select' : 'Customer'}:
                        </div>
                        <div
                            className={`${customer.name === undefined ? 'flex' : 'hidden'}  text-sm  space-x-2`}
                        >
                            <PosRadio id={1} label={`Guest`} index={index} onChange={() => {
                                setIndex(1)
                                setShowModal(true)
                            }}/>
                            <PosRadio id={2} label={`Customer`} index={index} onChange={() => {
                                setIndex(2)
                                setShowModal(true)
                            }}/>
                        </div>
                        <div className="font-semibold ">
                            <button
                                disabled={customer.name !== undefined}
                                onClick={() => setShowModal(true)}
                                className={`hidden disabled:flex uppercase px-4 py-1 rounded-md bg-blue-400 disabled:bg-blue-500 text-white text-sm cursor-pointer`}>{customer.name || `Guest`} </button>

                        </div>
                    </div>

                    <div className=" px-5 py-4 mt-5 overflow-y-auto h-72 w-full">
                        {items.map((item, idx) => (
                            <div key={item._id} className={` flex flex-col  divide-y-2 divide-slate-200 text-slate-500`}>
                                <div className={`flex justify-center pb-2 text-slate-500 gap-2`}>
                                    <span>{item.manufacturer}</span>
                                    <span>{item.name}</span>
                                </div>
                                <div className={`flex items-center p-2 justify-between text-xs`}>
                                    {item.img ?
                                        <img src={`${item.img}`}
                                             className="flex items-start w-10 h-10 object-contain rounded-md"
                                             alt=""/> :
                                        <NoPic height={`h-10`} width={`h-10`}/>}
                                    <div className={`flex flex-col`}>
                                        <div className={`space-x-1`}>
                                            <span>Prijs:</span>
                                            <span>€{item.price.toFixed(2)}</span>
                                        </div>
                                        <div className={`space-x-1`}>
                                            <span>Quantity:</span>
                                            <span>{item.quantity}</span>
                                        </div>
                                        {item?.color && <div className={`space-x-1`}>
                                            <span>Color:</span>
                                            <span>{item.color}</span>
                                        </div>}
                                        {item?.size && <div className={`space-x-1`}>
                                            <span>Size:</span>
                                            <span>{item.size}</span>
                                        </div>}

                                    </div>
                                    <span
                                        className=" flex items-center justify-center h-6 w-6 text-sm rounded-md bg-red-500 text-white  cursor-pointer">
                                     <Trash height={`h-5`} width={`w-5`} id={item._id} item={item} items={items}
                                            setItems={setItems} idx={idx} setTotal={setTotal} total={total}
                                     />
                                </span>

                                </div>
                            </div>
                        ))}


                    </div>

                    <div className="px-5 mt-5 text-slate-500">
                        <div className="py-4 rounded-md shadow-lg ">
                            <div className=" px-4 flex justify-between ">
                                <span className="font-semibold text-sm">Subtotal</span>
                                <span className="font-bold">€{((total) / 1.21).toFixed(2) || 0.00}</span>
                            </div>
                            <div className=" px-4 flex justify-between ">
                                <span className="font-semibold text-sm">Discount</span>
                                <span className="font-bold">€0.00</span>
                            </div>
                            <div className=" px-4 flex justify-between ">
                                <span className="font-semibold text-sm">Sales Tax</span>
                                <span className="font-bold">${(total - ((total) / 1.21)).toFixed(2) || 0.00}</span>
                            </div>
                            <div className="border-t-2 border-slate-200 mt-3 py-2 px-4 flex items-center justify-between">
                                <span className="font-semibold text-xl">Total</span>
                                <span className="font-bold text-2xl">€{total.toFixed(2)}</span>
                            </div>

                            <div className="border-t-2 mt-3 py-2 px-4 flex items-center space-x-4 justify-between">
                                <span className="font-semibold text-xl">Payment</span>
                                <div>

                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm"><CurrencyEuroIcon
                                            className={`pointer-events-none w-5 h-5`}/></span>
                                        </div>
                                        <input
                                            onChange={(e) => setAmountPaid(e.target.value)} placeholder={total.toFixed(2)}
                                            type="currency"
                                            name="price"
                                            id="price"
                                            className="block w-full py-2  pl-10 pr-12 border border-slate-300 rounded-md sm:text-sm placeholder:text-slate-300"

                                            aria-describedby="price-currency"
                                        />
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            EUR
          </span>
                                        </div>
                                    </div>
                                </div>
                                {/*<label htmlFor="amountPaid"
                                    className="relative text-slate-400 focus-within:text-gray-600 block">

                                <CurrencyEuroIcon
                                    className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-1"/>

                                <input onBlur={(e) => setAmountPaid(e.target.value)} placeholder={total.toFixed(2)}
                                       type={`currency`} name={`amountPaid`}
                                       className={`flex text-end form-input border border-slate-300 rounded-md  w-full pl-12 placeholder:text-slate-300`}/>
                            </label>*/}
                            </div>
                            {/*<div className="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                            <span className="font-semibold text-xl">Balance</span>
                            <span className="font-bold text-2xl">€{(total - (amountPaid || total)).toFixed(2)}</span>
                        </div>*/}
                        </div>
                    </div>


                    <div className={`flex flex-col gap-2 justify-center px-5 mt-5`}>
                        <button
                            disabled={purchaseOption === '' ? disabled : customer.name === undefined ? disabled : amountPaid === null ? disabled : !disabled}
                            className={`flex w-full justify-center uppercase px-4 py-4 rounded-md shadow-lg text-center bg-blue-400 hover:bg-indigo-700  
                            text-white font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-400`}
                            onClick={submitOrder}
                        >
                            Factuur
                        </button>

                    </div>

                </div>

            </div>
        </div>

    );
};

export default Pos;
