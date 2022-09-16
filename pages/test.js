
import {
    startOfToday,
    format,
    startOfTomorrow,
    eachHourOfInterval,
    addHours,
    isEqual,
    isToday,
    isSameMonth,
    endOfToday,
    subHours,
    addMinutes,
    parse, eachDayOfInterval, endOfWeek, endOfMonth, getDay, endOfDay
} from 'date-fns'
import { Fragment, useState } from 'react'
import { Listbox, Transition, Menu } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon, } from '@heroicons/react/20/solid'
import {currentDate, time, days, today, colStartClasses} from '../Time'
import axios from "axios";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Test = () => {
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
const handleSchedule = async(e) => {
        e.preventDefault()
    console.log(inputs)
        try{
            const res = await axios.post('/api/time',
                inputs
                )
            console.log(res.data)
        }catch(err){
            console.log(err)
        }

}
console.log(inputs)

    return (
        <div className={`flex items-start w-screen justify-center gap-3`}>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex w-72 justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm hover:bg-slate-50 focus:outline-none ">
                        {format(selectedDay, 'MMMM dd yyyy')}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            <Listbox value={selectedTime} onChange={setSelectedTime}>
                {({ open }) => (
                    <>

                        <div className="relative ">
                            <Listbox.Button className="relative w-full cursor-default rounded-md border border-slate-300 bg-white hover:bg-slate-50 py-2 pl-3 pr-10 text-left shadow-sm  text-slate-500 focus:outline-none  sm:text-sm">
                                <span className="block truncate">{selectedTime}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {hours.map((newHour, timeIdx) => (
                                        <Listbox.Option

                                            key={timeIdx}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'text-white bg-indigo-600' : 'text-slate-700',
                                                    'relative cursor-default select-none py-2 pl-8 pr-4'
                                                )
                                            }
                                            value= {format(newHour, 'p')}
                                        >
                                            {({ selectedTime, active }) => (
                                                <>
                        <button disabled={(format(time, 'MM dd yyyy p') > format(newHour, 'MM dd yyyy p')) ? true : false}
                                className={classNames(selectedTime ? 'font-semibold' : 'font-normal', 'block truncate', 'disabled:cursor-not-allowed')}
                                onClick={(e)=> setInputs(prev=>{
                                    return {...prev, 'startTime': newHour}
                                })}
                        >
                          {format(newHour, 'p')}
                        </button>

                                                    {selectedTime ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'text-white' : 'text-indigo-600',
                                                                'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                            )}
                                                        >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
            <button className={` rounded py-1 px-2 text-white bg-blue-500 mt-1`} onClick={handleSchedule}>
                Submit
            </button>
        </div>


    )
};

export default Test;
/* <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                                                <div className="flex items-center text-gray-900">
                                                    <button
                                                        type="button"
                                                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Previous month</span>
                                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                    <div className="flex-auto font-semibold">January</div>
                                                    <button
                                                        type="button"
                                                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Next month</span>
                                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                                <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                                                    <div>M</div>
                                                    <div>T</div>
                                                    <div>W</div>
                                                    <div>T</div>
                                                    <div>F</div>
                                                    <div>S</div>
                                                    <div>S</div>
                                                </div>
                                                <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                                                    {days.map((day, dayIdx) => (
                                                        <button
                                                            key={day.date}
                                                            type="button"
                                                            className={classNames(
                                                                'py-1.5 hover:bg-gray-100 focus:z-10',
                                                                day.isSameMonth ? 'bg-white' : 'bg-gray-50',
                                                                (day.isSelected || day.isToday) && 'font-semibold',
                                                                day.isSelected && 'text-white',
                                                                !day.isSelected && day.isSameMonth && !day.isToday && 'text-gray-900',
                                                                !day.isSelected && !day.isSameMonth && !day.isToday && 'text-gray-400',
                                                                day.isToday && !day.isSelected && 'text-indigo-600',
                                                                dayIdx === 0 && 'rounded-tl-lg',
                                                                dayIdx === 6 && 'rounded-tr-lg',
                                                                dayIdx === days.length - 7 && 'rounded-bl-lg',
                                                                dayIdx === days.length - 1 && 'rounded-br-lg'
                                                            )}
                                                        >
                                                            <time
                                                                dateTime={day.date}
                                                                className={classNames(
                                                                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                                                                    day.isSelected && day.isToday && 'bg-indigo-600',
                                                                    day.isSelected && !day.isToday && 'bg-gray-900'
                                                                )}
                                                            >
                                                                {day.date.split('-').pop().replace(/^0/, '')}
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
                                            </div>*/
