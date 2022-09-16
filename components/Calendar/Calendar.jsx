/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react'
import {meetings} from "../../dummyMeetings";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { add,
    addHours,
    addWeeks,
    eachDayOfInterval,
    eachWeekOfInterval,
    eachHourOfInterval,
    endOfMonth,
    endOfToday,
    format,
    addDays,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    startOfWeek,
    startOfMonth,
    subHours,
    endOfWeek,
} from "date-fns";
import dayjs from "dayjs";
import CustomerSearch from "../Pos/CustomerSearch";
import Month from "./Month";
import Week from "./Week"
import Day from './Day'
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

import {today, startDay, midnight, endDay, hours} from "../../Time";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Calendar = () => {

    const [showModal, setShowModal] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
    const [selectedDay, setSelectedDay] = useState(today)
    const [view, setView] = useState('Month View')
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    //const firstDayCurrentWeek = parse(startOfWeek(currentWeek), 'MMMM yyyy', new Date())



    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    const week = eachDayOfInterval({start: currentWeek, end: endOfWeek(currentWeek),
    })


    const nextMonth = () => {

        if(view === 'Month View'){
            const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
            setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
        }else if(view === 'Week View'){
            const firstDayNextWeek = addWeeks(currentWeek, 1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))

            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)
            //setCurrentWeek(format(firstDayNextWeek, 'MMMM dd yyyy'))
        }
    }

    const previousMonth = () => {
        if(view === 'Month View'){
            const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
            setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
        }else if(view === 'Week View'){
            const firstDayNextWeek = addWeeks(currentWeek, -1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))
            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)
        }
    }

    const handleToday = () => {
        if(view === 'Month View'){
            setCurrentMonth(format(today, 'MMMM yyyy'))
        }else if(view === 'Week View'){
            setCurrentWeek(startOfWeek(today))
            setCurrentMonth(format(today, 'MMMM yyyy'))
        }
    }

    return (
        <div className="lg:flex lg:h-screen lg:flex-col">
            <CustomerSearch showModal={showModal} setShowModal={setShowModal} />
            <header className="flex items-center justify-between border-b border-slate-200 py-4 px-6 lg:flex-none">
                <h1 className="text-lg font-semibold text-slate-900">
                    <time dateTime="2022-01">{format(firstDayCurrentMonth, 'MMMM yyyy')}</time>
                </h1>
                <div className="flex items-center">
                    <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                        <button
                            onClick={previousMonth}
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
                            onClick={nextMonth}
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
                                {view}
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
                                              <span onClick={()=>setView('Day View')}   className={classNames(
                                                  'text-slate-700 cursor-pointer',
                                                  'block px-4 py-2 text-sm' )}>
                                                   Day view
                                             </span>
                                        </Menu.Item>
                                        <Menu.Item>

                                             <span onClick={()=>setView('Week View')}   className={classNames(
                                                  'text-slate-700 cursor-pointer',
                                                 'block px-4 py-2 text-sm' )}>
                                                   Week view
                                             </span>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <span onClick={()=>setView('Month View')}   className={classNames(
                                                'text-slate-700 cursor-pointer',
                                                'block px-4 py-2 text-sm' )}>
                                                   Month view
                                             </span>
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
                            className="ml-6 rounded-md border border-transparent bg-blue-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
            {view === 'Month View' && <Month classNames={classNames} firstDayCurrentMonth={firstDayCurrentMonth}
                    colStartClasses={colStartClasses} selectedDay={selectedDay} setSelectedDay={setSelectedDay}
                    days={days}/>}
            {view === 'Week View' && <Week  classNames={classNames} firstDayCurrentMonth={firstDayCurrentMonth}
                    colStartClasses={colStartClasses} selectedDay={selectedDay} setSelectedDay={setSelectedDay}
                   week={week} hours={hours} days={days}/>}
            {view === 'Day View' && <Day  classNames={classNames} firstDayCurrentMonth={firstDayCurrentMonth}
                    colStartClasses={colStartClasses} selectedDay={selectedDay}hours={hours} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} setSelectedDay={setSelectedDay}
                    days={days}/>}
        </div>
    )
}
export default Calendar;
