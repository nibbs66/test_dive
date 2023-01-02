import {useState, useEffect} from 'react';
import AccordionLayout from "../../Accordion/AccordionLayout";
import Image from "next/image";
import Upload from "../../icons/Upload";
import ProductPageDisplay from "./ProductPageDisplay";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'
import {getDownloadURL, getStorage, ref, uploadBytesResumable, deleteObject} from "firebase/storage";
import app from "../../../lib/firebase";
import UploadImg from "../../ImageSelectors/UploadImg";
import SubTypes from "./SubTypes";
import SingleSelect from "../../Tools/SingleSelect";
import {DocumentCheckIcon, DocumentChartBarIcon, PlusCircleIcon, XCircleIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import useProduct from "../../../pages/api/hooks/useProduct";
import SingleSelectWithSearch from "../../Tools/SingleSelectWithSearch";
import ErrorAlert from "../../Alerts/ErrorAlert";
const notificationMethods = [
    { id: 'add', title: 'Add Photo' },
    { id: 'delete', title: 'Delete Photo' },

]
const EditProductPage = ({product}) => {
    const {colorData, mutateColor, sizeData, mutateSize, vendors,  categoryData} = useProduct()
    const [currentStock, setCurrentStock] = useState(0)
    const [selected, setSelected] = useState('')
    const [sub, setSub] = useState({})
    const [activeIndex, setActiveIndex] = useState(4)
    const [index, setIndex] = useState(1)
    const [file, setFile] = useState([])
    const [inputs, setInputs] = useState({})
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    const [code, setCode] = useState('')
    const [barCode, setBarCode] = useState(product.barcode)
    const [colors, setColors] = useState(false)
    const [sizes, setSizes] = useState(false)
    const [newStock, setNewStock] = useState(0)
    const [upload, setUpload] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)
    const [checked, setChecked] = useState('')
    const [productSubType, setProductSubType] = useState([])
    const [inputNumber, setInputNumber] = useState(0)
    const [headerOptions, setHeaderOptions] = useState(false)
    const [messageColor, setMessageColor] = useState('green')
    const [messageData, setMessageData] =useState({})
    const [addColorItem, setAddColorItem] = useState(false)
    const [addSizeItem, setAddSizeItem] = useState(false)
    const[showMessage, setShowMessage] = useState(false)
    const [selectColor, setSelectColor] = useState('')
    const [selectSize, setSelectSize] = useState('')
    const [message, setMessage] = useState('Upload Yeah')
    const newProduct =[{new: 'Nee'}, {new: 'Ja'}]
    const aanbiedingenProduct =[{new: 'Nee'}, {new: 'Ja'}]

    useEffect(()=>{

        const hasColor = product.productSubType.filter((item) => item.color)
        if(hasColor.length >0){
            setColors(true)
        }
        const hasSize = product.productSubType.filter((item) => item.size)
        if(hasSize.length >0){
            setSizes(true)
        }
    },[product])
    const handleChange = (e) => {

        setInputs(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    };

    const upDates=(data, update) => {
        let newData;
        if(update === 'barcode'){
            newData = barCode
            newData.push(data)
            setBarCode(newData)
            setCode('')
        }else if(update === 'color'){
            newData = colors
            newData.push(data)
            setColors(newData)
            setColor('')
        }else if(update === 'size'){
            newData = sizes
            newData.push(data)
            setSizes(newData)
            setSize('')
        }else if(update === 'stock'){
            newData = sizes
            newData.push(data)
            setSizes(newData)
            setSize('')
        }

    }

    const handleDeleteImg = async(e) => {
        e.preventDefault()


        const storage = getStorage(app);
        const fileRef = ref(storage, file);
        deleteObject(fileRef).then(async() => {
            try{
                const res =  await axios.put(`/api/products/${product._id}`, {removeImg: true, file})
                res.status === 201 && toast.success('Pic successfully deleted')
                setFile([])
            }catch(err){
                console.log(err)
                toast.error('Uh-oh, an error occurred!')
            }


        }).catch((error) => {
            console.log(error)
            toast.error('Uh-oh, an error occurred!')
            // Uh-oh, an error occurred!
        });


    }
    const handleSubType = (e) => {
        e.preventDefault()
        setSub(prev=>{
            return {...prev, [e.target.name]: e.target.value}
        })



    }
    console.log('selected', sub)
    const addSub = (e) => {
        e.preventDefault()
        setProductSubType(prev=>[...prev, sub])
        setSub({})
    };

    const handleClick = async (e) =>{

        e.preventDefault()
        if(product.img.length >= 3){
            toast.error('Maximum number of product images has been reached')
            setUpload(false)
            setFile([])

        }else{
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName)


            const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    switch (snapshot.state) {
                        case 'paused':

                            break;
                        case 'running':

                            break;
                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        if(downloadURL){
                            const newImg = product.img;
                            newImg.push(downloadURL)
                            setFile([])
                            try{

                                const res = await axios.put("/api/products/"+product._id, {img: newImg})
                                toast.success('Image Saved!!')
                                setUpload(false)
                                setFile([])
                                setUpload(false)
                            }catch(err){

                            }
                        }

                    });
                }
            );
        }

    }
    const handleEdit = async(data) => {

        try{
            if(data === 'product'){
                const res = await axios.put("/api/products/"+product._id, {...inputs})
                res.status === 201 && toast.success(`${product.name}  successfully updated`)
                setInputs({})
            }else if(data === 'subType'){
                const res = await axios.put(`/api/products/${product._id}`, {productEdit: true, sub})
                res.status === 201 && toast.success(`${product.name} sub type successfully updated`)
                setSub({})
            }else if(data === 'newSubType'){
                const res = await axios.put(`/api/products/${product._id}`, {newSub: true, sub})
                res.status === 201 && toast.success(`${product.name} sub type successfully updated`)
                setSub({})
            }


            //const res = await axios.put("/api/products/"+product._id, {...inputs})


        }catch(err){
            console.log(err)
        }
    }
    const handleDelete = async(data) => {

        try{

            const res = await axios.put(`/api/products/${product._id}`,
                {deleteSub: true, data}
            );
            res.status === 201 && toast.success(`${product.name} sub type successfully deleted`)
        }catch(err){
            console.log(err)
        }
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
    return (
        <ProductPageDisplay  product={product} >
            <ErrorAlert showMessage={showMessage} setShowMessage={setShowMessage} color={messageColor} handleNewItems={handleNewItems} messageData={messageData}   message={message}/>
            <div className={`flex flex-col gap-5 pt-5 mt-5`}>
                <AccordionLayout
                    title={`Edit Product Img`}
                    bg={`${activeIndex === 0 ? 'bg-slate-500' : 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-16'}
                    bodyMargin={'mx-10'}
                    index={0}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex items-center justify-evenly  mx-10 w-full `}>
                        <div>
                            {/*<label className="text-base font-medium text-gray-900">Edit Images</label>*/}
                            <p className="text-sm leading-5 text-slate-500">Please select Delete or Add.</p>
                            <fieldset className="mt-4">
                                <legend className="sr-only">Notification method</legend>
                                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                    {notificationMethods.map((notificationMethod) => (
                                        <div key={notificationMethod.id} className="flex items-center">
                                            <input
                                                onChange={()=> {
                                                    setChecked(notificationMethod.id),
                                                        setFile([]),
                                                        setUpload(false)
                                                }}
                                                id={notificationMethod.id}
                                                name="notification-method"
                                                type="radio"

                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />

                                            <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700">
                                                {notificationMethod.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>

                    </div>
                    {checked === 'add' &&
                        <UploadImg upload={upload} setUpload={setUpload} handleClick={handleClick} setFile={setFile} file={file}/>
                    }
                    {checked === 'delete' && <div className="flex flex-col items-center justify-center w-full placeholder:text-slate-300 gap-5">

                        {/*<div className={`flex gap-2 items-center uppercase text-sm text-slate-400 font-bold`}>

                        <label htmlFor="">
                            Upload Image:
                        </label>
                        <Upload fill={`#94a2b8`}/>
                    </div>*/}
                        <Image className={`object-cover rounded-full items-center`} src={file.length !== 0
                            ? file

                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt={''}
                               width={100} height={100} objectFit='cover'/>
                        {upload && <div className={`flex flex-col items-center gap-2`}>
                            <button onClick={handleDeleteImg}
                                    className={`bg-red-500 text-white uppercase py-1 px-2 rounded text-sm`}>Delete Img
                            </button>
                        </div>}

                        <div className={`flex `}>
                            {product.img.map((pic, idx) => (
                                <div
                                    onClick={() => {
                                        setImgIndex(idx)
                                        setFile(pic)
                                        setUpload(true)
                                    }}

                                    key={idx}
                                    className={`cursor-pointer`}>
                                    <Image src={pic} alt={''} height={100} width={100} objectFit={'contain'}/>
                                </div>

                            ))}
                        </div>
                    </div>}
                </AccordionLayout>
                <AccordionLayout
                    title={`Edit Product`}
                    bg={`${activeIndex === 1 ? 'bg-slate-500' : 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-16'}
                    bodyMargin={'mx-10'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col w-full`} action="" >
                        <div className={`grid grid-cols-2 w-full my-4 mx-10 `}>

                            <div className={`flex flex-col gap-2 text-sm`}>
                                <div className={`flex flex-col gap-1 text-sm`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Manufacturer</label>
                                    <input
                                        onChange={handleChange} name={`vendor`}
                                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                        placeholder={product.vendor} type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Product Name</label>
                                    <input
                                        onChange={handleChange} name={`name`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                        placeholder={product.name} type="text"/>
                                </div>

                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>cost</label>
                                    <input
                                        onChange={handleChange} name={`cost`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                        placeholder={`€${product.cost.toFixed(2)}`} type="text"/>


                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>price</label>
                                    <input
                                        onChange={handleChange} name={`price`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300  `}
                                        placeholder={`€${product.price.toFixed(2)}`} type="text"/>


                                </div>

                            </div>
                            <div className={`flex flex-col gap-2 text-sm`}>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Aanbiedingen</label>
                                    <div className={`w-1/2`}>
                                        <SingleSelect data={aanbiedingenProduct} dataValue={'new'} category={`new`}
                                                      selected={selected} setInputs={setInputs}
                                                      setSelected={setSelected} handleChange={handleChange}/>
                                    </div>

                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Nieuw</label>
                                    <div className={`w-1/2`}>
                                        <SingleSelect data={newProduct} dataValue={'new'} category={`new`}
                                                      selected={selected} setInputs={setInputs}
                                                      setSelected={setSelected} handleChange={handleChange}/>
                                    </div>



                                </div>

                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Category</label>
                                    <input
                                        onChange={handleChange} name={`category`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-1/2 placeholder:text-slate-300 `}
                                        placeholder={product.category} type="text"/>
                                </div>

                                <div className={`flex flex-col gap-1`}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Description</label>
                                    <textarea
                                        onChange={handleChange} name={`desc`}
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4  `}
                                        placeholder={product.desc} type="text"/>
                                </div>
                            </div>
                        </div>
                        <div className={`flex justify-center py-5`}>
                            <button
                                onClick={()=>handleEdit('product')}
                                className={`bg-green-500 py-1 px-2 text-white rounded uppercase font-bold`} type={`submit`}>
                                Confirm Changes
                            </button>
                        </div>
                    </div>
                </AccordionLayout>
                <AccordionLayout
                    title={`Edit Product Types`}
                    bg={`${activeIndex === 2 ? 'bg-slate-500' : 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-16'}
                    bodyMargin={'mx-10'}
                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col w-full items-center  space-y-5`}>

                        {product.productSubType.map((sub, idx)=>(
                            <div

                                key={idx} className={`flex space-x-2 items-center`}>
                                <div className={`relative flex  items-center`}>
                                    <XCircleIcon
                                        onClick={()=>handleDelete({id: sub._id, type: 'sub'})}
                                        className={`cursor-pointer absolute inset-0 -left-10 h-8 w-8 text-red-500 drop-shadow-lg`}/>
                                </div>

                                <div className={`flex flex-col gap-1` }>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold`}>Model
                                        Id</label>
                                    <input
                                        className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 `}
                                        onBlur={()=>setSub(prev=>{
                                            return {...prev, 'subId': sub._id}
                                        })}
                                        onChange={handleSubType} name={`modelId`} placeholder={sub.modelId}
                                        type="text"/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label
                                        className={`pt-1 uppercase text-slate-400 font-bold`}>Barcode</label>
                                    <div className={`flex items-center gap-2`}>
                                        <input
                                            className={`border border-slate-400  focus:outline-0 rounded text-sm p-1 `}
                                            name={`barcode`} placeholder={sub.barcode}
                                            onBlur={()=>setSub(prev=>{
                                                return {...prev, 'subId': sub._id}
                                            })}
                                            onChange={handleSubType}
                                            type="text"/>

                                    </div>
                                </div>
                                {sub.size && <div className={`flex flex-col gap-1 `}>
                                    <label className={`pt-1 uppercase text-slate-400 font-bold `}>
                                        size
                                    </label>
                                    <input
                                        onBlur={()=>setSub(prev=>{
                                            return {...prev, 'subId': sub._id}
                                        })}
                                        onChange={handleSubType}
                                        className={`border border-slate-400  focus:outline-0 rounded text-sm p-1 `}
                                        type="text" placeholder={sub.size}/>
                                </div>}
                                {sub.color && <div className={`flex flex-col gap-1 `}>
                                    <label
                                        className={`pt-1 uppercase text-slate-400 font-bold`}>Color</label>

                                    <input

                                        onBlur={()=>setSub(prev=>{
                                            return {...prev, 'subId': sub._id}
                                        })}
                                        onChange={handleSubType}
                                        className={`border border-slate-400  focus:outline-0 rounded text-sm p-1 `}
                                        type="text" placeholder={sub.color}/>

                                </div>}
                                <div className={`flex flex-col gap-1`}>
                                    <label
                                        className={`pt-1 uppercase text-slate-400 font-bold`}>stock</label>
                                    <input

                                        onBlur={()=>setSub(prev=>{
                                            return {...prev, 'subId': sub._id}
                                        })

                                        }
                                        onChange={(e)=>{
                                            setSub(prev=>{
                                                return {...prev, [e.target.name]: Number(e.target.value)+sub.stock}})

                                        }}
                                        name={`stock`} placeholder={sub.stock}
                                        className={`outline-none border border-slate-400 focus:outline-0 rounded text-sm p-1 `}
                                        type="number"/>
                                </div>
                                <div className={`relative flex  items-center`}>
                                    <CheckCircleIcon
                                        onClick={()=>handleEdit('subType')}
                                        className={`cursor-pointer absolute inset-0 left-4 h-8 w-8 text-green-500 drop-shadow-lg`}/>
                                </div>
                            </div>
                        ))}

                    </div>

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
                                        className={` uppercase whitespace-nowrap leading-none px-4 py-3 bg-blue-500 hover:bg-indigo-700 text-white rounded`}>Add
                                    Type
                                </button>
                            </div>
                        </div>
                        */}
                </AccordionLayout>
                <AccordionLayout
                    title={`Add Product Type`}
                    bg={`${activeIndex === 3 ? 'bg-slate-500' : 'bg-slate-400'}`}
                    text={'text-white'}
                    mx={'mx-16'}
                    bodyMargin={'mx-10'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col w-full items-center px-10  space-y-5`}>
                        <div className={`flex w-full items-center justify-evenly`}>
                            <span className={`text-slate-500 font-bold uppercase text-lg`}>New Sub-types</span>
                            <button className={`text-sm whitespace-nowrap leading-none py-3 px-4 text-white rounded bg-blue-500 hover:bg-indigo-700 `}
                                    onClick={()=> {
                                        setInputNumber(inputNumber + 1)
                                        setHeaderOptions(true)
                                    }}
                            >Add Type</button>
                        </div>
                        <div className={`w-3/4 border border-b-2 `}></div>
                        <SubTypes onChange={() => setColors(!colors)} onChange1={() => setSizes(!sizes)}
                                  onClick={() => setActiveIndex(1)} inputNumber={inputNumber} headerOptions={headerOptions}
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
                                                  <SingleSelectWithSearch  data={sizeData} dataValue={'size'}
                                                                           category={`size`} selected={selectSize} addItem={addSizeItem} setAddItem={setAddSizeItem}
                                                                           setMessage={setMessage} setMessageColor={setMessageColor} setMessageData={setMessageData}
                                                                           setInputs={setSub} setSelected={setSelectSize} setShowMessage={setShowMessage}
                                                                           handleChange={handleSubType}/>
                                              </div>
                                          </div>}
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
                                                  onClick={()=>handleEdit('newSubType')}
                                                  className={`cursor-pointer absolute -inset-1 left-4 h-8 w-8 text-green-500 drop-shadow-lg`}/>
                                          </div>
                                      </form>
                                  )}/>
                    </div>

                </AccordionLayout>

            </div>
        </ProductPageDisplay>
    );
};

export default EditProductPage;
