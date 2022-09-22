import React from 'react';
import ModalCard from "../Modal/ModalCard";
import {EnvelopeIcon} from "@heroicons/react/24/outline";

const ReplyModal = ({showModal, setShowModal, messages}) => {
    return (
        <ModalCard showModal={showModal} setShowModal={setShowModal}>
            <div className={`flex flex-col gap-5`}>
                <span  className={`text-slate-500`}><span className={`text-slate-400 font-bold`}>To:</span> {messages.fullName}</span>
                <span  className={`text-slate-500`}><span className={`text-slate-400 font-bold`}>Subject:</span> {messages.subject}</span>
                <span  className={`text-slate-500`}><span className={`text-slate-400 font-bold`}>Re: </span>{messages.regarding}</span>
                <textarea  className={`text-slate-500 rounded border-slate-400`} name="response" id="" cols="40" rows="5"></textarea>
                <button onClick={()=>setShowModal(false)} className={`flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded uppercase`}>
                    <EnvelopeIcon className={`h-6 w-6`}/>
                    stuur
                </button>
            </div>
        </ModalCard>
    );
};

export default ReplyModal;
