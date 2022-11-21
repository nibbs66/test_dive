import {useState, Fragment} from 'react';
import {
    addHours,
    eachDayOfInterval, eachHourOfInterval, endOfDay, endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfTomorrow, subHours
} from "date-fns";
import { Listbox, Transition, Menu } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon, } from '@heroicons/react/20/solid'

import {colStartClasses, time, today} from "../../Time";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const DayPicker = () => {
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [selectedTime, setSelectedTime] = useState(format(time, 'p'))
    const [selectedDay, setSelectedDay] = useState(today)
    const [inputs, setInputs] = useState({})
    const later = startOfTomorrow()
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    const tomorrow = (format(later, 'MMMM dd yyyy'))
    const startDay = addHours(selectedDay, 5)
    const midnight = endOfDay(selectedDay)
    const endDay = subHours(midnight, 1)
    const hours = eachHourOfInterval({start: startDay, end: endDay})
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex w-72 justify-between rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none ">
                    {format(selectedDay, 'MMMM dd yyyy')}
                    <ChevronUpDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className=" right-0 z-10 mt-2 w-full p-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                            <div className="flex items-center text-gray-900">
                                <button
                                    type="button"
                                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <div className="flex-auto font-semibold">{format(firstDayCurrentMonth, 'MMMM')}</div>
                                <button
                                    type="button"
                                    className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Next month</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
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
                                    <button onClick={()=>setSelectedDay(day)}
                                            key={day.toString()}

                                            type="button"
                                            className={classNames(
                                                dayIdx === 0 && colStartClasses[getDay(day)],
                                                'py-1.5 hover:bg-gray-100 focus:z-10',
                                                isSameMonth(day, firstDayCurrentMonth)? 'bg-white' : 'bg-gray-50',
                                                (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
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
                                                'mx-auto flex h-6 w-6 items-center justify-center rounded-full',
                                                isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                                                isEqual(day, selectedDay) && !isToday(day) && 'bg-slate-900',
                                            )}
                                        >
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add event
                            </button>
                        </div>

                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DayPicker;
