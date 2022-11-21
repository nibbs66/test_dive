import {useState} from 'react';
import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
const EditPersonalInfo = ({handleChange, user}) => {
    const [phone, setPhone] = useState(user.personal.phone)
    const [value, setValue] = useState()
    return (
        <div className='flex flex-col items-center w-full'>


                <div className={`flex flex-col items-center gap-2 text-sm`}>

                    <div className={`flex flex-col gap-1 text-sm`}>
                        <label className='uppercase text-slate-400 font-bold'>street</label>
                        <input
                            onChange={handleChange} name={`street`}
                            className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                            placeholder={user.address.address} type="text"/>
                    </div>
                    <div className={`flex flex-col gap-1 text-sm`}>
                        <span className='uppercase text-slate-400 font-bold'>City</span>
                        <input
                            onChange={handleChange} name={`manufacturer`}
                            className={`border border-slate-400 focus:outline-none rounded text-sm p-1 text-slate-500 placeholder:text-slate-300`}
                            placeholder={user.address.city} type="text"/>
                    </div>
                    <div className={`flex flex-col gap-1 text-sm`}>
                        <span className='uppercase text-slate-400 font-bold'>Postal Code</span>
                        <input
                            onChange={handleChange} name={`manufacturer`}
                            className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                            placeholder={user.address.postalCode} type="text"/>
                    </div>
                    <div className={`flex flex-col gap-1 `}>
                        <label className='uppercase text-slate-400 font-bold text-sm'>Country</label>
                        <input
                            onChange={handleChange} name={`country`}
                            className={`border border-slate-400 focus:outline-none rounded text-sm p-1 placeholder:text-slate-300`}
                            placeholder={user.address.country} type="text"/>
                    </div>
                    <button className={`py-3 px-4 leading-none uppercase text-white bg-blue-500 hover:bg-blue-600 rounded`}>Update Address</button>
                </div>






        </div>
    );
};

export default EditPersonalInfo;
