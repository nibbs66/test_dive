import {useState} from 'react';
import dayjs from "dayjs";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
const Employment = ({user, onChange}) => {
    const [type, setType] = useState('text')
    const [inputNumber, setInputNumber] = useState(1)
    const handleChange = () => {

    }
    return (
        <div className={`flex flex-col text-sm `}>
          <div className={`flex flex-col items-center text-slate-400`}>
              <span className={``}>New Position or End Employment</span>
              <div className={`flex space-x-2`}>
                  <div className={`flex items-center space-x-2 `}>
                      <label className={`text-slate-400`} htmlFor="">New</label>
                      <input type="checkbox" onChange={onChange}/>
                  </div>
                  <div className={`flex items-center space-x-2 `}>
                      <label className={`text-slate-400`} htmlFor="">End</label>
                      <input type="checkbox" onChange={onChange}/>
                  </div>
              </div>
          </div>
            <div className={` pl-5 grid grid-cols-4 content-center`}>
                <span className={`text-slate-400 font-bold`}>Position</span>
                <span className={`text-slate-400 font-bold`}>Hire Date</span>
                <span className={`text-slate-400 font-bold`}>End Date</span>
            </div>
            <div className={` pl-5 grid grid-cols-4 content-center space-y-1`}>
                {[...Array(inputNumber)].map((el, idx)=>(
                    <>
                        <div key={idx}>

                            <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                                   placeholder={`instructor...`}
                                   onChange={handleChange} type="text"/>
                        </div>
                        <div  key={idx}>

                            <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                                   onFocus={()=>setType('date')}
                                   onChange={handleChange}  type={type}
                                   placeholder={dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}/>
                        </div>
                        <div  key={idx}>

                            <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                                   placeholder={dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}
                                   onFocus={()=>setType('date')}
                                   onChange={handleChange}  type={type}/>
                        </div>
                        <div  key={idx}>
                            <CheckCircleIcon
                                onClick={()=>setInputNumber(inputNumber + 1)}
                                className={`h-6 w-6 text-white bg-green-500 hover:bg-green-600 rounded-full cursor-pointer`}/>
                        </div>
                    </>
                ))}
            </div>



        </div>
    );
};

export default Employment;
//[...Array(inputNumber)].map((el, idx)=>
/*<div>

                   <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                          placeholder={`instructor...`}
                          onChange={handleChange} type="text"/>
               </div>
               <div>

                   <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                          onFocus={()=>setType('date')}
                          onChange={handleChange}  type={type}
                          placeholder={dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}/>
               </div>
               <div>

                   <input className={`border border-slate-400 focus:outline-0 rounded text-xs p-0.5 w-3/4 placeholder-slate-300`}
                          placeholder={dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}
                          onFocus={()=>setType('date')}
                          onChange={handleChange}  type={type}/>
               </div>
                <div>
                    <CheckCircleIcon className={`h-6 w-6 text-white bg-green-500 hover:bg-green-600 rounded-full cursor-pointer`}/>
                </div>*/
