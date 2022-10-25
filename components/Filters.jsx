import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Filters = ({checked, filterData, filterColumns, handleFilter, activeFilter, handleReset}) => {


    return (
        <div className="bg-white">
            {/* Filters */}
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-t border-b border-slate-200"
            >
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>
                <div className={`relative  col-start-1 row-start-1 py-2`}>
                    <div className="mx-auto flex items-center justify-between max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                        <div>
                            <Disclosure.Button className={` py-3 px-4 rounded leading-none group flex items-center hover:text-white hover:bg-blue-500 font-medium ${activeFilter ? 'text-white bg-blue-500' : 'text-slate-500'}`}>
                                <FunnelIcon
                                    className={`mr-2 h-4 w-4 flex-none ${activeFilter ? 'text-white' :'text-slate-400'} group-hover:text-white `}
                                    aria-hidden="true"
                                />
                                Filters
                            </Disclosure.Button>
                        </div>
                        <div className="pl-6">
                            <button onClick={handleReset} type="button" className={`text-slate-500 py-3 px-4 rounded leading-none hover:bg-red-500 hover:text-white`}>
                                Clear
                            </button>
                        </div>
                    </div>
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
                <div className={`relative bg-white z-20`}>

                    <Disclosure.Panel className="absolute -top-2 border-t border-gray-200 drop-shadow-lg rounded">
                        <div className={` mx-auto grid max-w-7xl grid-cols-${filterColumns?.length} gap-x-4 p-4 text-sm sm:p-6 md:gap-x-6 lg:p-8  bg-white border border-slate-200 rounded-md`}>

                            <>
                                {filterColumns?.map(({header, field})=>(
                                    <div key={field} className={`grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-1 md:gap-x-6`}>
                                    <fieldset >
                                        <legend className={`uppercase block font-medium text-slate-500`}>{header}</legend>
                                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                            {filterData.map((item, idx)=>(
                                                Object.entries(item)[0][0] === field &&
                                                <div className={`flex`} key={idx}>
                                                      <Disclosure.Button className="Button">
                                                          <input onChange={(e)=>handleFilter(e, item[field], field)}
                                                                 id={`${item[header]}${idx}`}
                                                                 name={`${header}[]`}
                                                                 value={item[field]}
                                                                 checked={checked === item[field]}
                                                                 className="h-4 w-4  flex-shrink-0  border-gray-300 text-green-600 focus:ring-0 "
                                                                 type="radio"/>
                                                      </Disclosure.Button>
                                                    {field === 'status' ?
                                                        <label key={idx} htmlFor={`${item[header]}${idx}`}
                                                               className="ml-3 min-w-0 flex-1 text-slate-500 whitespace-nowrap">

                                                            {item[field] === 0 ? 'Received'
                                                                : item[field] === 1 ? 'Ready-Ship'
                                                                    : item[field] === 2 ? 'Shipped'
                                                                        : item[field] === 3 ? 'Delivered'
                                                                            : 'Cancelled'}


                                                        </label>
                                                    : field === 'isNew'?
                                                            <label key={idx} htmlFor={`${item[header]}${idx}`}
                                                                   className="ml-3 min-w-0 flex-1 text-slate-500 whitespace-nowrap">{item[field] ? 'Ja' : 'Nee'}</label>
                                                            :<label key={idx} htmlFor={`${item[header]}${idx}`}
                                                              className="ml-3 min-w-0 flex-1 text-slate-500 whitespace-nowrap">{item[field]}</label>
                                                    }
                                                    </div>

                                                )


                                            )}

                                        </div>
                                    </fieldset>
                                    </div>
                                ))}

                            </>
                        </div>
                    </Disclosure.Panel>

                </div>
                </Transition>

            </Disclosure>
        </div>
    );
};

export default Filters;
/*
 <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
*/
