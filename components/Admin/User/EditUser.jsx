import {useEffect, useState} from 'react';
import UserLayout from "./UserLayout";
import AccordionLayout from "../../Accordion/AccordionLayout";
import dayjs from "dayjs";
import EditUserLayout from "./EditUser/EditUserLayout";
import EditAddress from "./EditUser/EditAddress";

import EmergencyContact from "./EditUser/EmergencyContact";
import Employment from "./EditUser/Employment";
import EditPersonalInfo from './EditUser/EditPersonalInfo'
import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
const EditUser = ({user, agency}) => {
    const [data, setData] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [phone, setPhone] = useState(user.personal.phone)
    const [section, setSection] = useState('')
    const [agencyIndex, setAgencyIndex] = useState('')
    const [userType, setUserType] = useState([])
    const [inputs, setInputs] = useState({})
    const [isEmployee, setIsEmployee] = useState(false)
    const handleCertification = () => {

    }
    const handleChange = () => {

    }
console.log(isEmployee)
    return (
        <UserLayout user={user} editButton={false} >
            <div className={` flex flex-col gap-5 pt-5 mt-5`}>
                <div className={`flex relative  w-full mb-10`}>
                      <div className={`absolute w-full inset-0 ${activeIndex === 5 ? 'z-20' : 'z-10'}`}>
                          <AccordionLayout
                              title={`Edit User Image`}
                              bg={'bg-blue-500'}
                              mx={'mx-10'}
                              bodyMargin={'mx-10'}
                              text={'text-white'}
                              section={section}
                              index={5}
                              activeIndex={activeIndex}
                              setActiveIndex={setActiveIndex}

                          >

                              <EditUserLayout section={section} user={user}/>
                          </AccordionLayout>
                      </div>
                  </div>

                <div className='flex mb-10'>
                    <div className='relative w-1/2'>
                       <div className={`absolute w-full ${activeIndex === 1 ? 'z-20' : 'z-10'}`}>
                           <AccordionLayout
                               title='Edit Personal'
                               bg={'bg-blue-500'}
                               mx={'mx-10'}
                               bodyMargin={'mx-10'}
                               text={'text-white'}
                               section={section}
                               index={1}
                               activeIndex={activeIndex}
                               setActiveIndex={setActiveIndex}
                           >
                               <EditPersonalInfo user={user} handleChange={handleChange}/>

                           </AccordionLayout>
                       </div>
                    </div>
                    <div className={`relative w-1/2`}>
                        <div className={`absolute w-full ${activeIndex === 6 ? 'z-20' : 'z-10'}`}>
                            <AccordionLayout
                                title='Edit Address'
                                bg={'bg-blue-500'}
                                mx={'mx-10'}
                                bodyMargin={'mx-10'}
                                text={'text-white'}
                                index={6}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}>
                                <EditAddress user={user} handleChange={handleChange}/>
                            </AccordionLayout>
                        </div>
                    </div>
                </div>
                <div className={`flex mb-10`}>
                    <div className={`relative  w-1/2`}>
                       <div className={`absolute w-full ${activeIndex === 2 ? 'z-20' : 'z-10'}`}>
                           <AccordionLayout
                               title='Edit Emergency Contact'
                               bg={'bg-blue-500'}
                               mx={'mx-10'}
                               bodyMargin={'mx-10'}
                               text={'text-white'}
                               section={section}
                               index={2}
                               activeIndex={activeIndex}
                               setActiveIndex={setActiveIndex}
                           >
                               <EmergencyContact user={user}/>

                           </AccordionLayout>
                       </div>
                    </div>
                    <div className={`relative w-1/2`}>
                      <div className={`absolute w-full ${activeIndex === 4 ? 'z-20' : 'z-10'}`}>
                          <AccordionLayout
                              title={`Edit  Employment`}
                              bg={'bg-blue-500'}
                              mx={'mx-10'}
                              bodyMargin={'mx-10'}
                              text={'text-white'}

                              index={4}
                              activeIndex={activeIndex}
                              setActiveIndex={setActiveIndex}

                          >
                              <Employment onChange={()=>{
                                      setIsEmployee(!isEmployee)
                                      !userType.includes('employee') && !isEmployee && setUserType(prev=>[...prev, 'employee'])
                                      userType.includes('employee') && isEmployee  && setUserType(userType.slice(0,1))

                                  }} user={user}/>

                          </AccordionLayout>
                      </div>
                    </div>
                </div>
                <AccordionLayout
                    title='Certifications'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <div className={`flex flex-col  content-center my-5 mx-10 w-full`}>
                        <div className={`grid grid-cols-3 gap-5 items-center `}>

                            <div className={`flex flex-col gap-2 h-full`}>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Agency</label>
                                    <select className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="select"
                                            name='certificationAgency'

                                            onChange={handleCertification}

                                    >
                                        <option value=""></option>
                                        {agency.map((name, idx)=>(
                                            <option key={idx}  name='certificationAgency' value={name.name}>{name.name}</option>

                                        ))}
                                    </select>
                                </div>
                                <div className={`flex flex-col gap-1 `}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Diver Number</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"

                                           onChange={handleCertification}
                                    />
                                </div>

                            </div>
                            <div className={`flex flex-col gap-2 h-full`}>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Certification Date</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"

                                           onChange={handleCertification}/>
                                </div>
                                <div className={`flex flex-col gap-1`}>
                                    <label className={`text-slate-400 font-bold text-sm uppercase pl-1`} htmlFor="">Instructor</label>
                                    <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4`} type="text"

                                           onChange={handleCertification}/>
                                </div>
                            </div>

                            <div className={`flex flex-col gap-1 h-full`}>
                                <label className={`text-slate-400 font-bold text-sm uppercase pl-1 pb-2`} htmlFor="">Levels</label>
                                { agency[agency.findIndex(index => index.name === agencyIndex)]?.levels?.map((level,idx)=>(
                                    <div key={idx} className={`flex content-center justify-between w-full`}>
                                        <label className={`text-sm text-slate-400`} htmlFor="">{level}</label>
                                        <div className={`flex justify-end`}>
                                            <input className={`border border-slate-400 focus:outline-0 rounded text-sm p-1 w-3/4 items-start w-full`}
                                                   type="checkbox"
                                                   id={idx}
                                                   value={level}
                                                   {...register("certificationLevel")}
                                                   onClick={handleCertification}/>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                        <div className={`flex justify-center mt-10`}>
                            <button
                                onClick={()=>{
                                    setExperience(prev=>[...prev, {certAgency}])
                                    resetField('diverNumber')
                                    resetField('instructorNumber')
                                    resetField('certificationAgency')
                                    resetField('date')
                                    resetField("certificationLevel")
                                }}
                                className={`bg-green-500 rounded uppercase text-white font-bold text-sm py-1 px-2`}>
                                Submit Cert
                            </button>
                        </div>


                    </div>
                </AccordionLayout>




            </div>


        </UserLayout>
    );
};

export default EditUser;
