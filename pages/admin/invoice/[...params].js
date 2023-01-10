import {useState, useEffect} from 'react';
import Invoice from '../../../components/Invoice'
import axios from "axios";
import {useRouter} from "next/router";
import {ArrowUpTrayIcon} from "@heroicons/react/24/outline";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from '../../../lib/firebase';
import Link from 'next/link'
import Loader from "../../../components/icons/Loader";
import useEmployee from "../../api/hooks/useEmployee";
import {useSession} from "next-auth/react";
const Betaal = ({sale, empFirst, empLast}) => {
    const router = useRouter()
    const [complete, setComplete] = useState(true)
    const [newPDF, setNewPDF] = useState(false)
    const [file, setFile] = useState([])
    const [inv, setInv] = useState([])
    const [naam, setNaam] = useState('')
    const {query} = router



    /*useEffect(()=>{
        if(typeof window === undefined ){
            console.log('not set')
        }

        setTimeout(async()=>{
            try{
                const res = await axios.post(`/api/invoice`, {saleId: query.params[1], invoicePage: query.params[0]+'/'+query.params[1]+'/'+query.params[2]})

                if (res.status === 200) {
                    console.log('huzzah!!!', res)
                    setComplete(true)}
            }catch(err){
                console.log(err)
            }
        }, 10000)

    },[])*/

    useEffect(()=>{
        const loadUser = async()=>{
            try{
                const res = await axios.get(`/api/users/${sale.userId}`)
                setNaam(res.data.firstName+' '+res.data.lastName)
                //res.status === 200 && await handlePDF()

            }catch(err){
                console.log(err)
            }

        }
        loadUser()
    },[sale, query.id])


    const uploadPDF = async() => {
        console.log('newButton', file)

        const fileName = file.name + new Date().getTime();
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
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
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
                    downloadURL &&
                    setInv(prev=>[...prev, downloadURL])

                });
            }
        );
    }
    const handleChange = () => {

    }
    console.log(file)

    return (
        <>

            <div className={` print:hidden`}>

                {!complete && <div  className={`absolute flex w-full h-full bg-black/30  items-center justify-center   z-20  `}>
                    <Loader message={`Generating PDF`}/>
                </div>}



                {!complete && <div className={`absolute absolute flex w-full h-full bg-black/50  items-center justify-center cursor-pointer  z-20  `}>


                    <input
                        className={`flex  file:bg-[#3b81f6] py-5 px-4 drop-shadow-lg rounded bg-white/80 file:text-white file:mr-4 file:py-2 text-sm text-slate-400
                                    file:uppercase file:text-sm file:px-4 file:rounded-full file:border-0
                                    file:cursor-pointer
                                    `}
                        type="file"
                        id="file"
                        onChange={(e) => {
                            setFile(e.target.files[0])
                            setNewPDF(true)

                        }}

                    />
                </div>}


            </div>
            <Invoice complete={complete} sale={sale} naam={sale.name} empFirst={empFirst} empLast={empLast}>
                <div className=" relative flex flex-col overflow-x-auto relative  mt-8 items-center justify-items-center">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-slate-500 uppercase bg-gray-50 ">
                        <tr >
                            <th scope="col" className="py-3 px-6">
                                St.
                            </th>

                            <th scope="col" className="py-3 px-6">
                                Artikel Omschrijving
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Prijs per stuk
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Korting
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Prijs
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {sale.items.map((item, idx)=>(
                            <tr key={idx} className="bg-white border-b-4 ">
                                <th scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap ">
                                    {item.quantity}
                                </th>
                                <td className="py-4 px-6">
                                    {item.name}
                                </td>
                                <td className="py-4 px-6">
                                    €{item.price.toFixed(2)}
                                </td>
                                <td className="py-4 px-6">
                                    €0.00
                                </td>
                                <td className="py-4 px-6">
                                    €{(item.price*item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}


                        </tbody>
                    </table>

                </div>
                <div className='flex flex-col gap-2 justify-end  mt-2 text-gray-500 text-sm'>
                    <div className='flex items-center gap-3 justify-end '>
                        <span  className='font-bold'>Subtotaal ex BTW:</span>
                        <span>€{(sale.total/1.21).toFixed(2)}</span>
                    </div>
                    <div className='flex items-center gap-3 justify-end'>
                        <span  className='font-bold'>21% BTW:</span>
                        <span>€{(sale.total - ((sale.total)/1.21)).toFixed(2) }</span>
                    </div>
                    <div className='flex items-center gap-3 justify-end'>
                        <span  className='font-bold'>Totaal incl. BTW:</span>
                        <span>€{sale.total.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center gap-3 justify-end'>
                        <span  className='font-bold'>Amount Paid:</span>
                        <span>€{sale.amountPaid?.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center gap-3 justify-end'>
                        <span  className='font-bold'>Balance Due:</span>
                        <span>€{(sale.total-sale.amountPaid).toFixed(2)}</span>
                    </div>

                </div>
            </Invoice>
        </>
    );
};

export default Betaal;
export async function getServerSideProps(ctx) {

    const host = ctx.req.headers.host;
    if(ctx.params.params[0] === 'sale'){
        const res = await axios.get(`https://`+host+`/api/sales/${ctx.params.params[1]}`);
        const med = await axios.get(`https://`+host+`/api/users/${ctx.params.params[2]}`);

        return {
            props: {
                sale: res.data,
                empFirst: med.data.firstName,
                empLast: med.data.lastName
            },
        }
    }else if(ctx.params.params[0] === 'order'){
        const res = await axios.get(`https://`+host+`/api/orders/${ctx.params.params[1]}`);
        const med = await axios.get(`https://`+host+`/api/users/${ctx.params.params[2]}`);

        return {
            props: {
                sale: res.data,
                empFirst: med.data.firstName,
                empLast: med.data.lastName
            },
        }
    }

}
