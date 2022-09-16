import React from 'react';

const EmergencyContact = ({handleChange, register}) => {
    return (
        <div className={`grid grid-cols-2 gap-5 items-center my-5 mx-10 w-full`}>
            <div className={`flex flex-col gap-1`}>
                <label className={`text-slate-400 pl-1 uppercase font-bold text-sm`} htmlFor="voornaam">Voornaam</label>
                <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange}   type="text"/>
            </div>
            <div className={`flex flex-col gap-1`}>
                <label className={`text-slate-400 uppercase font-bold text-sm pl-1`} htmlFor="achternaam">Achternaam</label>
                <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange}  type="text"/>
            </div>
            <div className={`flex flex-col gap-1`}>
                <label className={`text-slate-400 pl-1 uppercase font-bold text-sm`} htmlFor="email">email</label>
                <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange}   type="text"/>
            </div>
            <div className={`flex flex-col gap-1`}>
                <label className={`text-slate-400 uppercase font-bold text-sm pl-1`} htmlFor="phone">phone</label>
                <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1  w-3/4`} onChange={handleChange}  type="text"/>
            </div>

        </div>
    );
};

export default EmergencyContact;
