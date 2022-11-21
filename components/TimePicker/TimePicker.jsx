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
    parse, eachDayOfInterval, endOfWeek, endOfMonth, getDay
} from 'date-fns'
import { Fragment, useState } from 'react'
import { Listbox, Transition, Menu } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    MapPinIcon, } from '@heroicons/react/20/solid'
import {currentDate, time, startDay, endDay, days, today, colStartClasses} from '../../Time'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const TimePicker = () => {
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy'))
    const [selected, setSelected] = useState(format(time, 'p'))
    const [selectedDay, setSelectedDay] = useState(today)
    const later = startOfTomorrow()
    const firstDayCurrentMonth = parse(currentMonth, 'MMMM yyyy', new Date())
    const days = eachDayOfInterval({start: firstDayCurrentMonth, end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    })
    const tomorrow = (format(later, 'MMMM dd yyyy'))
    const hours = eachHourOfInterval({start: startDay, end: endDay})

    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>

                    <div className="relative ">
                        <Listbox.Button className="flex justify-between w-full cursor-default rounded-md border border-slate-300 bg-white hover:bg-slate-50 py-2 pl-3 pr-2 text-left shadow-sm  text-slate-500 focus:outline-none  sm:text-sm">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none  inset-y-0 right-0 flex items-center pr-2">
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
                            <Listbox.Options className="  z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {hours.map((time, timeIdx) => (
                                    <Listbox.Option
                                        key={timeIdx}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-8 pr-4'
                                            )
                                        }
                                        value= {format(time, 'p')}
                                    >
                                        {({ selected, active }) => (
                                            <div className={`flex items-center text-center`}>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {format(time, 'p')}
                        </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            '  flex items-center pl-1.5'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5 items-center" aria-hidden="true" />
                          </span>
                                                ) : null}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
};

export default TimePicker;
