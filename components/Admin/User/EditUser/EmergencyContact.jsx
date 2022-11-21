import {useState} from 'react';
import 'react-phone-number-input/style.css'
import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
const EmergencyContact = ({handleChange, register, user}) => {
    const [phone, setPhone] = useState(user.personal.phone)
    const [value, setValue] = useState()
    return (
        <div className='flex flex-col items-center w-full'>



            <div className={`flex flex-col gap-2 text-sm`}>
                <div className={`flex flex-col gap-1 text-sm`}>
                    <label className='uppercase text-slate-400 font-bold'>Voornaam</label>
                    <input
                        onChange={handleChange} name={`username`}
                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                        placeholder={user.emergencyContact.firstName} type="text"/>
                </div>
                <div className={`flex flex-col gap-1 text-sm`}>
                    <label className='uppercase text-slate-400 font-bold'>Achternaam</label>
                    <input
                        onChange={handleChange} name={`username`}
                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                        placeholder={user.emergencyContact.lastName} type="text"/>
                </div>

                <div className={`flex flex-col gap-1 text-sm`}>
                    <label className='uppercase text-slate-400 font-bold'>email</label>
                    <input
                        onChange={handleChange} name={`manufacturer`}
                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                        placeholder={user.emergencyContact.email} type="text"/>
                </div>
                <div className={`flex flex-col gap-1 text-sm`}>
                    <span className='uppercase text-slate-400 font-bold'>phone</span>
                    <Input className={`bg-white border border-slate-400 focus:outline-none rounded text-sm p-1  text-slate-500 placeholder:text-slate-300`}
                           onChange={setValue}
                           style={{borderColor: '#94a3b8', padding: '0.25rem', color: '#64748b', fontSize: '0.875rem'}}
                           defaultCountry={getCountryCallingCode(user.address.country)}
                           name={`phone`}
                           placeholder={user.emergencyContact.phone}
                           value={value}
                    />
                </div>
                <div className={`flex flex-col gap-1 text-sm`}>
                    <span className='uppercase text-slate-400 font-bold'>birthday</span>
                    <input
                        onChange={handleChange} name={`manufacturer`}
                        className={`border border-slate-400 focus:outline-none rounded text-sm p-1  placeholder:text-slate-300`}
                        placeholder={user.personal.dob} type="text"/>
                </div>
                <button className={`py-3 px-4 leading-none uppercase text-white bg-blue-500 hover:bg-blue-600 rounded`}>Update Emergency Contact</button>
            </div>






        </div>
    );
};

export default EmergencyContact;
