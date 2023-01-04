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
import Schedule from "./Schedule";
import {calendarOption} from "../../calData";
import CalendarView from "./CalendarView";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Day = ({schedules, cursus, viewSelector}) => {

    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [selectedDay, setSelectedDay] = useState(startDay)
    const container = useRef(null)
    const containerNav = useRef(null)
    const containerOffset = useRef(null)

    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    useEffect(() => {
        // Set the container scroll position based on the current time.
        container.current.scrollTop =
            ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
                (currentMinute)) /
            1440
    }, [])

    const handleNext = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
    }

    const handlePrevious = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMMM yyyy'))
    }

    return (
        <CalendarView cursus={cursus} viewSelector={viewSelector} selectedDay={selectedDay} setSelectedDay={setSelectedDay} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}>

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
                            onClick={handlePrevious}
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span  className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <div className="flex-auto font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
                        <button
                            onClick={handleNext}
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
        </CalendarView>
    )
}
export default Day;
