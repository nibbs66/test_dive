/*
  This example requires Tailwind CSS v3.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {Fragment, useEffect, useState} from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { DocumentPlusIcon, FolderPlusIcon, FolderIcon, HashtagIcon, TagIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import {useRouter} from "next/router";

const projects = [
    { id: 1, name: 'Workflow Inc. / Website Redesign', url: '/service' },
    // More projects...
]
const recent = ['']
const quickActions = [
    { name: 'Shop...', icon: DocumentPlusIcon, shortcut: 'N', url: '/shop' },
    { name: 'Cursus...', icon: FolderPlusIcon, shortcut: 'F', url: '/cursus' },
    { name: 'Rentals...', icon: HashtagIcon, shortcut: 'H', url: '/rental' },
    { name: 'Service...', icon: TagIcon, shortcut: 'L', url: '/service' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SearchBar = ({open, setOpen}) => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [searchData, setSearchData] = useState('')
    useEffect(()=>{
        const dropDownList = async() => {
            try{
                const res = await axios.get(`/api/products`);
                setSearchData(res.data)

            }catch(err){
                console.log(err)
            }
        }
        dropDownList()
    },[])

    const filteredProjects =
        query === ''
            ? []
            : searchData.filter((item) => {
                return Object.values(item).join().toLowerCase().includes(query.toLowerCase())

            })
    const handleClick = (data) => {
        router.push(`/shop/${data.categories[0]}/${data._id}`)
        setOpen(false)
    }

    return (
        <div >

            <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-500 bg-opacity-25 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
                                <Combobox onChange={(item) => (window.location)}>
                                    <div className="relative">
                                        <MagnifyingGlassIcon
                                            className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-900 text-opacity-40"
                                            aria-hidden="true"
                                        />
                                        <Combobox.Input
                                            className="h-12 w-full border-0 text-center bg-transparent pl-11 pr-4 text-slate-800 placeholder-slate-600 font-bold focus:outline-none sm:text-sm sm:uppercase"
                                            placeholder="Search..."
                                            onChange={(event) => setQuery(event.target.value)}
                                        />
                                    </div>

                                    {(query === '' || filteredProjects.length > 0) && (
                                        <Combobox.Options
                                            static
                                            className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                                        >
                                            <li className="p-2">
                                                {query === '' && (
                                                    <h2 className="mt-4 mb-2  px-3 text-xs font-semibold text-gray-900">Recent searches</h2>
                                                )}
                                                <ul className="text-sm text-gray-700">
                                                    {(query === '' ? recent : filteredProjects).map((product) => (
                                                        <Combobox.Option
                                                            key={product._id}
                                                            value={product.name}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                                                    active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                                                                )
                                                            }
                                                        >
                                                            {({ active }) => (
                                                                <>
                                                                    <FolderIcon
                                                                        className={classNames(
                                                                            'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                                                            active && 'text-opacity-100'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span onClick={()=>handleClick(product)} className="ml-3 flex-auto truncate">{product.name}</span>
                                                                    {active && <span className="ml-3 flex-none text-gray-500">Jump to...</span>}
                                                                </>
                                                            )}
                                                        </Combobox.Option>
                                                    ))}
                                                </ul>
                                            </li>
                                            {query === '' && (
                                                <li className="p-2">
                                                    <h2 className="sr-only">Quick actions</h2>
                                                    <ul className="text-sm text-gray-700">
                                                        {quickActions.map((action) => (
                                                            <Combobox.Option
                                                                key={action.shortcut}
                                                                value={action}
                                                                className={({ active }) =>
                                                                    classNames(
                                                                        'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                                                        active && 'bg-gray-900 bg-opacity-5 text-gray-900'
                                                                    )
                                                                }
                                                            >
                                                                {({ active }) => (
                                                                    <>
                                                                        <action.icon
                                                                            className={classNames(
                                                                                'h-6 w-6 flex-none text-gray-900 text-opacity-40',
                                                                                active && 'text-opacity-100'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                        <span className="ml-3 flex-auto truncate">{action.name}</span>
                                                                        <span className="ml-3 flex-none text-xs font-semibold text-gray-500">
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">{action.shortcut}</kbd>
                                  </span>
                                                                    </>
                                                                )}
                                                            </Combobox.Option>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )}
                                        </Combobox.Options>
                                    )}

                                    {query !== '' && filteredProjects.length === 0 && (
                                        <div className="py-14 px-6 text-center sm:px-14">
                                            <FolderIcon className="mx-auto h-6 w-6 text-gray-900 text-opacity-40" aria-hidden="true" />
                                            <p className="mt-4 text-sm text-gray-900">
                                                We couldn&apos;t find any anything for you. Please try again.
                                            </p>
                                        </div>
                                    )}
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}
export default SearchBar;
