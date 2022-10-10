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

     <div>Hello</div>
    </div>

  );
};

export default Pos;
