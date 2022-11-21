import {useState, useEffect} from 'react';


import AccordionLayout from "../../Accordion/AccordionLayout";
import dayjs from "dayjs";
import Link from "next/link";
import TableDisplay from "../../Table/TableDisplay";
import {certificationColumns, orderColumns} from "../../../tableData";
import UserCard from "./UserCard";
import TableActions from "../../Table/TableActions";
import 'react-phone-number-input/style.css'
import Input from 'react-phone-number-input/input'
import UserLayout from "./UserLayout";
import {ReceiptPercentIcon} from '@heroicons/react/24/outline'




const Index = ({user, orders, sales}) => {

    const [data, setData] = useState([])

    const [activeIndex, setActiveIndex] = useState(0);

    const [section, setSection] = useState('Recent Activity')

    const [diving, setDiving] = useState([]);
    const [phone, setPhone] = useState(user.personal.phone)



    useEffect(()=>{

        setDiving([])
        user.experience.map((cert)=>{

            setDiving((prev)=>[...prev, {
                id: cert._id,

                    number: cert.diverNumber,
                    agency: cert.certificationAgency,
                    date: dayjs(user.experience.date).format('DD MMM YYYY'),
                    instructor: cert.instructorNumber,
                    level: cert.certificationLevel[0],

            }])
        })


    },[user])

    useEffect(()=>{
        setData([])
        orders.reverse().map((option)=>{

            setData( (prev)=>[...prev, {
                id: option._id,

                    orderId: `${option._id.slice(0, 5)}...`,
                    date: dayjs(option.createdAt).format('DD MMM YYYY'),
                    quantity: option.items.length,
                    amount: `€${option.total.toFixed(2)}`,
                   icon: <div className={`flex w-full justify-center cursor-pointer`}> <ReceiptPercentIcon className={`h-6 w-6 text-green-500`}/></div>,
                    action: <TableActions key={option._id} link={`/admin/orders/`} item={option}/>

            }])



        })
    },[orders])

    const handleClick = (data) => {
        if(section !==data){
            setSection(data)
        }else{
            setSection('')
        }
    }
    return (

        <UserLayout user={user} editButton={true} deleteButton={true}>


            <div className=' flex items-center  justify-evenly mt-16 mb-5'>
                <div className='flex gap-2'>
                    <span className='uppercase text-slate-500 font-bold'>Active Since:</span>
                    <span>{dayjs(user.createdAt).format('DD MMM YYYY')}</span>
                </div>
                <div className='flex gap-2'>
                    <span  className='uppercase text-slate-500 font-bold'>Dive Number:</span>
                    <span> {user.experience[0]?.diverNumber}</span>
                </div>
            </div>
            <div className={`flex relative  w-full mb-10`}>
                <div className={`absolute w-full inset-0 ${activeIndex === 1 ? 'z-20' : 'z-10'}`}>
            <AccordionLayout
                title='Recent Activity'
                bg={'bg-blue-500'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                text={'text-white'}
                section={section}
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}

            >
                <div className='flex w-full justify-center'>
                    <UserCard data={sales} title={'Winkel'} orderCat={`Web-shop`} bg={'bg-[rgba(0,191,255,0.5)]'} box={true}/>
                    <UserCard data={sales} title={'Huur'} orderCat={`Te Huur`} bg={'bg-[rgba(255,255,0,0.5)]'} box={false}/>
                    <UserCard data={sales} title={'Cursus'} orderCat={`Cursus`} bg={'bg-[rgba(102,205,170,0.5)]'} box={false}/>
                    <UserCard  data={sales} title={'Service'} orderCat={`Service`} bg={'bg-[rgba(205,92,92,0.5)]'}  box={false}/>
                </div>
            </AccordionLayout>
                </div>
            </div>
            <div className='flex mb-10'>
                <div className={`relative w-1/2`}>
                    <div className={`absolute w-full ${activeIndex === 2 ? 'z-20' : 'z-10'}`}>
                    <AccordionLayout
                        title='Personal'
                        bg={'bg-blue-500'}
                        mx={'mx-10'}
                        bodyMargin={'mx-10'}
                        text={'text-white'}
                        section={section}
                        index={2}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    >
                        <div className='flex flex-col ml-5 xl:ml-10 gap-1 text-gray-500 text-xs md:text-sm xl:text-base'>
                            <div className='flex gap-10'>
                            <div className='flex flex-col gap-2'>
                                <span className='uppercase text-gray-500 font-bold'>username:</span>
                                <span className='uppercase text-gray-500 font-bold'>street:</span>
                                <span className='uppercase text-gray-500 font-bold'>City:</span>
                                <span className='uppercase text-gray-500 font-bold'>Country:</span>
                                <span className='uppercase text-gray-500 font-bold'>email:</span>
                                <span className='uppercase text-gray-500 font-bold'>phone:</span>
                                <span className='uppercase text-gray-500 font-bold'>birthday:</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span>{user.personal.username}</span>
                                <span>{user.address.address}</span>
                                <span>{user.address.city}{' '}{user.address.postalCode}</span>
                                <span>{user.address.country}</span>
                                <span>{user.personal.email}</span>

                                <Input className={`bg-white placeholder:text-sm`}
                                            disabled
                                            style={{border: 'none', padding: '0'}}
                                            defaultCountry={user.address.country}
                                            value={phone}
                                            />
                                <span>{dayjs(user.personal.dob).format('DD MMM YYYY')}</span>
                            </div>
                            </div>
                        </div>
                    </AccordionLayout>
                    </div>
                </div>


            <div className={`relative w-1/2`}>
                <div className={`absolute w-full ${activeIndex === 4 ? 'z-20' : 'z-10'}`}>
                    <AccordionLayout
                        title='Emergency Contact'
                        bg={'bg-blue-500'}
                        mx={'mx-10'}
                        bodyMargin={'mx-10'}
                        text={'text-white'}
                        section={section}
                        index={4}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    >
                        <div className='flex flex-col ml-5 xl:ml-10 gap-1 text-gray-500 text-xs md:text-sm xl:text-base'>
                            <div className='flex gap-10'>
                                <div className='flex flex-col gap-2'>
                                    <span className='uppercase text-gray-500 font-bold'>voornam:</span>
                                    <span className='uppercase text-gray-500 font-bold'>acternaam:</span>
                                    <span className='uppercase text-gray-500 font-bold'>email:</span>
                                    <span className='uppercase text-gray-500 font-bold'>phone:</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <span>{user.emergencyContact.firstName}</span>
                                    <span>{user.emergencyContact.lastName}</span>
                                    <span>{user.emergencyContact.email}</span>
                                    <span>{user.emergencyContact.phone}</span>
                                </div>
                            </div>
                        </div>
                    </AccordionLayout>


                </div>
            </div>
            </div>
            <div className={`flex relative  w-full mb-10`}>
                <div className={`absolute w-full inset-0 ${activeIndex === 3 ? 'z-20' : 'z-10'}`}>
            <AccordionLayout
                title='certifications'
                bg={'bg-blue-500'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                text={'text-white'}
                section={section}
                index={3}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}

            >
                <TableDisplay PageSize={5} tableTitle={false} rows={diving} columns={certificationColumns}
                              showButton={true} action={true}/>

            </AccordionLayout>
                </div>
            </div>
            <div className={`flex relative  w-full mb-10`}>
                <div className={`absolute w-full inset-0 ${activeIndex === 5 ? 'z-20' : 'z-10'}`}>

            <AccordionLayout
                title='Purchase History'
                bg={'bg-blue-500'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                text={'text-white'}
                section={section}
                index={5}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                <TableDisplay PageSize={5} tableTitle={false} rows={data} title={'Order'} columns={orderColumns}
                              showButton={true} action={true}  link={`/admin/orders/`}/>
            </AccordionLayout>
                </div>
            </div>
            {user.isEmployee &&
                <div className={`relative w-1/2`}>
                    <div className={`absolute w-full ${activeIndex === 6 ? 'z-20' : 'z-10'}`}>
                <AccordionLayout
                    title='Employee Info'
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}
                    section={section}
                    index={6}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <div className='flex flex-col ml-5 xl:ml-10 gap-1 text-gray-500 text-xs md:text-sm xl:text-base'>
                        <div className='flex gap-10 '>
                            <div className='flex flex-col gap-2'>
                                <span className='uppercase text-gray-500 font-bold'>position:</span>
                                <span className='uppercase text-gray-500 font-bold'>hire date:</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span>{user.employeeInfo.position}</span>
                                <span>{dayjs(user.employeeInfo.hireDate).format('DD MMM YYYY')}</span>
                            </div>
                        </div>
                    </div>
                </AccordionLayout>
            </div>
                </div>
            }

        </UserLayout>

    );
};

export default Index;

