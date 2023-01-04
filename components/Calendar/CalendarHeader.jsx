import { Fragment, useEffect, useRef, useState } from 'react'
import {useRouter} from "next/router";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import {
    add, addDays,
    addWeeks,
    eachDayOfInterval, endOfMonth, endOfWeek,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isSameDay,

    isToday,
    setDay,
    parse, parseISO,
    startOfWeek, getHours, startOfToday
} from "date-fns";
import { es, ru, nl } from 'date-fns/locale'
import { zonedTimeToUtc } from 'date-fns-tz'

import {startDay, today, colStartClasses, hours, currentMinute} from "../../Time";
import CustomerSearch from "../Admin/Pos/CustomerSearch";
import Link from "next/link";
import Schedule from "./Schedule";
import {calendarOption} from "../../calData";
import Loader from "../icons/Loader";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const CalendarHeader = (props) => {
    const {viewSelector,
        showModal,
        setShowModal,
        currentMonth,
        setCurrentMonth,
        currentWeek,
        setCurrentWeek,
        selectedDay,
        setSelectedDay
            } = props;

    const router = useRouter()
    const {query} = router
    //const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    //const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
   //const [selectedDay, setSelectedDay] = useState(zonedTimeToUtc(startDay, 'Europe/Berlin'))
    const [dailyView, setDailyView] = useState(startDay)
    const [selected, setSelected] = useState(calendarOption[0])
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)



    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())



    const handleNext = () => {

        if(viewSelector[0] === 'monthly'){
            const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
            setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
        }else if(viewSelector[0] === 'weekly'){
            const firstDayNextWeek = addWeeks(currentWeek, 1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))

            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)
        }else if(viewSelector[0] === 'daily'){
            const nextDay = addDays(selectedDay, 1)
            const newMonth = (format(nextDay, 'MMMM yyyy'))
            setSelectedDay(nextDay)
            setCurrentMonth(newMonth)
        }

    }

    const handlePrevious = () => {
        if(viewSelector[0] === 'monthly'){
            const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
            setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
        }else if(viewSelector[0] === 'weekly'){
            const firstDayNextWeek = addWeeks(currentWeek, -1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))
            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)
        }else if(viewSelector[0] === 'daily'){
            const nextDay = addDays(selectedDay, -1)
            const newMonth = (format(nextDay, 'MMMM yyyy'))
            setSelectedDay(nextDay)
            setCurrentMonth(newMonth)
        }
    }
    const handleToday = () => {
        setCurrentMonth(format(today, 'MMMM yyyy'))
        if(viewSelector[0] === 'weekly'){
            setCurrentWeek(startOfWeek(today))

        }else if(viewSelector[0] === 'daily'){
            setSelectedDay(startDay)
        }
    }


    return (
        <header className="flex items-center justify-between border-b border-slate-200 py-4 px-6 lg:flex-none">
            <div>
                <h1 className="text-lg font-semibold leading-6 text-gray-900">
                    {viewSelector[0] === 'monthly' ?

                           <time dateTime="2022-01">{format(firstDayCurrentMonth, 'MMMM yyyy')}</time>
                           : viewSelector[0] === 'weekly' ?   <time dateTime="2022-01">{format(firstDayCurrentMonth, 'MMMM yyyy')}</time>
                            : <>
                            <time dateTime="2022-01-22" className="sm:hidden">
                           {format(selectedDay, 'MMMM dd, yyyy')}
                       </time>
                           <time dateTime="2022-01-22" className="hidden sm:inline">
                               {format(selectedDay, 'MMMM dd, yyyy')}
                           </time>
                       </>
                    }
                </h1>
                {viewSelector[0] === 'daily' && <p className="mt-1 text-sm text-gray-500"> {format(selectedDay, 'EEEE')}</p>}
            </div>
            <div className="flex items-center">
                <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                    <button
                        onClick={handlePrevious}
                        type="button"
                        className="flex items-center justify-center rounded-l-md border border-r-0 border-slate-300 bg-white py-2 pl-3 pr-4 text-slate-400 hover:text-slate-500 focus:relative md:w-9 md:px-2 md:hover:bg-slate-50"
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                        onClick={handleToday}
                        type="button"
                        className="hidden border-t border-b border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:relative md:block"
                    >
                        Today
                    </button>
                    <span className="relative -mx-px h-5 w-px bg-slate-300 md:hidden" />
                    <button
                        onClick={handleNext}
                        type="button"
                        className="flex items-center justify-center rounded-r-md border border-l-0 border-slate-300 bg-white py-2 pl-4 pr-3 text-slate-400 hover:text-slate-500 focus:relative md:w-9 md:px-2 md:hover:bg-slate-50"
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:items-center">
                    <Menu as="div" className="relative">
                        <Menu.Button
                            type="button"
                            className="flex items-center rounded-md border border-slate-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                        >

                                {viewSelector[0].charAt(0).toUpperCase() + viewSelector[0].slice(1)} View


                            <ChevronDownIcon className="ml-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    <Menu.Item>
                                        <Link href={`/admin/calendar/daily/${viewSelector[1]}`}>
                                              <span  className={classNames(
                                                  'text-slate-700 cursor-pointer',
                                                  'block px-4 py-2 text-sm' )}>
                                                   Daily view
                                             </span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link href={`/admin/calendar/weekly/${viewSelector[1]}`}>
                                             <span    className={classNames(
                                                 'text-slate-700 cursor-pointer',
                                                 'block px-4 py-2 text-sm' )}>
                                                   Weekly view
                                             </span>
                                        </Link>

                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link href={`/admin/calendar/monthly/${viewSelector[1]}`}>
                                            <span    className={classNames(
                                                'text-slate-700 cursor-pointer',
                                                'block px-4 py-2 text-sm' )}>
                                                   Monthly view
                                             </span>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="components/Calendar/Calendar#"
                                                className={classNames(
                                                    active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                Year view
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <div className="ml-6 h-6 w-px bg-slate-300" />
                    <button
                        onClick={()=>setShowModal(true)}
                        type="button"
                        className="ml-6 rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none "
                    >
                        Add meeting
                    </button>
                </div>
                <Menu as="div" className="relative ml-6 md:hidden">
                    <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-slate-400 hover:text-slate-500">
                        <span className="sr-only">Open menu</span>
                        <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-slate-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Create meeting
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Go to today
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Day view
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Week view
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Month view
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item >
                                    {({ active }) => (
                                        <a
                                            href="components/Calendar/Calendar#"
                                            className={classNames(
                                                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            Year view
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    );
};

export default CalendarHeader;
