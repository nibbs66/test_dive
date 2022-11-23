import { useState, useEffect } from 'react'
import { CheckIcon, ChevronUpDownIcon, PlusCircleIcon} from '@heroicons/react/20/solid'

import { Combobox } from '@headlessui/react'

const people = [
    { id: 1, name: 'Leslie Alexander' },
    // More users...
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SingleSelectWithSearch = ({data, addItem, setAddItem, setSelected, selected, setMessageData,  setInputs, dataValue, category, setShowMessage, setMessageColor, setMessage}) => {
    const [query, setQuery] = useState('')
    const [query2, setQuery2] = useState('')
    //const [selected, setSelected] = useState(null)


    const filteredOptions =
        query === ''
            ? data
            : data.filter((item) => {
                return item[dataValue].toLowerCase().includes(query.toLowerCase())
            })
    useEffect(()=>{

        setAddItem(false)
        if(query.length === 0){
            setSelected('')
        }
        if(query.length > 0 && filteredOptions.length === 0){
            setAddItem(true)
            setSelected(query2)

        }else if(query.length > 0 && filteredOptions.length > 0){
            setShowMessage(false)
        }


    },[query])
    const handleChange = (value) => {
        setInputs(prev=>{
            return {...prev, [dataValue]: value}
        })
       setSelected(value)

    }
    const handleNewItem = (e) => {
        e.preventDefault

        setMessageColor('red')
        setMessageData({type: category, name: selected})
        setMessage(`${dataValue.charAt(0).toUpperCase() + dataValue.slice(1)+' '+selected} not found. Would you like to add?`)
        setShowMessage(true)
        /*setInputs(prev=>{
            return {...prev, [dataValue]: selected.charAt(0).toUpperCase() + selected.slice(1)}
        })*/

        //setQuery2('')
        //setSelected('')


    }
console.log(query2)
    return (
        <Combobox as="div" value={selected} onChange={handleChange}  name={dataValue}>

            <div className="relative mt-1">
                <Combobox.Input
                    className="w-full h-7 rounded-md border border-slate-400 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-none focus:outline-none focus:ring-1 focus:ring-none sm:text-sm"
                    onChange={(event) => {
                        setQuery(event.target.value)
                        setQuery2(event.target.value)
                    }}
                    displayValue={(item) =>item}
                />
                {addItem && <Combobox.Button onClick={handleNewItem}
                                  className={`absolute flex items-center inset-y-0 right-8 cursor-pointer`}>
                    <PlusCircleIcon className={`h-5 w-5 text-green-600`}/>
                </Combobox.Button>}


                <Combobox.Button className="absolute  inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredOptions?.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredOptions.map((item, idx) => (
                            <Combobox.Option
                                key={idx}
                                name={dataValue}
                                value={item[dataValue]}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={classNames('block truncate', selected && 'font-semibold')}>{item[dataValue]}</span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
};

export default SingleSelectWithSearch;
