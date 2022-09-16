import {useEffect, useState} from 'react';
import styles from "../../styles/admin/UserSearch.module.css"

import Link from 'next/link'
import {useRouter} from "next/router";
import useToggle from "../hooks/useToggle";
import axios from "axios";
const UserSearch = ({setShowModal, search, setCriteria, criteria, client, setClient,  setNewSale}) => {
    const [searchScreen, setSearchScreen] = useState(false)
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
    },[search])
    console.log(allUsers)
    const router = useRouter()
    const handleClick = () => {
        setShowModal()
       setNewSale()
    }
    const handleSearch = (e) => {
        e.preventDefault()
        console.log('this criteria', criteria)
        if(criteria.phone){

            allUsers.map((data)=>{
                console.log(data.personal.phone===parseInt(criteria.phone))
                if(data.personal.phone===parseInt(criteria.phone)){
                    setClient(data)
                    setSearchScreen(true)
                }
            })
        }
        if(criteria.email){

            allUsers.map((data)=>{
                if(data.personal.email===criteria.email){
                    setClient(data)
                    setSearchScreen(true)
                }
            })
        }
        //setSearchScreen(false)
    }

console.log(criteria)
    return (
        <>
        {!searchScreen && <div className={styles.wrapper}>
        <h2 className={styles.h2}>Find Customer</h2>
        <div className={styles.selection}>
            <div className={styles.search}>
                <input className={styles.input} type="text" name='phone' placeholder='phone number' onChange={(e)=>setCriteria({[e.target.name]: e.target.value})}/>
            </div>
            <div className={styles.search}>
                <input  className={styles.input} type="text" name='email' placeholder='email' onChange={(e)=>setCriteria({[e.target.name]: e.target.value})}/>
            </div>
        </div>
            <div className={styles.buttonContainer}>
                <button className={styles.cancelButton} onClick={()=>setShowModal()}>Cancel</button>
                <button className={styles.searchButton} onClick={handleSearch}>Find</button>
            </div>
    </div>}
            {searchScreen &&
                <>
                    { client ?  <div className={styles.wrapper}>
                <h2 className={styles.h2}>Match</h2>
                <div className={styles.selection}>
                   <div className={styles.name}>
                       <span className={styles.name}>Naam: {client.firstName}</span>
                       <span className={styles.name}>{client.lastName}</span>
                   </div>
                        <span>Email: {client.personal.email}</span>
                        <span>Phone: {client.personal.phone}</span>

                    <button className={styles.searchButton}  onClick={handleClick}>Select</button>

                </div>
                </div> : <div className={styles.wrapper}>
                        <div className={styles.selection}>

                            <h2 className={styles.h2}>No user found</h2>
                            <Link href='/admin/new/user' passHref>
                                <button className={styles.searchButton} >Create Customer</button>
                            </Link>


                        </div>
                    </div>}
                </>}

        </>
    );
};

export default UserSearch;
