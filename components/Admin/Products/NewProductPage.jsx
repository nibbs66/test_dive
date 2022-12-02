import {useState, useEffect} from 'react'
import ProductPageDisplay from "./ProductPageDisplay";
import AccordionLayout from "../../Accordion/AccordionLayout";

import Image from "next/image";

import MultiSelect from '../../Tools/MultiSelect'
import {DocumentCheckIcon, DocumentChartBarIcon, PlusCircleIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import axios from "axios";
import Loader from '../../icons/Loader'
import toast, {Toaster} from 'react-hot-toast'
import SingleSelect from "../../Tools/SingleSelect";
import ComboboxDisplay from "../../ComboboxDisplay";
import useUploadImg from "../../../hooks/useUploadImg";
import useProduct from "../../../pages/api/hooks/useProduct";
import SubTypes from './SubTypes'
import ErrorAlert from "../../Alerts/ErrorAlert";
import SuccessAlert from "../../Alerts/SuccessAlert";
import Popover from "../../Tools/Popover";
import SingleSelectWithSearch from "../../Tools/SingleSelectWithSearch";


const NewProductPage = () => {
    const {colorData, mutateColor, sizeData, mutateSize, vendors,  categoryData} = useProduct()
    const [inputs, setInputs] = useState({})
    const [sub, setSub] = useState({})
    const [activeIndex, setActiveIndex] = useState(1)
    const [productSubType, setProductSubType] = useState([])
    const [barCode, setBarCode] = useState([])
    const[showMessage, setShowMessage] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [selectColor, setSelectColor] = useState('')
    const [selectVendor, setSelectVendor] = useState('')
    const [selectNew, setSelectNew] = useState('')
    const [selectGender, setSelectGender] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [selectSize, setSelectSize] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [colors, setColors] = useState(false)
    const [sizes, setSizes] = useState(false)
    const [file, setFile] = useState(null)
    const [img, setImg] = useState([])
    const [upload, setUpload] = useState(false)
    const [messageColor, setMessageColor] = useState('green')
    const [messageData, setMessageData] =useState({})
    const [message, setMessage] = useState('Upload Yeah')
    const [inputNumber, setInputNumber] = useState(1)
    const newProduct =[{new: 'Nee'}, {new: 'Ja'}]
    const [addColorItem, setAddColorItem] = useState(false)
    const [addSizeItem, setAddSizeItem] = useState(false)
    const productGender =[{gender: 'Male'}, {gender: 'Female'}, {gender: 'Unisex'}]

    /*  <div className={`relative flex w-1/2`}>
                                     <MultiSelect colors={productColors}/>
                                 </div>*/
    const handleNewPic = (e) => {
        e.preventDefault()
        if(uploadedImage.length >= 3) {
            toast.error('Maximum number of product images has been reached')
            setFile(null)
        }else{
            setFile(e.target.files[0])
        }
    }
    const {uploadedImage, setUploadedImage, success} = useUploadImg(file, setFile)
    if(success){
        toast.success('Picture Added!!')
    }

    const handleNewItems = async() => {
        setShowMessage(false)
        try{
            if(messageData.type === 'color'){
                const newColor = messageData.name.charAt(0).toUpperCase() + messageData.name.slice(1)
                setSub(prev=>{
                    return {...prev, [messageData.type]: newColor}
                })
                const res = await axios.post(`/api/${messageData.type}`, {'color': newColor})
                res.status === 201 && mutateColor()
                console.log(res.data)
            }else if(messageData.type === 'size'){
                const newSize = messageData.name.toUpperCase()
                setSub(prev=>{
                    return {...prev, [messageData.type]: newSize}
                })
                const res = await axios.post(`/api/${messageData.type}`, {'size': newSize})
                console.log(res.data)
                res.status === 201 && mutateSize()
            }

        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {

        if (e.target.name === 'cost') {
            e.preventDefault()
        }
        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };
    const handleSubType = (e) => {
        e.preventDefault()
        setSub(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const addSub = (e) => {
        e.preventDefault()

        console.log(sub.modelId)
        if(inputs.vendor!==undefined){
            if(sub.modelId!==undefined){
                setProductSubType(prev=>[...prev, sub])
                disabled && setDisabled(false)
                setSub({})
            }

        }

    };
    console.log(sub)
    const handleSubmit = async() => {
        console.log('inputs', inputs)
        try{
            const res = await axios.post(`/api/products`,
                { ...inputs, img: uploadedImage, productSubType}
            );
            res.status === 201 && toast.success('New Product Created!!')
            setInputs({})
            setUploadedImage([])
            setDisabled(true)
        }catch(err){
            console.log(err)
        }
    }

    console.log('selected', sub)
    return (
        <div>
            <ErrorAlert showMessage={showMessage} setShowMessage={setShowMessage} color={messageColor} handleNewItems={handleNewItems} messageData={messageData}   message={message}/>
            <div action="" >
                <ProductPageDisplay product={inputs} handleSubmit={handleSubmit} submitButton={true} disabled={disabled} message={`Add Product Subtype before submitting!!`}>


                    <div className={`flex flex-col gap-5 mt-10 `}>
                        <AccordionLayout
                            title={`Add Product`}
                            bg={`${activeIndex === 1 ? 'bg-slate-500' : 'bg-slate-400'}`}
                            text={'text-white'}
                            mx={'mx-16'}
                            bodyMargin={'mx-10'}
                            index={1}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        >
                            <div className={`flex flex-col w-full`} action="components/Admin/Products/NewTProductPage">
                                <div className="flex items-center  justify-center w-full  gap-10">
                                    <div>
                                        <Image
                                            className={`object-cover rounded-full items-center`}
                                            src={file !== null
                                                ? URL.createObjectURL(file)

                                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                                            alt={''}
                                            width={100} height={100} objectFit='cover'
                                        />
                                    </div>
                                    {!upload && <div className={`flex items-center justify-center cursor-pointer `}>

                                        <input
                                            className={`file:bg-[#3b81f6] file:text-white file:mr-4 file:py-2 text-sm text-slate-400
                                    file:uppercase file:text-sm file:px-4 file:rounded-full file:border-0
                                    file:cursor-pointer
                                    `}
                                            type="file"
                                            id="file"
                                            onChange={handleNewPic}

                                        />
                                    </div>}


                                </div>
                                <div className={`grid grid-cols-2 w-full my-4 mx-10 `}>


                                    <div className={`flex flex-col gap-2 text-sm`}>
                                        <div className={`flex flex-col gap-1 text-sm`}>
                                            <label
                                                className={`pt-1 uppercase text-slate-400 font-bold`}>Manufacturer</label>

                                            <div className={`w-1/2`}>
                                                <SingleSelect data={vendors} dataValue={'vendor'}
                                                              category={`vendor`} selected={selectVendor}
                                                              setInputs={setInputs} setSelected={setSelectVendor}
                                                              handleChange={handleChange}/>
                                            </div>

                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>Product
                                                Name</label>
                                            <input
                                                className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                                onChange={handleChange} name={`name`}
                                                type="text"/>
                                        </div>

                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>cost</label>
                                            <input
                                                className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}

                                                onChange={handleChange} name={`cost`}
                                                type="text"/>


                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>price</label>
                                            <input
                                                className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                                onChange={handleChange} name={`price`}
                                                type="text"/>


                                        </div>


                                    </div>
                                    <div className={`flex flex-col gap-2 text-sm`}>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>New</label>
                                            <div className={`w-1/2`}>
                                                <SingleSelect data={newProduct} dataValue={'new'} category={`new`}
                                                              selected={selectNew} setInputs={setInputs}
                                                              setSelected={setSelectNew} handleChange={handleChange}/>
                                            </div>

                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>Gender</label>
                                            <div className={`w-1/2`}>
                                                <SingleSelect data={productGender} dataValue={'gender'}
                                                              category={`gender`} selected={selectGender}
                                                              setInputs={setInputs} setSelected={setSelectGender}
                                                              handleChange={handleChange}/>
                                            </div>

                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>
                                            <div className={`w-1/2`}>
                                                <SingleSelect data={categoryData} dataValue={'name'}
                                                              category={`category`} selected={selectCategory}
                                                              setInputs={setInputs} setSelected={setSelectCategory}
                                                              handleChange={handleChange}/>
                                            </div>
                                        </div>


                                        <div className={`flex flex-col gap-1`}>
                                            <label
                                                className={`pt-1 uppercase text-slate-400 font-bold`}>Description</label>
                                            <textarea
                                                name={`desc`} onChange={handleChange}
                                                className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 `}
                                                type="text"/>


                                        </div>
                                    </div>

                                </div>

                            </div>
                        </AccordionLayout>
                        <AccordionLayout
                            title={`Add Product Types`}
                            bg={`${activeIndex === 2 ? 'bg-slate-500' : 'bg-slate-400'}`}
                            text={'text-white'}
                            mx={'mx-16'}
                            bodyMargin={'mx-10'}
                            index={2}
                            activeIndex={activeIndex}
                            setActiveIndex={setActiveIndex}
                        >
                            <SubTypes onChange={() => setColors(!colors)} onChange1={() => setSizes(!sizes)}
                                      onClick={() => setActiveIndex(1)} inputNumber={inputNumber} setInputNumber={setInputNumber} showButton={true} headerOptions={true}
                                      callbackfn={(el, idx) => (
                                          <div className={`flex items-center justify-center space-x-2 text-sm w-full`}
                                               key={idx}>
                                              <div className={`flex flex-col gap-1`}>
                                                  <label className={`pt-1 uppercase text-slate-400 font-bold`}>Model
                                                      Id</label>
                                                  <input
                                                      className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `}
                                                      onChange={handleSubType} name={`modelId`}
                                                      type="text"/>
                                              </div>
                                              <div className={`flex flex-col gap-1`}>
                                                  <label
                                                      className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                                  <div className={`flex items-center gap-2`}>
                                                      <input
                                                          className={`border border-slate-400  focus:outline-0 rounded text-sm p-1 `}
                                                          name={`barcode`}

                                                          onChange={handleSubType}
                                                          type="text"/>

                                                  </div>
                                              </div>
                                              {colors && <div className={`flex flex-col  `}>
                                                  <label
                                                      className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                                  <div className={`w-44`}>
                                                      <SingleSelectWithSearch  data={colorData} dataValue={'color'}
                                                                               category={`color`} selected={selectColor} addItem={addColorItem} setAddItem={setAddColorItem}
                                                                               setMessage={setMessage}  setMessageColor={setMessageColor} setMessageData={setMessageData}
                                                                               setInputs={setSub} setSelected={setSelectColor} setShowMessage={setShowMessage}
                                                                               handleChange={handleSubType}/>
                                                  </div>

                                              </div>}
                                              {sizes && <div className={`flex flex-col `}>
                                                  <label className={`pt-1 uppercase text-slate-400 font-bold text-sm`}>
                                                      size
                                                  </label>
                                                  <div className={`w-44`}>
                                                      <SingleSelectWithSearch  data={sizeData} dataValue={'size'}
                                                                               category={`size`} selected={selectSize} addItem={addSizeItem} setAddItem={setAddSizeItem}
                                                                               setMessage={setMessage} setMessageColor={setMessageColor} setMessageData={setMessageData}
                                                                               setInputs={setSub} setSelected={setSelectSize} setShowMessage={setShowMessage}
                                                                               handleChange={handleSubType}/>
                                                  </div>

                                              </div>}

                                              <div className={`flex flex-col gap-1`}>
                                                  <label
                                                      className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                                  <input
                                                      onChange={handleSubType}
                                                      name={`stock`}
                                                      className={`outline-none border border-slate-400 focus:outline-0 rounded text-sm p-1 `}
                                                      type="number"/>
                                              </div>

                                              <div className={`relative flex h-full items-center`}>
                                                  <CheckCircleIcon
                                                      onClick={addSub}
                                                      className={`cursor-pointer absolute -inset-1 left-4 h-8 w-8 text-green-500 drop-shadow-lg`}/>
                                              </div>
                                          </div>
                                      )}/>


                        </AccordionLayout>
                    </div>
                </ProductPageDisplay>
            </div>
        </div>
    );
};

export default NewProductPage;
/*  <button className={`h-8 whitespace-nowrap leading-none px-4 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded`}>Add Type</button>*/
