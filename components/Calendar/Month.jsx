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
import CustomerSearch from "../Admin/Pos/CustomerSearch";
import {startDay, today, colStartClasses, } from "../../Time";
import Link from "next/link";
import Schedule from "./Schedule";
import {calendarOption} from "../../calData";
import CalendarView from "./CalendarView";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Month = ({schedules, cursus, viewSelector}) => {

    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(today))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selected, setSelected] = useState(calendarOption[0])
    const [view, setView] = useState('Month View')
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    //const firstDayCurrentWeek = parse(startOfWeek(currentWeek), 'MMMM yyyy', new Date())
    const router = useRouter()
    const {query} = router
 const newSched = schedules.slice(0, 2)
//console.log(newSched)

    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })



    return (
        <CalendarView cursus={cursus} viewSelector={viewSelector} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}>
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

        </CalendarView>
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
