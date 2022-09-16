import {useState} from 'react';
import ModalCard from "../Modal/ModalCard";

const CustomerSearch = ({showModal, setShowModal, item}) => {
    const [index, setIndex] = useState(0)
    return (
        <>
            <ModalCard  showModal={showModal} setShowModal={setShowModal}>
                <div className={` p-5 flex flex-col gap-2  text-slate-400 text-sm font-semibold`}>
                    <div className={'flex justify-evenly gap-4 '}>
                        <div className={`items-center  flex gap-1`}>
                            <label htmlFor="">Guest</label>
                            <input id={`1`}
                                   type="radio"
                                   checked={index === 1}
                                   value={1}
                                   onChange={()=>setIndex(1)}

                            />
                        </div>
                        <div  className={`items-center flex gap-1`}>
                            <label htmlFor="">Customer</label>
                            <input id={`2`}
                                   type="radio"
                                   checked={index === 2}
                                   value={2}
                                   onChange={()=>setIndex(2)}

                            />
                        </div>
                    </div>
                    {index === 2 && <>
                    <span>Search By:</span>

                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Username:</label>
                            <input className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <span className={`text-center uppercase font-bold py-1`}>-or-</span>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Phone:</label>
                            <input className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                    </>}
                    {index === 1 && <>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Username:</label>
                            <input className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Username:</label>
                            <input className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Username:</label>
                            <input className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                    </>}
                    {index !==0 &&
                        <button className={`bg-[#5eaf81] shadow-lg text-white font-bold uppercase rounded mt-4  py-1 px-2`}>
                        Submit
                    </button>}
                </div>


            </ModalCard>

        </>
    );
};

export default CustomerSearch;
