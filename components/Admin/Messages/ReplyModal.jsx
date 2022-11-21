import {useState} from 'react';
import ModalCard from "../../Modal/ModalCard";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import axios from "axios";

const ReplyModal = ({showModal, setShowModal, messages}) => {
    const [reply, setReply] = useState('')
    const handleReply = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post(`/api/conversation`,
                {

                    response: reply,
                    messages

                }
                )
            console.log(res)
        }catch(err){
            console.log(err)
        }
    }
    console.log(reply)
    return (
        <ModalCard showModal={showModal} setShowModal={setShowModal}>
            <div className={`flex flex-col gap-5`}>
                <span  className={`text-slate-500`}><span className={`text-slate-400 font-bold`}>To:</span> {messages.fullName}</span>
                <span  className={`text-slate-500`}><span className={`text-slate-400 font-bold`}>Subject:</span> {messages.subject}</span>
                {messages.regarding && <span className={`text-slate-500`}><span
                    className={`text-slate-400 font-bold`}>Re: </span>{messages.regarding}</span>}
                <textarea onChange={(e)=>setReply(e.target.value)}  className={`text-slate-500 rounded border-slate-400`} name="response" id="" cols="40" rows="5"></textarea>
                <button onClick={handleReply} className={`flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded uppercase`}>
                    <EnvelopeIcon className={`h-6 w-6`}/>
                    stuur
                </button>
            </div>
        </ModalCard>
    );
};

export default ReplyModal;
