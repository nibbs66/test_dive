import {useState, useEffect} from 'react';
import ModalCard from "../../Modal/ModalCard";
import axios from "axios";
import CustomerDisplayList from "./CustomerDisplayList";

import { v4 as uuidv4 } from 'uuid';
import PosRadio from "./PosRadio";


const CustomerSearch = ({showModal, setShowModal, setCustomer, index, setIndex, inputRef}) => {

    const [search, setSearch] = useState({})
    const [client, setClient] = useState([])
    const [guestUser, setGuestUser] = useState([])

   // const [searchScreen, setSearchScreen] = useToggle()
    const [allUsers, setUsers] = useState('')

    useEffect(()=>{

        const getUsers = async() => {
            try{
                const res = await axios.get(`/api/users`);
                setUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        getUsers()
    },[])
    const handleSearch = (e) => {
        e.preventDefault()

     if(index === 2){
         if(search.lastName){
             allUsers.map((data)=>{
                 if(data.lastName.toLowerCase()===search.lastName.toLowerCase()){

                     setClient( (prev)=>[...prev, {
                         id: data._id,
                         name: data.firstName+' '+data.lastName,
                         email: data.personal.email,
                         phone: data.personal.phone,
                     }])

                 }
             })
         }
         if(search.username){
             allUsers.map((data)=>{
                 if(data.personal.username.toLowerCase()===search.username.toLowerCase()){

                     setClient( (prev)=>[...prev, {
                         id: data._id,
                         name: data.firstName+' '+data.lastName,
                         email: data.personal.email,
                         phone: data.personal.phone,
                     }])

                 }
             })
         }
         setIndex(3)
     }else if(index === 1){
       setCustomer({
           id: 'winkel'+uuidv4().slice(0,5),
           name: guestUser.name,
           phone: guestUser.phone,
           email: guestUser.email
       })
         setShowModal(false)
         inputRef.current.focus()
     }
    }

    return (
        <>
            <ModalCard  showModal={showModal} setShowModal={setShowModal}>
                <div className={` p-5 flex flex-col gap-2  text-slate-400 text-sm font-semibold`}>
                    {index !==3 && <div className={'flex justify-evenly gap-4 '}>
                        <PosRadio id={1} label={`Guest`} index={index} onChange={() => {
                            setIndex(1)
                        }}/>
                        <PosRadio id={2} label={`Customer`} index={index} onChange={() => {
                            setIndex(2)
                        }}/>
                    </div>}
                    {index === 2 && <>
                    <span>Search By:</span>

                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Username:</label>
                            <input
                                name={`username`}
                                onChange={(e)=>setSearch({[e.target.name]: e.target.value})}
                                className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <span className={`text-center uppercase font-bold py-1`}>-or-</span>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Achternaam:</label>
                            <input
                                 onChange={(e)=>setSearch({[e.target.name]: e.target.value})}
                                name={`lastName`}
                                className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                    </>}
                    {index === 1 && <>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Naam:</label>
                            <input
                                onChange={(e)=>setGuestUser(prev=>(
                                    {...prev, [e.target.name]: e.target.value}))}
                                name={`name`}
                                className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Telefoon:</label>

                            <input
                                onChange={(e)=>setGuestUser(prev=>(
                                    {...prev, [e.target.name]: e.target.value}))}
                                name={`phone`}
                                className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                        <div className={`w-full flex gap-4`}>
                            <label htmlFor="">Email:</label>
                            <input
                                onChange={(e)=>setGuestUser(prev=>(
                                    {...prev, [e.target.name]: e.target.value}))}
                                name={`email`}
                                className={`w-full flex focus:outline-none justify-end border border-slate-300 rounded px-1 py-0.5 text-sm`} type="text"/>
                        </div>
                    </>}
                    {(index !==0 && index !==3) &&
                        <button onClick={handleSearch} className={`bg-blue-400 hover:bg-blue-600 shadow-lg text-white font-bold uppercase rounded mt-4  py-1 px-2`}>
                            {index === 2 ?'Search' : 'Volgende'}
                    </button>}

                    {index === 3 &&
                       <CustomerDisplayList setIndex={setIndex} inputRef={inputRef} client={client} setCustomer={setCustomer} setShowModal={setShowModal}/>
                    }
                </div>


            </ModalCard>

        </>
    );
};

export default CustomerSearch;
