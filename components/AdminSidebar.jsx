import {useState, forwardRef} from 'react';
import logo from "../public/img/headerlogo.svg"
import Image from "next/image";
import Link from "next/link";
import Dashboard from "./icons/Dashboard";
import School from "./icons/School";
import Danger from "./icons/Danger";
import Timer from "./icons/Timer";
import Calendar from "./icons/Calendar";
import TrendingUp from "./icons/TrendingUp";
import { WrenchIcon, AcademicCapIcon, ClockIcon, CalendarDaysIcon} from '@heroicons/react/24/outline'
import AccordionLayout from "./Accordion/AccordionLayout";
import Person from "./icons/Person";
import Employee from "./icons/Employee";
import Product from "./icons/Product";
import Payment from "./icons/Payment";
import Exit from "./icons/Exit";
import Profile from "./icons/Profile";
import Web from "./icons/Web";
import Rental from "./icons/Rental";
const AdminSidebar = () => {
    //const ref = forwardRef()
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <div className={'min-h-screen flex flex-col  w-72 lg:w-40 border-r border-slate-200  text-center bg-slate-200/70'}>
            <div className={'flex items-center justify-center h-16 border-b border-slate-200 cursor-pointer mb-5 bg-white'}>
                <Link href="/" >
                    <a>
                        <Image src={logo} alt="" height={100} width={130}  objectFit="contain"/>
                    </a>
                </Link>
            </div>
            <div className={'flex flex-col gap-5 '}>
                <AccordionLayout
                    title={`main`}
                    bg={'bg-slate-400'}
                    mx={'mx-2'}
                    bodyMargin={'mx-2'}
                    text={'text-white'}
                    index={0}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Dashboard/>
                                dashboard
                            </li>
                        </Link>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Profile/>
                            Profile
                        </li>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Exit/>
                            logout
                        </li>

                    </ul>
                </AccordionLayout>
                <AccordionLayout
                    title={`Messages`}
                    bg={'bg-slate-400'}
                    mx={'mx-2'}
                    bodyMargin={'mx-2'}
                    text={'text-white'}
                    index={5}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin/messages" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <CalendarDaysIcon className={`h-6 w-6 `}/>
                                Alles
                            </li>
                        </Link>
                        <Link href="/admin/messages/cursus" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <AcademicCapIcon  className={`h-6 w-6 `}/>
                                Cursus
                            </li>
                        </Link>
                        <Link href="/admin/messages/tehuur" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <ClockIcon className={`h-6 w-6 `}/>
                                Rental
                            </li>
                        </Link>
                        <Link href="/admin/messages/service" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <WrenchIcon className={`h-6 w-6 `}/>
                                Service
                            </li>
                        </Link>

                    </ul>

                </AccordionLayout>
                <AccordionLayout
                    title={`calendar`}
                    bg={'bg-slate-400'}
                    mx={'mx-2'}
                    bodyMargin={'mx-2'}
                    text={'text-white'}
                    index={1}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin/calendar/monthly/alles" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Calendar/>
                                Alles
                            </li>
                        </Link>
                        <Link href="/admin/calendar/monthly/cursus" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <AcademicCapIcon  className={`h-6 w-6 `}/>
                                Cursus
                            </li>
                        </Link>
                        <Link href="/admin/calendar/monthly/service" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <WrenchIcon className={`h-6 w-6 `}/>
                                Service
                            </li>
                        </Link>
                        <Link href="/admin/calendar/monthly/tehuur" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <ClockIcon className={`h-6 w-6 `}/>
                                Rental
                            </li>
                        </Link>
                    </ul>

                </AccordionLayout>
                <AccordionLayout
                    title={`nieuw`}
                    bg={'bg-slate-400'}
                    bodyMargin={'mx-2'}
                    mx={'mx-2'}
                    text={'text-white'}
                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin/store" >
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <TrendingUp/>
                                Sale
                            </li>
                        </Link>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <School/>
                            Invoice
                        </li>
                        <Link href={`/admin/users/user/new`}>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Dashboard/>
                                User
                            </li>
                        </Link>
                        <Link href={`/admin/products/new`}>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Dashboard/>
                                Product
                            </li>
                        </Link>

                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Dashboard/>
                            dashboard
                        </li>
                        <Link href="/admin/rental_equipment/new" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Rental/>
                                Rentals
                            </li>
                        </Link>
                    </ul>

                </AccordionLayout>
                <AccordionLayout
                    title={`lists`}
                    bg={'bg-slate-400'}
                    mx={'mx-2'}
                    bodyMargin={'mx-2'}
                    text={'text-white'}
                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin/store" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <TrendingUp/>
                                Sales
                            </li>
                        </Link>
                        <Link href="/admin/users/customer" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Person/>
                                Customers
                            </li>
                        </Link>
                        <Link href="/admin/users/employee" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Employee/>
                                Employees
                            </li>
                        </Link>
                        <Link href="/admin/products" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Product/>
                                Products
                            </li>
                        </Link>
                        <Link href="/admin/orders" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Payment/>
                                Orders
                            </li>
                        </Link>
                        <Link href="/admin/rental_equipment" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Rental/>
                                Rentals
                            </li>
                        </Link>
                    </ul>
                </AccordionLayout>

                <AccordionLayout
                    title={`settings`}
                    bg={'bg-slate-400'}
                    mx={'mx-2'}
                    bodyMargin={'mx-2'}
                    text={'text-white'}
                    index={4}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <ul className={'uppercase text-slate-400 text-xs  mx-2 pb-2 flex flex-col gap-3 '}>
                        <Link href="/admin/site" passHref>
                            <li className={'flex gap-2 items-center cursor-pointer '}>
                                <Web/>
                                Site
                            </li>
                        </Link>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <School/>
                            Profile
                        </li>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Dashboard/>
                            Service
                        </li>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Dashboard/>
                            Rental
                        </li>
                        <li className={'flex gap-2 items-center cursor-pointer '}>
                            <Dashboard/>
                            dashboard
                        </li>
                    </ul>
                </AccordionLayout>





            </div>


        </div>
    );
};

export default AdminSidebar;
