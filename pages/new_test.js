
import {useEffect, useState} from 'react';

import axios from "axios";
import SingleSelect from '../components/SingleSelect'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Chart2 from "../components/Charts/Chart2";
const options = [
    {value: "fox", label: " Fox"},
    {value: "Butterfly", label: "🦋 Butterfly"},
    {value: "Honeybee", label: "🐝 Honeybee"},
];
const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]


const NewTest = ({colors, orders}) => {
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

console.log(open)
    return (
     <div>
         <SingleSelect/>
         <Chart2 winkel={orders}/>
     </div>
    );
};

export default NewTest;
export async function getServerSideProps ({req, res}){

    const {host} = req.headers;

    const pic = await axios.get(`https://`+host+`/api/color`);
    const range = await axios.get(`https://`+host+`/api/orders`);


    return{
        props:{
            colors: pic.data,
            orders: range.data,


        }
    }
}
