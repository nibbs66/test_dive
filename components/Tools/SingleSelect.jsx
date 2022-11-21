import  {useState, Fragment} from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const SingleSelect = ({data,  setInputs, dataValue, category}) => {
    const [selected, setSelected] = useState('')

    const handleChange = (value) => {
        console.log(dataValue)
        if(dataValue==='new'){
            if(value==='Ja'){
                setInputs(prev=>{
                    return {...prev, [category]: true}
                })
            }else{
                setInputs(prev=>{
                    return {...prev, [category]: false}
                })
            }
        }else{
            setInputs(prev=>{
                return {...prev, [category]: value}
            })
        }
        setSelected(value)

    }
    //console.log(selected)

    return (
        <Listbox defaultValue={selected} onChange={handleChange} name={dataValue}>
            {({ open }) => (
                <>
                    {/*<Listbox.Label className="block text-sm font-medium text-gray-700">Assigned to</Listbox.Label>*/}
                    <div className="relative mt-1">
                        <Listbox.Button   className="relative w-full h-7 cursor-default rounded border border-slate-400 bg-white  pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">


                            <span className="peer block truncate">{selected}</span>
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
                            <Listbox.Options

                                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                                {data?.map((item, idx) => (
                                    <Listbox.Option
                                        key={idx}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-8 pr-4'
                                            )
                                        }
                                        name={dataValue}
                                        value={item[dataValue]}
                                    >
                                        {({ selected, active }) => (
                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item[dataValue]}
                        </span>

                                                {selected ? (
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
            );
};

export default SingleSelect;
