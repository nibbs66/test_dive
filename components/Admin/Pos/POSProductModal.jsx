import {useState, useEffect} from 'react';
import ModalCard from "../../Modal/ModalCard";

import Quantity from "../../Tools/Quantity";
import PosSelect from "./PosSelect";
import useSet from "../../../hooks/useSet";
import Loader from "../../icons/Loader";

const PosProductModal = ({
                             showModal, setShowModal, product, setItems, setQuantity,
                             quantity, setDataIndex, setTotal, total, inputRef, sku, setSku,
                             number, setNumber, subType, setSubType, barCodeColor,setBarCodeColor, setBarCodeSize, barCodeSize
}) => {
    const [inputs, setInputs] = useState([])
    const [selected, setSelected] = useState('')
    const [selected1, setSelected1] = useState('')
    const [modelId, setModelId] = useState('')
    const [hasColor, setHasColor] = useState(false)
    const [hasSize, setHasSize] = useState(false)
    const [color, getColor] =  useSet([product.productSubType, 'color'])
    const [size, getSize] = useSet([product.productSubType, 'size'])
            console.log(barCodeColor)
    useEffect(()=>{
        setHasColor(false)
        setHasSize(false)
        setNumber(0)
        setSku('')
        setSubType('')
        setSelected('')
        setSelected1('')
        product?.productSubType?.map((item)=>{

            if( item.color) {
                getColor()
                setHasColor(true)
                if(barCodeColor){
                    setSelected(barCodeColor)
                }
            }
            if(item.size){
                getSize()
                setHasSize(true)
                if(barCodeSize){
                    setSelected1(barCodeSize)
                }
            }

        })
    },[product])
    useEffect(()=>{

        setNumber(0)
        setSku('')
        setSubType('')

            product?.productSubType?.map((value)=>{
                console.log('=====>',barCodeColor===value.color)
              if((inputs.size ===value.size && inputs.color===value.color) || (barCodeColor === value.color && barCodeSize === value.size)) {
                    setNumber(value.stock)
                    setSku(value.barcode)
                    setSubType(value._id)
                    setModelId(value.modelId)

                }

        })
    },[inputs, setShowModal, barCodeColor, barCodeSize])
    console.log(sku)
    const handleProductQuantity = (locator, item, dec) => {

        if(dec==='inc'){
            setQuantity(quantity + 1)
        }
        if(dec==='dec'){
            setQuantity(Math.max(quantity - 1, 1))
        }
    }
    const handleChange = (e) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const addCartItem = (e) => {
        e.preventDefault()
        setItems((prev)=>[...prev,  {
            productId: product._id,
            subTypeId: subType,
            vendor: product.vendor,
            name: product.name,
            modelId: modelId,
            barcode: sku,
            img: product?.img[0],
            price: product.price,
            size: inputs.size || barCodeSize,
            color: inputs.color || barCodeColor,
            quantity: quantity,
        }])
        setTotal(total + (product.price * quantity))
        setDataIndex(1)
        setShowModal(false)
        setQuantity(1)
        setBarCodeColor('')
        setBarCodeSize('')
        setInputs([])
        inputRef.current.focus()
    }

    return (
        <ModalCard showModal={showModal} setShowModal={setShowModal}>
           <div className={`flex flex-col space-y-5 justify-center w-full p-4`}>
               <div className={`flex  divide-x-2 divide-slate-500`}>
                   <div className={`flex flex-col pr-6 text-center justify-center space-y-4`}>
                       <span className={`uppercase text-slate-500 text-lg`}>{product.manufacturer}</span>
                       <span className={`text-slate-400`}>{product.name}</span>
                     <div className={`space-x-4`}>
                         <span className={`text-slate-500`}>SKU:</span>
                         <span className={`text-slate-400`}>{sku === '' ? '55555' : sku}</span>
                     </div>
                   </div>
                   <div className={`flex items-start justify-center pl-6`}>
                       <div className={`grid w-48 gap-3`}>
                           <div className={`grid grid-cols-2 items-center`}>
                               <span className={`text-slate-500`}>Prijs:</span>
                               <span className={`text-slate-400`}>€{product?.price?.toFixed(2)}</span>
                           </div>
                           {hasColor && <div className={`grid grid-cols-2 items-center`}>
                               <span className={`text-slate-500`}>Kleur:</span>

                               {barCodeColor ? <span className={`text-${barCodeColor.toLowerCase()}-500 font-bold`}>{barCodeColor}</span>
                                   : <PosSelect data={color} dataValue={'color'} category={`color`}
                                              selected={selected} setInputs={setInputs} setSelected={setSelected}/>}


                           </div>}
                           {hasSize && <div className={`grid grid-cols-2 items-center`}>
                               <span className={`text-slate-500`}>Size:</span>
                               {barCodeSize ? <span className={`text-slate-400 font-bold`}>{barCodeSize}</span>
                                   : <PosSelect data={size} category={`size`}
                                              selected={selected1} setSelected={setSelected1} dataValue={`size`}
                                              setInputs={setInputs}/>}
                           </div>}
                            <div className={`flex justify-end mt-2`}>
                                <Quantity  showX={true}  quantity={quantity} locator={product._id}
                                          setQuantity={setQuantity} height={20} width={20} id={product._id} handleChange={handleChange} item={product} handleQuantity={handleProductQuantity}/>
                            </div>

                       </div>
                   </div>

               </div>
               <button onClick={addCartItem}
                   className={`px-6 py-4 bg-emerald-500 hover:bg-emerald-600 uppercase rounded text-white leading-none font-bold`}>
                   Add
               </button>
           </div>

        </ModalCard>
    );
};

export default PosProductModal;
