import {useEffect, useState} from 'react';
import CardDisplay from "../Card/CardDisplay";
import SiteCard from "./SiteCard";
import Pages from "./Pages"
import {userColumns} from "../../tableData";
import TableDisplay from "../Table/TableDisplay";
const SiteLayout = ({active, setActive, getData, children, user}) => {
    const [employee, setEmployee] = useState([])
    useEffect(()=>{
        setEmployee([])
        user.map((option)=>{
            setEmployee( (prev)=>[...prev, {
                id: option._id,
                items: [
                    option.firstName[0].toUpperCase()+option.lastName[0].toUpperCase(),
                    option.firstName+' '+option.lastName,
                    option.personal.email,
                    option.personal.phone,
                ]
            }])

        })


    },[user])

    return (
       <>
           <div className="flex items-center justify-center gap-5 w-full pt-2">
               <span
                   onClick={()=> {
                       getData(<Pages getData={getData}/>)
                       setActive('Pages')
                   }}
                   className={`uppercase px-5 py-1 ${active === 'Pages' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}
               >
              Pages
            </span>
               <span  className={`uppercase px-5 py-1 ${active === "rental" ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Announcements
            </span>
               <span  className={`uppercase px-5 py-1 ${active === 'service' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}>
              Specials
            </span>
               <span   onClick={()=> {
                   getData(<TableDisplay showButton={true} columns={userColumns} tableTitle={true}
                                         rows={employee} title={"Employee"} action={true} PageSize={10}
                                         link={`/admin/users/employee/`}/>)
                   setActive('Employee')
               }}
                   className={`uppercase px-5 py-1 ${active === 'Employee' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-md  text-sm mr-4 cursor-pointer`}
               >
              User Access
            </span>
           </div>
           {children}





       </>
    );
};

export default SiteLayout;
