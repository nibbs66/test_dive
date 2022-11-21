import {useState, Fragment, useEffect, useRef} from 'react';
import {useRouter} from "next/router";
import {
    add, addWeeks,
    eachDayOfInterval, endOfMonth, endOfWeek,
    format,
    getDay,
    getHours,
    isEqual,
    isSameDay,
    isSameMonth,
    isSameWeek,
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
import CustomerSearch from "../Admin/Pos/CustomerSearch";
import {startDay, today, colStartClasses, hours, currentMinute} from "../../Time";
import Link from "next/link";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Week = ({schedules}) => {
    const router = useRouter()
    const {query} = router
    const [showModal, setShowModal] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
    const [selectedDay, setSelectedDay] = useState(today)
    const [View, setView] = useState('Month View')
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    //const firstDayCurrentWeek = parse(startOfWeek(currentWeek), 'MMMM yyyy', new Date())

    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)
    //console.log(((getHours(new Date(schedules[2].startTime)))-5)* 13 +1)
    const result = getDay(new Date(schedules[1].startTime))
    console.log(currentWeek)
    useEffect(() => {
        // Set the container scroll position based on the current time.
        container.current.scrollTop =
            ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
                (currentMinute - 300)) /
            1440
    }, [])
    const week = eachDayOfInterval({start: currentWeek, end: endOfWeek(currentWeek),
    })
//console.log(week)
    const nextWeek = () => {


            const firstDayNextWeek = addWeeks(currentWeek, 1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))

            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)
            //setCurrentWeek(format(firstDayNextWeek, 'MMMM dd yyyy'))

    }

    const previousWeek = () => {

            const firstDayNextWeek = addWeeks(currentWeek, -1)
            const newMonth = (format(firstDayNextWeek, 'MMMM yyyy'))
            setCurrentWeek(firstDayNextWeek)
            setCurrentMonth(newMonth)

    }

    const handleToday = () => {

            setCurrentWeek(startOfWeek(today))
            setCurrentMonth(format(today, 'MMMM yyyy'))

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
                            onClick={previousWeek}
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
                            onClick={nextWeek}
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
                               Week View
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
                                              <span    className={classNames(
                                                  'text-slate-700 cursor-pointer',
                                                  'block px-4 py-2 text-sm' )}>
                                                   Day View
                                             </span>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>

                                             <span onClick={()=>setView('Week View')}   className={classNames(
                                                 'text-slate-700 cursor-pointer',
                                                 'block px-4 py-2 text-sm' )}>
                                                   Week View
                                             </span>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href={`/admin/calendar/monthly/${query.id}`}>
                                            <span    className={classNames(
                                                'text-slate-700 cursor-pointer',
                                                'block px-4 py-2 text-sm' )}>
                                                   Month View
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
                                                    Year View
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
                                                Day View
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
                                                Week View
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
                                                Month View
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
                                                Year View
                                            </a>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </header>
            <div ref={container} className="isolate flex flex-auto flex-col overflow-auto bg-white">
                <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                    <div
                        ref={containerNav}
                        className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
                    >
                        <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">

                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">16</span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                M <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">10</span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">11</span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                W{' '}
                                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
                  12
                </span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                T <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">13</span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                F <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">14</span>
                            </button>
                            <button type="button" className="flex flex-col items-center pt-2 pb-3">
                                S <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">15</span>
                            </button>

                        </div>

                        <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                            <div className="col-end-1 w-14" />
                            {week.map((weekDay, dayIdx)=>(

                                <div key={dayIdx} className="flex items-center justify-center py-3 gap-2">
                <span>
                  {format(weekDay, 'EE')}</span> <span   className={
                                    isToday(weekDay)
                                        ? 'flex h-8 w-8 items-center justify-center rounded-full  bg-indigo-600 font-bold text-white'
                                        : null

                                }>{format(weekDay, 'd')}</span>

                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-auto">
                        <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
                        <div className="grid flex w-full grid-cols-1 grid-rows-1">
                            {/* Horizontal lines */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-slate-100"
                                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
                            >
                                <div ref={containerOffset} className="row-end-1 h-7"></div>
                                {hours.map((time, timeIdx)=>(
                                    <>
                                        <div key={timeIdx}>

                                            <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                                {format(time, 'h b')}
                                            </div>
                                        </div>
                                        <div />
                                    </>
                                ))}
                            </div>


                            {/* Vertical lines */}
                            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
                                <div className="col-start-1 row-span-full" />
                                <div className="col-start-2 row-span-full" />
                                <div className="col-start-3 row-span-full" />
                                <div className="col-start-4 row-span-full" />
                                <div className="col-start-5 row-span-full" />
                                <div className="col-start-6 row-span-full" />
                                <div className="col-start-7 row-span-full" />
                                <div className="col-start-8 row-span-full w-8" />
                            </div>

                            {/* Events */}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
                                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            >

                                {schedules.map((meeting,dayIdx)=>
                                isSameWeek(parseISO(meeting.startTime), currentWeek) &&

                                       <li key={dayIdx} className={classNames(

                                           "text-slate-400 group-hover:text-indigo-600  mt-px flex w-full "
                                       )} style={{ gridRow: `${( (getHours(new Date(meeting.startTime)))-5) * 12 + 2} / span 12`, gridColumnStart: `${getDay(new Date(meeting.startTime)) + 1}`  }}>
                                           <a href={meeting.href} className=" overflow-y-auto flex bg-blue-50 p-2 text-xs leading-5 rounded-lg ">

                                               <p >
                                                   {format(parseISO(meeting.startTime, new Date()), 'MMMM dd yyyy')}
                                               </p>

                                           </a>
                                       </li>

                                )}


                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Week;

