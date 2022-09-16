import {useState} from 'react';
import CustomerSearch from "./Pos/CustomerSearch";
import Nieuw from "./Nieuw/Nieuw";
import { useSession, signOut } from "next-auth/react"
const AdminNavbar = () => {
    const [showModal, setShowModal] = useState(false)
    return (
        <div  className=" bg-white border-b border-slate-200 z-50">
            <Nieuw showModal={showModal} setShowModal={setShowModal} />
            <div className="px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between h-16 ">
                    <span className={'uppercase font-semibold text-slate-500 text-lg'}>👋 Dag Chris</span>

                    <div className={'flex gap-3'}>
                        <button  onClick={()=>setShowModal(true)} className={'uppercase text-xs text-white bg-red-500 py-2 px-3 rounded font-bold'}>Nieuw</button>
                        <button onClick={()=>signOut()} className={'uppercase text-xs text-white bg-blue-500 py-2 px-3 rounded font-bold'}>Logout</button>                          </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
