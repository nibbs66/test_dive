/* This example requires Tailwind CSS v2.0+ */
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
    parse, parseISO,
    startOfWeek, getHours
} from "date-fns";

import {startDay, today, colStartClasses, hours, currentMinute} from "../../Time";
import CustomerSearch from "../Admin/Pos/CustomerSearch";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Day = ({schedules}) => {
    const router = useRouter()
    const {query} = router
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
    const [selectedDay, setSelectedDay] = useState(startDay)
    const [dailyView, setDailyView] = useState(startDay)
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    useEffect(() => {
        // Set the container scroll position based on the current time.

        container.current.scrollTop =
            ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
                (currentMinute - 300)) /
            1440
    }, [])
console.log(today)
    const handleNext = (timeFrame) => {

            if(timeFrame === 'month'){
                const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
                setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
            }else if(timeFrame === 'day'){
                const nextDay = addDays(selectedDay, 1)
                setSelectedDay(nextDay)
            }

    }

    const handlePrevious = (timeFrame) => {
        if(timeFrame === 'month'){
            const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
            setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
        }else if(timeFrame === 'day'){
            const nextDay = addDays(selectedDay, -1)
            setSelectedDay(nextDay)
        }



    }
    const handleToday = () => {

        setSelectedDay(startDay)

    }
console.log(selectedDay)
    return (
        <div className="lg:flex lg:h-screen lg:flex-col">
            <CustomerSearch showModal={showModal} setShowModal={setShowModal} />
            <header className="flex items-center justify-between border-b border-slate-200 py-4 px-6 lg:flex-none">
                <div>
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">
                        <time dateTime="2022-01-22" className="sm:hidden">
                            {format(selectedDay, 'MMMM dd, yyyy')}
                        </time>
                        <time dateTime="2022-01-22" className="hidden sm:inline">
                            {format(selectedDay, 'MMMM dd, yyyy')}
                        </time>
                    </h1>
                    <p className="mt-1 text-sm text-gray-500"> {format(selectedDay, 'EEEE')}</p>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center rounded-md shadow-sm md:items-stretch">
                        <button
                            onClick={()=>handlePrevious('day')}
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
                            onClick={()=>handleNext('day')}
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
                                Day View
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
                                            <Link href={`/admin/calendar/weekly/${query.id}`}>
                                             <span   className={classNames(
                                                 'text-slate-700 cursor-pointer',
                                                 'block px-4 py-2 text-sm' )}>
                                                   Week view
                                             </span>
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Link href={`/admin/calendar/monthly/${query.id}`}>
                                            <span    className={classNames(
                                                'text-slate-700 cursor-pointer',
                                                'block px-4 py-2 text-sm' )}>
                                                   Month view
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

            <div className="isolate flex flex-auto overflow-hidden bg-white">
                <div ref={container} className="flex flex-auto flex-col overflow-auto">
                    <div
                        ref={containerNav}
                        className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black ring-opacity-5 md:hidden"
                    >
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>W</span>
                            {/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                19
              </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>T</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-indigo-600">
                20
              </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>F</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                21
              </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>S</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">
                22
              </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>S</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                23
              </span>
                        </button>
                        <button type="button" className="flex flex-col items-center pt-3 pb-1.5">
                            <span>M</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                24
              </span>
                        </button>
                        <button type="button" className="flex  flex-col items-center pt-3 pb-1.5">
                            <span>T</span>
                            <span className="mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
                25
              </span>
                        </button>
                    </div>
                    <div className="flex w-full flex-auto">
                        <div className="w-14 flex-none bg-white ring-1 ring-slate-200" />
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

                            {/* Events */}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            >
                                {schedules.map((meeting, meetingIdx)=>(
                                    isSameDay(parseISO(meeting.startTime), selectedDay)  &&
                                    <li key={meetingIdx}  className=" w-full justify-center mt-px flex"
                                        style={{ gridRow: `${( (getHours(new Date(meeting.startTime)))-5) * 12 + 2} / span 12` }}
                                    >
                                        <a
                                            href="#"
                                            className="  overflow-y-auto rounded bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
                                        >
                                            <p>
                                                {format(parseISO(meeting.startTime, new Date()), 'MMMM dd yyyy')}
                                            </p>

                                        </a>
                                    </li>
                                ))}

                            </ol>
                        </div>
                    </div>
                </div>
                <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
                    <div className="flex items-center text-center text-gray-900">
                        <button
                            onClick={()=>handlePrevious('month')}
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span  className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-auto font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
                        <button
                            onClick={()=>handleNext('month')}
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>

                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                onClick={()=>setSelectedDay(day)}
                                key={day.toString()}
                                type="button"
                                className={classNames(
                                    dayIdx === 0 && colStartClasses[getDay(day)],
                                    'py-1.5 hover:bg-gray-100 focus:z-10',
                                    isSameMonth(day, firstDayCurrentMonth)? 'bg-white' : 'bg-gray-50',
                                    (isEqual(day, selectedDay) || isToday(day)) && 'font-bold',
                                    isEqual(day, selectedDay) && 'text-white font-bold',
                                    !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600 ',
                                    !isEqual(day, selectedDay) && isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-slate-900',
                                    !isEqual(day, selectedDay) && !isSameMonth(day, firstDayCurrentMonth) && !isToday(day) && 'text-slate-500',
                                    dayIdx === 0 && 'rounded-tl-lg',
                                    dayIdx === 6 && 'rounded-tr-lg',
                                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                                    dayIdx === days.length - 1 && 'rounded-br-lg'
                                )}
                            >
                                <time
                                    dateTime={format(day, 'yyyy-MM-dd')}
                                    className={classNames(
                                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                        isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                                        isEqual(day, selectedDay) && !isToday(day) && 'bg-slate-900',
                                    )}
                                >
                                    {format(day, 'd')}
                                </time>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Day;
