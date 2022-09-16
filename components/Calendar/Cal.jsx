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
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    startOfMonth,
    endOfWeek,
} from "date-fns";
import dayjs from "dayjs";
import CustomerSearch from "../Pos/CustomerSearch";
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



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Cal = () => {
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
                            onClick={()=>setCurrentMonth(format(today, 'MMMM yyyy'))}
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
                                Month view
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
                </div>
            </header>

        </div>
    );
};

export default Cal;
