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


const NewProductPage = () => {
    const {colorData, sizeData,  categoryData} = useProduct()
    const [inputs, setInputs] = useState({})
    const [sub, setSub] = useState({})
    const [activeIndex, setActiveIndex] = useState(1)
    const [productSubType, setProductSubType] = useState([])
    const [barCode, setBarCode] = useState([])
    const[showMessage, setShowMessage] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [selected, setSelected] = useState('')
    const [enabled, setEnabled] = useState(false)
    const [colors, setColors] = useState(false)
    const [sizes, setSizes] = useState(false)
    const [file, setFile] = useState(null)
    const [img, setImg] = useState([])
    const [upload, setUpload] = useState(false)
    const [messageColor, setMessageColor] = useState('green')
    const [message, setMessage] = useState('Upload Yeah')
    const [inputNumber, setInputNumber] = useState(1)
    const newProduct =[{new: 'Nee'}, {new: 'Ja'}]
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
        setProductSubType(prev=>[...prev, sub])
        if(sub.modelId!==undefined && inputs.vendor!==undefined){
            //toast.success('Sub Type added')

            //setInputNumber(inputNumber + 1)
            setSub({})
            disabled && setDisabled(false)
        }

    };
    console.log(productSubType)
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


    return (
        <div>
            <ErrorAlert showMessage={showMessage} setShowMessage={setShowMessage} color={messageColor} message={message}/>
            <form action="" onSubmit={handleSubmit}>
                <ProductPageDisplay product={inputs} handleSubmit={handleSubmit} submitButton={true} disabled={disabled} message={`Add Product Subtype before submitting!!`}>

                    <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
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
                            <form className={`flex flex-col w-full`} action="components/Admin/Products/NewTProductPage">
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
                                            <input
                                                className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 `}
                                                onChange={handleChange} name={`vendor`}
                                                type="text"/>
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
                                                              selected={selected} setInputs={setInputs}
                                                              setSelected={setSelected} handleChange={handleChange}/>
                                            </div>

                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>Gender</label>
                                            <div className={`w-1/2`}>
                                                <SingleSelect data={productGender} dataValue={'gender'}
                                                              category={`gender`} selected={selected}
                                                              setInputs={setInputs} setSelected={setSelected}
                                                              handleChange={handleChange}/>
                                            </div>

                                        </div>
                                        <div className={`flex flex-col gap-1`}>
                                            <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>
                                            <div className={`w-1/2`}>
                                                <SingleSelect data={categoryData} dataValue={'name'}
                                                              category={`category`} selected={selected}
                                                              setInputs={setInputs} setSelected={setSelected}
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

                            </form>
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
                                      onClick={() => setActiveIndex(1)} inputNumber={inputNumber} setInputNumber={setInputNumber} headerOptions={true}
                                      callbackfn={(el, idx) => (
                                          <form className={`flex items-center justify-center space-x-2 text-sm w-full`}
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
                                              {sizes && <div className={`flex flex-col `}>
                                                  <label className={`pt-1 uppercase text-slate-400 font-bold text-sm`}>
                                                      size
                                                  </label>
                                                  <div className={`w-44 `}>
                                                      <SingleSelect data={sizeData} dataValue={'size'} category={`size`}
                                                                    selected={selected} setInputs={setSub}
                                                                    setSelected={setSelected}
                                                                    handleChange={handleSubType}/>
                                                  </div>
                                              </div>}
                                              {colors && <div className={`flex flex-col  `}>
                                                  <label
                                                      className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                                  <div className={`w-44`}>
                                                      <SingleSelect data={colorData} dataValue={'color'}
                                                                    category={`color`}
                                                                    selected={selected} setInputs={setSub}
                                                                    setSelected={setSelected}/>
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
                                          </form>
                                      )}/>

                            {/*<div className={`mx-10 flex flex-col items-center space-y-4 w-full `}>
                            <div className={` flex space-x-4 w-full`} action="">
                                <div className={`flex items-center  justify-center`}>
                                    <div>
                                        <Image
                                            className={`object-cover rounded-full items-center`}
                                            src={file.length !== 0
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
                                            onChange={(e) => {
                                                setFile(e.target.files[0])
                                                setUpload(true)
                                            }}

                                        />
                                    </div>}

                                    <div className={`flex  items-center gap-2`}>
                                        {upload && <button
                                            onClick={handleClick}
                                            className={`bg-green-500 text-white uppercase py-1 px-2 rounded text-sm font-bold`}>Add
                                            Img</button>}
                                    </div>
                                </div>
                                <div className={`grid grid-cols-2 w-full my-4  `}>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Model Id</label>
                                        <input
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                            onChange={handleSubType} name={`modelId`}
                                            type="text"/>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>
                                        size
                                         <Toggle name={`size`} enabled={enabled} setEnabled={setEnabled}/>
                                        </label>
                                        <div className={`w-1/2`}>
                                            <SingleSelect data={productSizes} dataValue={'size'} category={`size`}
                                                          selected={selected} setInputs={setSub}
                                                          setSelected={setSelected} handleChange={handleSubType}/>
                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                        <div className={`flex items-center gap-2`}>
                                            <input
                                                className={`border border-slate-400  focus:outline-0 rounded text-sm p-1 w-1/2`}
                                                name={`barcode`}

                                                onChange={handleSubType}
                                                type="text"/>

                                        </div>
                                    </div>
                                    <div className={`flex flex-col gap-1 `}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>
                                        <div className={`w-1/2`}>
                                            <SingleSelect data={productColors} dataValue={'color'} category={`color`}
                                                          selected={selected} setInputs={setSub}
                                                          setSelected={setSelected}/>
                                        </div>
                                    </div>

                                    <div className={`flex flex-col gap-1`}>
                                        <label className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                        <input
                                            onChange={handleSubType}
                                            name={`stock`}
                                            className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2`}
                                            type="number"/>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <button onClick={addSub}
                                        className={` uppercase whitespace-nowrap leading-none px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded`}>Add
                                    Type
                                </button>
                            </div>
                        </div>
                        */}
                        </AccordionLayout>
                    </div>
                </ProductPageDisplay>
            </form>
        </div>
    );
};

export default NewProductPage;
/*  <button className={`h-8 whitespace-nowrap leading-none px-4 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded`}>Add Type</button>*/
