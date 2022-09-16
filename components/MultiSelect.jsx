import {useEffect, useState} from 'react';
import axios from "axios";
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const MultiSelect = ({colors}) => {
    const [animal, setAnimal] = useState(null);
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)

    const [mapColor, setMapColor] = useState([])
    const [selectedPeople, setSelectedPeople] = useState([])
// classNamePrefix="select2-selection"

    useEffect(()=>{
        setMapColor([])
        const newColors = () => {
            colors.map((color)=>{
                setMapColor( (prev)=>[...prev, {
                    value: color.color,
                    label: color.color,
                }])
            })
        }
        newColors()
    },[])
    const filteredProjects =
        query === ''
            ? []
            : mapColor.filter((item) => {
                return Object.values(item).join().toLowerCase().includes(query.toLowerCase())

            })

    const handleChange = (value) => {
        console.log("value:", value);
        setAnimal(value);
    };

    console.log(selectedPeople)
    return (

                    <Combobox as={`div`} className={`w-full absolute left-0 -top-4 bg-white`} value={selectedPeople} onChange={setSelectedPeople} multiple>
                        <div  className={` h-full w-full flex flex-col content-center items-center`}>
                            <div className={`w-full py-1 h-full  px-1 flex items-center gap-1 border border-slate-400 rounded `}>
                                <div className={`flex flex-wrap gap-0.5 w-full overflow-y-scroll`}>
                                    {selectedPeople.map((person, id)=>(
                                        <div className={` border rounded bg-slate-100 text-xs py-0.5`} key={id}>
                                            <span  className={`text-xs px-1`}>{person.label}</span>
                                            <span  className={`border-l border-slate-200 cursor-pointer px-0.5 hover:py-0.5 hover:bg-red-500 hover:text-white hover:font-bold rounded-r `}>x</span>
                                        </div>
                                    ))}
                                </div>
                                <Combobox.Button>
                                    <ChevronUpDownIcon className={`border-l   h-5 w-5 text-gray-400  `} onClick={()=>setOpen(!open)} />
                                </Combobox.Button>
                            </div>


                            {open && <div className={` mt-0.5 shadow-lg px-2 top-8 bg-white`}>
                                <Combobox.Options static className={`w-full text-slate-400 text-center pt-0.5`}>
                                    <div className={`relative flex items-center  gap-1 border-b border-slate-200`}>
                                        <MagnifyingGlassIcon className={` absolute h-4 w-4 left-1 text-slate-400`}/>
                                        <Combobox.Input className={`border-0 pl-6 focus:ring-0 focus:outline-none placeholder:text-sm placeholder:text-slate-400 text-sm `}
                                                        placeholder={`Search...`}/>
                                    </div>
                                    {mapColor.map((person) => (
                                        <Combobox.Option className={`cursor-pointer text-start px-4 hover:bg-slate-400 hover:text-white pb-0.5`} key={person.label}
                                                         value={person}>
                                            {person.value}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            </div>}
                        </div>
                    </Combobox>

    );
};
export default MultiSelect;
