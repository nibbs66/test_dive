import {useState, useEffect, Fragment} from 'react';
import {useRouter} from "next/router";
import {
    add, addWeeks,
    eachDayOfInterval, endOfMonth, endOfWeek,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfWeek
} from "date-fns";
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
import {meetings} from "../../dummyMeetings";
import { Menu, Transition } from '@headlessui/react'
import CustomerSearch from "../Pos/CustomerSearch";
import {startDay, today, colStartClasses, } from "../../Time";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Month = ({schedules, toShow}) => {
    const [showModal, setShowModal] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
    const [selectedDay, setSelectedDay] = useState(today)
    const [view, setView] = useState('Month View')
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    //const firstDayCurrentWeek = parse(startOfWeek(currentWeek), 'MMMM yyyy', new Date())
    const router = useRouter()
    const {query} = router
 const newSched = schedules.slice(0, 2)
//console.log(newSched)

    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
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

            <header className="flex items-center justify-between border-b border-slate-200 py-4 px-6 lg:flex-none">
                <h1 className="text-lg font-semibold text-slate-900">
                    <time dateTime="2022-01">{format(firstDayCurrentMonth, 'MMMM  yyyy')}</time>
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
                                Month View
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
                                            <Link href={`/admin/calendar/daily/${query.id}`}>
                                              <span onClick={()=>setView('Day View')}   className={classNames(
                                                  'text-slate-700 cursor-pointer',
                                                  'block px-4 py-2 text-sm' )}>
                                                   Day view
                                             </span>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href={`/admin/calendar/weekly/${query.id}`}>
                                                <span   className={classNames(
                                                'text-slate-700 cursor-pointer',
                                                'block px-4 py-2 text-sm' )}>
                                                   Week view
                                             </span>

                                            </Link>

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
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div className="grid grid-cols-7 gap-px border-b border-slate-300 bg-slate-200 text-center text-xs font-semibold leading-6 text-slate-700 lg:flex-none">
                <div className="bg-white py-2">
                    S<span className="sr-only sm:not-sr-only">un</span>
                </div>
                <div className="bg-white py-2">
                    M<span className="sr-only sm:not-sr-only">on</span>
                </div>
                <div className="bg-white py-2">
                    T<span className="sr-only sm:not-sr-only">ue</span>
                </div>
                <div className="bg-white py-2">
                    W<span className="sr-only sm:not-sr-only">ed</span>
                </div>
                <div className="bg-white py-2">
                    T<span className="sr-only sm:not-sr-only">hu</span>
                </div>
                <div className="bg-white py-2">
                    F<span className="sr-only sm:not-sr-only">ri</span>
                </div>
                <div className="bg-white py-2">
                    S<span className="sr-only sm:not-sr-only">at</span>
                </div>

            </div>
            <div className="flex  text-xs leading-6 text-slate-700 lg:flex-auto">
                <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 ">
                    {days.map((day, dayIdx) => (
                        <div
                            onClick={()=>setSelectedDay(day)}
                            key={day.toString()}
                            className={classNames(
                                dayIdx > 0 && 'border border-slate-200',
                                dayIdx === 0 && colStartClasses[getDay(day)],
                                isSameMonth(day, firstDayCurrentMonth) ? 'bg-white  font-bold ' : 'bg-slate-100 text-slate-500',
                                'relative py-2 px-3 hover:bg-slate-100'
                            )}
                        >
                            <time

                                dateTime={format(day, 'yyyy-MM-dd')}
                                className={
                                    isToday(day)
                                        ? 'flex h-8 w-8 items-center justify-center rounded-full  bg-indigo-600 font-bold text-white'
                                        : 'flex h-6 w-6 items-center justify-center'

                                }
                            >
                                <span className={`cursor-pointer`}>  {format(day, 'd')}</span>
                            </time>
                            {
                                schedules.length > 0 && (
                                    <ol className="mt-2">
                                        {schedules.filter(meeting=>isSameDay(parseISO(meeting.startTime), day)).slice(0,2).map((meeting)=>
                                            isSameDay(parseISO(meeting.startTime), day)  &&
                                            <li key={meeting._id}   className={`cursor-pointer`}>
                                                <a href={meeting.href} className="group flex items-center gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                    <p className="flex-auto truncate font-medium text-slate-900 group-hover:text-indigo-600">
                                                        {format(parseISO(meeting.startTime, new Date()), 'EE')}{schedules.length}
                                                    </p>

                                                    <time
                                                        dateTime={meeting.startTime}
                                                        className="cursor-pointer ml-3 hidden flex-none text-slate-500 group-hover:text-indigo-600 xl:block"
                                                    >

                                                        {format(parseISO(meeting.startTime, new Date()), 'h b')}
                                                    </time>
                                                </a>
                                            </li>
                                        )}

                                        {schedules.filter(meeting=>isSameDay(parseISO(meeting.startTime), day)).length > 2 &&
                                            <li className="text-slate-500">+ {schedules.filter(meeting=>isSameDay(parseISO(meeting.startTime), day)).length - 2} more</li>}
                                    </ol>
                                )
                            }
                        </div>
                    ))}
                </div>
                <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden ">
                    {days.map((day,dayIdx) => (
                        <button
                            key={day.toString()}
                            type="button"
                            onClick={()=>setSelectedDay(day)}
                            className={classNames(
                                dayIdx > 6 && 'border-t border-slate-200',
                                dayIdx === 0 && colStartClasses[getDay(day)],

                                isSameMonth(day, firstDayCurrentMonth) ? 'bg-white' : 'bg-slate-50',
                                (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                isEqual(day, selectedDay) && 'text-white',
                                !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600',
                                !isEqual(day, selectedDay) && isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-slate-900',
                                !isEqual(day, selectedDay) && !isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-slate-500',
                                'flex h-14 flex-col py-2 px-3 hover:bg-slate-100 focus:z-10'
                            )}
                        >
                            <time
                                dateTime={format(day, 'yyyy-MM-dd')}
                                className={classNames(
                                    isEqual(day, selectedDay) && 'flex h-6 w-6 items-center justify-center rounded-full',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                                    isEqual(day, selectedDay) && !isToday(day) &&
                                    'ml-auto'
                                )}
                            >
                                {format(day, 'd')}
                            </time>
                            {/*<span className="sr-only">{day.schedules.length} schedules</span>*/}
                            {/*{
                                    day.schedules.length > 0 && (
                                        <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.schedules.map((meeting) => (
                        <span key={meeting.id} className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-slate-400"/>
                    ))}
                  </span>
                                    )
                                }*/}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        </div>
    );
};

export default Month;
{/*{selectedDay?.schedules.length > 0 && (
                <div className="py-10 px-4 sm:px-6 lg:hidden">
                    <ol className="divide-y divide-slate-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                        {selectedDay.schedules.map((meeting) => (
                            <li key={meeting.id} className="group flex p-4 pr-6 focus-within:bg-slate-50 hover:bg-slate-50">
                                <div className="flex-auto">
                                    <p className="font-semibold text-slate-900">{meeting.name}</p>
                                    <time dateTime={meeting.datetime} className="mt-2 flex items-center text-slate-700">
                                        <ClockIcon className="mr-2 h-5 w-5 text-slate-400" aria-hidden="true"/>
                                        {meeting.time}
                                    </time>
                                </div>
                                <a
                                    href={meeting.href}
                                    className="ml-6 flex-none self-center rounded-md border border-slate-300 bg-white py-2 px-3 font-semibold text-slate-700 opacity-0 shadow-sm hover:bg-slate-50 focus:opacity-100 group-hover:opacity-100"
                                >
                                    Edit<span className="sr-only">, {meeting.name}</span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>
            )}*/}
