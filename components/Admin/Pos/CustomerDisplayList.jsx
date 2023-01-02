import React from 'react';

const CustomerDisplayList = ({setIndex, client, setCustomer, setShowModal, inputRef}) => {
    return (
        <div className={`flex flex-col text-center ${client.length !==0 && 'divide-y-2'} divide-blue-500`}>
            {client.length === 0 ?
                <>
                    <span   className={`uppercase pb-1  text-lg text-slate-500`}>No results found</span>
                    <span onClick={()=>setIndex(0)} className={`hover:bg-blue-500 rounded px-2 py-1 hover:text-white uppercase cursor-pointer`}>&larr; New Search</span>
                </>
                :
                <span className={`uppercase pb-1  tracking-widest text-xl text-slate-600`}>results</span>}
            <div className={`pt-3`}>
                {client.map((client, idx) => (

                    <div key={idx} className={`flex items-center justify-between space-x-10`}>
                        <span className={`text-lg`}>{client.name}</span>
                        <span
                            onClick={()=> {
                                    setCustomer(client)
                                    setShowModal(false)
                                inputRef.current.focus()
                            }}
                            className={`bg-transparent rounded text-xs hover:bg-blue-500 hover:text-white py-1 px-2 border-0 hover:rounded font-semibold uppercase tracking-wide leading-loose cursor-pointer transition duration-100`}>Select</span>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CustomerDisplayList;
