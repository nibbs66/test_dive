import {useState, useEffect} from 'react';
import CustomerSearch from "./Pos/CustomerSearch";
import Nieuw from "./Nieuw/Nieuw";
import { useSession, signOut } from "next-auth/react"
import useAdmin from '../../pages/api/hooks/useAdmin'
import {EnvelopeIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import {useRouter} from 'next/router'
const AdminNavbar = () => {
    const {data: session} = useSession()
    const {notifications, error, isValidating} = useAdmin()
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState(false)
    const [user, setUser] = useState({})
    const router = useRouter()
    useEffect(()=>{
        if(session){
            setUser(session)
        }else{
            setUser(null)
        }
        if(notifications?.length > 0){
            setMessage(true)
        }else{
            setMessage(false)
        }

    },[session, notifications])
    const logOut = async() => {
        await  signOut({ callbackUrl: process.env.PUBLIC_URL })
        //await  router.push('/')
    }
    return (
        <div  className=" bg-white border-b border-slate-200 z-50">
            <Nieuw showModal={showModal} setShowModal={setShowModal} />
            <div className="px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 ">
                    <span className={'uppercase font-semibold text-slate-500 text-lg'}>👋 Hallo {user?.firstName} </span>

                    <div className={'flex space-x-6 items-center'}>
                        <button  onClick={()=>setShowModal(true)} className={'uppercase text-xs  text-white bg-red-500 py-2 px-3 rounded font-bold'}>Nieuw</button>
                        <button onClick={logOut} className={'uppercase text-xs text-white bg-blue-500 py-2 px-3 rounded font-bold'}>Logout</button>
                        <Link href={`/admin/messages`}>
                            <div className={`flex relative cursor-pointer`}>
                                <EnvelopeIcon className={`h-8 w-8 relative text-sky-500`}/>
                                {message && <EnvelopeIcon className={`h-8 w-8 absolute animate-ping opacity-75 text-sky-400`}/>}
                                <span className="flex h-3 w-3">
                                <span className="absolute inline-flex right-2 -top-2 rounded-full h-5 w-5 bg-red-500"></span>
                               <span className={`text-white text-sm absolute right-3.5 -top-2`}>{message ? notifications?.length : 0}</span>
                            </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
