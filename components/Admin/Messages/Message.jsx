import {useState} from 'react';
import {ChevronLeftIcon, EnvelopeIcon, TrashIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import axios from "axios";
import useAdmin from '../../../pages/api/hooks/useAdmin'
import {useRouter} from "next/router";
import ReplyModal from "./ReplyModal";
const Message = ({messages}) => {
    const router = useRouter()
    const {notifications, mutate, isValidating} = useAdmin()
    const [showModal, setShowModal] = useState(false)
   const handleDelete = async () => {
       try{
           const res = await axios.delete(`/api/messages/${messages?._id}`)
           if(res.status === 200){
               mutate()
               router.push('/admin')
           }
       }catch(err){
           console.log(err)
       }
   }

    return (
      <div>
          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <ReplyModal showModal={showModal} setShowModal={setShowModal} messages={messages}/>
              <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-lg leading-6 text-slate-500 uppercase">{messages.subject}</h3>

              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Naam</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.fullName}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Email </dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.email}</dd>
                      </div>
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Telefoon</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.phone}</dd>
                      </div>

                      {messages.regarding && <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Regarding</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">{messages.regarding}</dd>
                      </div>}
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt className="text-sm font-medium text-slate-400">Message</dt>
                          <dd className="mt-1 text-sm text-slate-500 sm:col-span-2 sm:mt-0">
                              {messages.message}
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
         <div className={`flex justify-around my-5 gap-5 text-white uppercase font-bold px-10`}>
             <Link href={`/admin/messages`}>
             <button className={`flex items-center justify-center  bg-red-500 hover:bg-red-700 px-4 py-2 uppercase rounded`}>
             <ChevronLeftIcon className={`h-5 w-5 `}/>
                 Terug
             </button>
             </Link>
             <button onClick={()=>setShowModal(true)} className={` flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded uppercase`}>
                 <EnvelopeIcon className={`h-6 w-6`}/>
                 Reply
             </button>
             <button onClick={handleDelete} className={`flex items-center justify-center gap-1 bg-red-500 hover:bg-red-700 px-4 py-2 uppercase rounded`}>
                 <TrashIcon className={`h-6 w-6`}/>
                 Delete
             </button>
         </div>
      </div>
    );
};

export default Message;
