import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {calendarOption} from "../../calData";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const CalendarSelector = ({calendarOption, selected, setSelected, viewSelector}) => {
    useEffect(()=>{
       const getDropDown = async() => {
           const calendarSelection = await calendarOption.filter((option)=>option.name.toLowerCase() === viewSelector[1].toString())
           setSelected(calendarSelection[0])



       }
       getDropDown()
    },[viewSelector])
    console.log(selected)
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className={`pl-2 block text-sm font-medium text-slate-400`}>Calendar</Listbox.Label>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default text-slate-500 rounded-md border border-gray-300 bg-white hover:bg-slate-50 py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                            <span className={`${selected.text} block truncate`}>{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className={`h-5 w-5 ${selected.text}`} aria-hidden="true" />
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
                                {calendarOption.map((option) => (
                                    <Listbox.Option
                                        key={option.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? `text-white bg-indigo-600` : `${option.text}`,
                                                'relative cursor-default select-none py-2 pl-8 pr-4'
                                            )
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {option.name}
                        </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white ' : 'text-indigo-600',
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
    );
};

export default CalendarSelector;
